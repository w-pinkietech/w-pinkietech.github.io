import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {

  const asciiArt = [
    '\x03[BOOT] PinkieOS ver.0.0.1 - AI Innovation Platform\x03',
    '\x02[INIT] Core Values Loading... [OK]\x02',
    '\x02[INIT] Mission Statement... [OK]\x02',
    '\x02[INIT] Vision 2030... [OK]\x02',
    '\x03[VISION] AIテクノロジーの民主化\x03',
    '\x03[MISSION] 革新的なソリューションでビジネスを変革\x03',
    '\x03[VALUES] 倫理的AI開発・継続的学習・顧客第一\x03',
    '\x02[GOAL] 日本から世界へ、AIで社会課題を解決\x02',
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

