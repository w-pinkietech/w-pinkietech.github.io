import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {

  const asciiArt = [
    '\x03[BOOT] PinkieOS ver.0.0.1 - AI Innovation Platform\x03',
    '\x02[INIT] 自然言語処理エンジン... [OK]\x02',
    '\x02[INIT] 機械学習モデル展開... [OK]\x02',
    '\x02[INIT] クライアント接続確立... [OK]\x02',
    '\x02[INIT] AIコンサルティングAPI... [OK]\x02',
    '\x03[INFO] 医療診断支援AI: 稼働中 (精度92%)\x03',
    '\x03[INFO] EC向けレコメンド: 45社導入済み\x03',
    '\x03[INFO] 金融不正検知: 2.5億円の損失防止中\x03',
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

