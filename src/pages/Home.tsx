import { type FC } from 'react';
import CLIEmulator from '../components/CLIEmulator';

const Home: FC = () => {

  const asciiArt = [
    '\x03[起動] PinkieOS ver.0.0.1 - モノづくり × OSS × AI\x03',
    '\x02[初期化] 日本のモノづくり精神... [完了]\x02',
    '\x02[初期化] オープンソース哲学... [完了]\x02',
    '\x02[初期化] AI革新エンジン... [完了]\x02',
    '\x03[ビジョン] 日本のモノづくりにOSSとAIの力を\x03',
    '\x03[ミッション] 製造業界に技術革新を推進\x03',
    '\x03[価値観] 品質へのこだわり・オープンソース・AI民主化\x03',
    '\x02[目標] 伝統的な匠の技術とデジタルの融合\x02',
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

