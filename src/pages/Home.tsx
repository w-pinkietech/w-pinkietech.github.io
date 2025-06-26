import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const { t } = useTranslation();

  const initialOutput = [
    t('cli.welcomeMessage'),
    '',
  ];

  return (
    <div className="flex flex-col h-full">
      <CLIEmulator initialOutput={initialOutput} />
    </div>
  );
};

export default Home;

