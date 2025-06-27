import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {

  const asciiArt = [
    '\x03[BOOT] PinkieOS 2077 Cyber Edition\x03',
    '\x02[INIT] Neural Core X... [OK]\x02',
    '\x02[INIT] Quantum Memory... [OK]\x02',
    '\x02[INIT] Cyber Defense System... [OK]\x02',
    '',
    '\x02██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗████████╗███████╗ ██████╗██╗  ██╗\x02',
    '\x02██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║\x02',
    '\x02██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗     ██║   █████╗  ██║     ███████║\x02',
    '\x02██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║\x02',
    '\x02██║     ██║██║ ╚████║██║  ██╗██║███████╗   ██║   ███████╗╚██████╗██║  ██║\x02',
    '\x02╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\x02',
    '',
    '\x03                       AI Innovation from Japan 2077\x03',
    '',
    '\x03===============[ SYSTEM READY ]===============\x03',
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

