import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';
import { useTranslation } from 'react-i18next';

const Home: FC = () => {
  const { t } = useTranslation();

  const asciiArt = [
    '[BOOT] PinkieOS v1.0.0 LTS',
    '[BOOT] Initializing Neural Core...',
    '[BOOT] Loading kernel modules...',
    '[BOOT] Starting services...',
    '',
    '██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗████████╗███████╗ ██████╗██╗  ██╗',
    '██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║',
    '██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗     ██║   █████╗  ██║     ███████║',
    '██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║',
    '██║     ██║██║ ╚████║██║  ██╗██║███████╗   ██║   ███████╗╚██████╗██║  ██║',
    '╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝',
    '',
    '===============[ SYSTEM READY ]===============',
    '',
    'Last login: ' + new Date().toLocaleString('ja-JP'),
    '',
    '「neofetch」でシステム情報を表示 / Run \'neofetch\' for system info',
    '「help」で利用可能なコマンドを表示 / Type \'help\' for commands',
    '「lang」で言語切替 / Type \'lang\' to change language',
    '',
  ];

  return (
    <div className="flex flex-col h-full bg-black p-4">
      <CLIEmulator initialOutput={asciiArt} />
    </div>
  );
};

export default Home;

