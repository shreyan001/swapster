import dynamic from 'next/dynamic';


const Main = dynamic(() => import('@/components/Main'), { ssr: true });

export default function Home() {
  return (
   <> 
   <Main />
   </>
  );
}
