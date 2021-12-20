import type { NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';

const Login: NextPage = (props) => {
  return (
    <div>
      <h1>This is login page</h1>
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