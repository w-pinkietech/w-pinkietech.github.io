import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {
  return (
    <div className="flex flex-col h-full bg-black p-1 sm:p-4 min-h-screen">
      <CLIEmulator />
    </div>
  );
};

export default Home;

