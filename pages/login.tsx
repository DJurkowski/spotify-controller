import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import Logo from '../assets/logo.png';

const Login = ({ providers }: any) => {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
      <Image className="w-52 mb-5" src={Logo} alt="Spotify" width={'52px'} height={'52px'} />
      {Object.values(providers).map((provider: any, index) => (
        <div key={provider.name}>
          <button 
            className='bg-[#18D860] text-white p-5 rounded-full'
            onClick={() => signIn(provider.id, { callbackUrl: "/"})}
          >Login with {provider.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    }
  }
};