import Image from 'next/image';
import Header from './components/Header';
import Menu from './pages/menu';



export default function Home() {
  return (
    
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Header />
        <Menu />
        useClient();
      </div>
    </div>
  );
}
