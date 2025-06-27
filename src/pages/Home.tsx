import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {

  // Check if mobile device
  const isMobile = window.innerWidth < 640;
  
  const asciiArt = [
    '\x03[BOOT] PinkieOS ver.0.0.1 - Manufacturing × OSS × AI\x03',
    '\x02[INIT] Japanese Monozukuri Spirit... [OK]\x02',
    '\x02[INIT] Open Source Philosophy... [OK]\x02',
    '\x02[INIT] AI Innovation Engine... [OK]\x02',
    '\x03[VISION] Bringing OSS and AI power to Japanese manufacturing\x03',
    isMobile ? '\x03[MISSION] Technical innovation in manufacturing\x03' : '\x03[MISSION] Driving technical innovation in manufacturing industry\x03',
    isMobile ? '\x03[VALUES] Quality • Open Source • AI\x03' : '\x03[VALUES] Quality craftsmanship • Open Source • AI democratization\x03',
    isMobile ? '\x02[GOAL] Traditional × Digital fusion\x02' : '\x02[GOAL] Fusion of traditional craftsmanship with digital technology\x02',
    '',
    ...(isMobile ? [
      '\x02██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗\x02',
      '\x02██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝\x02',
      '\x02██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗  \x02',
      '\x02██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝  \x02',
      '\x02██║     ██║██║ ╚████║██║  ██╗██║███████╗\x02',
      '\x02╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝\x02',
      '',
      '\x03████████╗███████╗ ██████╗██╗  ██╗\x02',
      '\x03╚══██╔══╝██╔════╝██╔════╝██║  ██║\x02',
      '\x03   ██║   █████╗  ██║     ███████║\x02',
      '\x03   ██║   ██╔══╝  ██║     ██╔══██║\x02',
      '\x03   ██║   ███████╗╚██████╗██║  ██║\x02',
      '\x03   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\x02',
    ] : [
      '\x02██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗████████╗███████╗ ██████╗██╗  ██╗\x02',
      '\x02██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║\x02',
      '\x02██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗     ██║   █████╗  ██║     ███████║\x02',
      '\x02██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║\x02',
      '\x02██║     ██║██║ ╚████║██║  ██╗██║███████╗   ██║   ███████╗╚██████╗██║  ██║\x02',
      '\x02╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\x02',
    ]),
    '',
    isMobile ? '\x03    AI Innovation from Japan 2025\x03' : '\x03                       AI Innovation from Japan 2025\x03',
    '',
    isMobile ? '\x03=====[ SYSTEM READY ]=====\x03' : '\x03===============[ SYSTEM READY ]===============\x03',
    '',
    'Last login: ' + new Date().toLocaleString('ja-JP'),
    '',
    isMobile ? '「help」でコマンド一覧' : '「neofetch」でシステム情報を表示 / Run \'neofetch\' for system info',
    isMobile ? '「lang」で言語切替' : '「help」で利用可能なコマンドを表示 / Type \'help\' for commands',
    ...(isMobile ? [] : ['「lang」で言語切替 / Type \'lang\' to change language']),
    '',
  ];

  return (
    <div className="flex flex-col h-full bg-black p-1 sm:p-4 min-h-screen">
      <CLIEmulator initialOutput={asciiArt} />
    </div>
  );
};

export default Home;

