import { AlphaRouter } from '@uniswap/smart-order-router';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { parseUnits, formatUnits, Address } from 'viem';
import JSBI from 'jsbi';
import { swapTokens, liquidityPools } from '@/utils/tradingUtils';
import { baseSepolia } from 'viem/chains';
import { usePublicClient, useWalletClient, useAccount } from 'wagmi';
import { erc20Abi } from 'viem';
erc20

const V3_SWAP_ROUTER_ADDRESS = process.env.SWAP_ROUTER_ADDRESS as Address;

export const useSwap = () => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: walletAddress } = useAccount();

  const getPrice = async (
    inputAmount: string,
    slippageAmount: number,
    deadline: number,
    token0Symbol: string,
    token1Symbol: string
  ): Promise<[{ to: Address; data: `0x${string}`; value: bigint }, string, string] | null> => {
    // Check if a pool exists for the token pair
    const pool = liquidityPools.find(
      p => (p.token0 === token0Symbol && p.token1 === token1Symbol) ||
           (p.token0 === token1Symbol && p.token1 === token0Symbol)
    );

    if (!pool) {
      console.error('No liquidity pool available for this token pair');
      return null;
    }

    const token0 = swapTokens.find(t => t.symbol === token0Symbol);
    const token1 = swapTokens.find(t => t.symbol === token1Symbol);

    if (!token0 || !token1) {
      console.error('Invalid token symbols');
      return null;
    }

    const TokenIn = new Token(baseSepolia.id, token0.contractAddress, 18, token0.symbol, token0.name);
    const TokenOut = new Token(baseSepolia.id, token1.contractAddress, 18, token1.symbol, token1.name);

    const percentSlippage = new Percent(slippageAmount, 100);
    const wei = parseUnits(inputAmount, 18);
    const currencyAmount = CurrencyAmount.fromRawAmount(TokenIn, JSBI.BigInt(wei));

    const router = new AlphaRouter({ chainId: baseSepolia.id, provider: publicClient as any });

    const route = await router.route(
      currencyAmount,
      TokenOut,
      TradeType.EXACT_INPUT,
      {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline,
      }
    );

    if (!route) {
      console.error('No route found');
      return null;
    }

    const transaction = {
      data: route.methodParameters.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: BigInt(route.methodParameters.value),
      // Remove 'from', 'gasPrice', and 'gasLimit'
    };

    const quoteAmountOut = route.quote.toFixed(6);
    const ratio = (parseFloat(inputAmount) / parseFloat(quoteAmountOut)).toFixed(3);

    return [transaction, quoteAmountOut, ratio];
  };

  const runSwap = async (
    transaction: { to: Address; data: `0x${string}`; value: bigint }
  ): Promise<`0x${string}`> => {
    if (!walletClient || !walletAddress) throw new Error('Wallet not connected');

    const approvalAmount = parseUnits('10', 18);
    const tokenContract = {
      address: transaction.to as Address,
      abi: erc20Abi,
    };

    const approvalTx = await walletClient.writeContract({
      ...tokenContract,
      functionName: 'approve',
      args: [V3_SWAP_ROUTER_ADDRESS, approvalAmount],
    });

    await publicClient.waitForTransactionReceipt({ hash: approvalTx });

    const tx = await walletClient.sendTransaction(transaction);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    return receipt.transactionHash;
  };

  return { getPrice, runSwap };
};

