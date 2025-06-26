import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils'; // Assuming cn is a utility for class names

interface CLIEmulatorProps {
  initialOutput?: string[];
}

const CLIEmulator: React.FC<CLIEmulatorProps> = ({ initialOutput = [] }) => {
  const [showCursor, setShowCursor] = useState(true);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Helper function to pad string considering full-width characters
  const padString = (str: string, targetLength: number): string => {
    let currentLength = 0;
    for (const char of str) {
      // Check if character is full-width (Japanese characters, etc.)
      if (char.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/)) {
        currentLength += 2;
      } else {
        currentLength += 1;
      }
    }
    const padding = targetLength - currentLength;
    return str + ' '.repeat(Math.max(0, padding));
  };

  useEffect(() => {
    inputRef.current?.focus();
    // Scroll to bottom on new output
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const typeWriter = useCallback((text: string, callback?: () => void) => {
    let i = 0;
    const speed = 30;
    const type = () => {
      if (i < text.length) {
        setOutput(prev => {
          const newOutput = [...prev];
          if (!newOutput[newOutput.length - 1]) {
            newOutput.push('');
          }
          newOutput[newOutput.length - 1] += text.charAt(i);
          return newOutput;
        });
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    };
    type();
  }, []);

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let newOutput = [...output, `$ ${command}`];

    if (lowerCommand === 'help') {
      const boxWidth = 52;
      const contentWidth = boxWidth - 4; // Subtract borders and padding
      
      newOutput.push('');
      newOutput.push('┌' + '─'.repeat(boxWidth - 2) + '┐');
      
      // Title
      const title = currentLang === 'ja' ? '利用可能なコマンド一覧' : 'Available Commands';
      const titlePadding = Math.floor((contentWidth - title.length) / 2);
      newOutput.push('│ ' + ' '.repeat(titlePadding) + title + ' '.repeat(contentWidth - titlePadding - title.length) + ' │');
      
      newOutput.push('├' + '─'.repeat(boxWidth - 2) + '┤');
      
      // Navigation section
      const navTitle = currentLang === 'ja' ? 'ナビゲーション:' : 'Navigation:';
      newOutput.push('│ ' + padString(navTitle, contentWidth) + ' │');
      
      const commands = [
        { cmd: 'home', desc: currentLang === 'ja' ? 'ホームページへ移動' : 'Go to home page' },
        { cmd: 'about', desc: currentLang === 'ja' ? '会社概要' : 'About us' },
        { cmd: 'services', desc: currentLang === 'ja' ? 'サービス一覧' : 'Our services' },
        { cmd: 'works', desc: currentLang === 'ja' ? '実績・事例' : 'Projects' },
        { cmd: 'news', desc: currentLang === 'ja' ? '最新ニュース' : 'Latest news' },
        { cmd: 'contact', desc: currentLang === 'ja' ? 'お問い合わせ' : 'Contact us' },
        { cmd: 'team', desc: currentLang === 'ja' ? 'チームメンバー' : 'Team members' },
        { cmd: 'faq', desc: currentLang === 'ja' ? 'よくある質問' : 'FAQ' },
        { cmd: 'legal', desc: currentLang === 'ja' ? '法的情報' : 'Legal info' },
      ];
      
      commands.forEach(({ cmd, desc }) => {
        const line = `  ${cmd.padEnd(11)} - ${desc}`;
        newOutput.push('│ ' + padString(line, contentWidth) + ' │');
      });
      
      newOutput.push('│ ' + ' '.repeat(contentWidth) + ' │');
      
      // System section
      const sysTitle = currentLang === 'ja' ? 'システム:' : 'System:';
      newOutput.push('│ ' + padString(sysTitle, contentWidth) + ' │');
      
      const sysCommands = [
        { cmd: 'clear', desc: currentLang === 'ja' ? '画面をクリア' : 'Clear screen' },
        { cmd: 'help', desc: currentLang === 'ja' ? 'ヘルプを表示' : 'Show help' },
        { cmd: 'neofetch', desc: currentLang === 'ja' ? 'システム情報' : 'System info' },
        { cmd: 'whoami', desc: currentLang === 'ja' ? '現在のユーザー' : 'Current user' },
        { cmd: 'pwd', desc: currentLang === 'ja' ? '現在のディレクトリ' : 'Working directory' },
        { cmd: 'ls', desc: currentLang === 'ja' ? 'ファイル一覧' : 'List files' },
        { cmd: 'lang', desc: currentLang === 'ja' ? '言語切替' : 'Change language' },
        { cmd: 'echo', desc: currentLang === 'ja' ? 'テキスト表示' : 'Display text' },
        { cmd: 'exit', desc: currentLang === 'ja' ? '終了' : 'Exit' },
      ];
      
      sysCommands.forEach(({ cmd, desc }) => {
        const line = `  ${cmd.padEnd(11)} - ${desc}`;
        newOutput.push('│ ' + padString(line, contentWidth) + ' │');
      });
      
      newOutput.push('└' + '─'.repeat(boxWidth - 2) + '┘');
      newOutput.push('');
    } else if (lowerCommand === 'clear') {
      newOutput = [];
    } else if (lowerCommand === 'whoami') {
      newOutput.push('guest');
    } else if (lowerCommand === 'pwd') {
      newOutput.push('/home/guest');
    } else if (lowerCommand === 'ls') {
      newOutput.push('README.txt  projects/  documents/  .config/');
    } else if (lowerCommand === 'date') {
      newOutput.push(new Date().toString());
    } else if (lowerCommand.startsWith('echo ')) {
      newOutput.push(command.substring(5));
    } else if (lowerCommand === 'lang' || lowerCommand === 'language') {
      newOutput.push('');
      newOutput.push('Current language / 現在の言語: ' + (currentLang === 'ja' ? '日本語' : 'English'));
      newOutput.push('');
      newOutput.push('Available languages / 利用可能な言語:');
      newOutput.push('  • lang ja - 日本語に切り替え');
      newOutput.push('  • lang en - Switch to English');
    } else if (lowerCommand === 'lang ja' || lowerCommand === 'language ja') {
      setCurrentLang('ja');
      i18n.changeLanguage('ja');
      newOutput.push('言語を日本語に切り替えました');
    } else if (lowerCommand === 'lang en' || lowerCommand === 'language en') {
      setCurrentLang('en');
      i18n.changeLanguage('en');
      newOutput.push('Language switched to English');
    } else if (lowerCommand === 'neofetch' || lowerCommand === 'info') {
      newOutput.push('');
      newOutput.push('       ___      ___');
      newOutput.push('      /  /\    /  /\\     guest@pinkietech');
      newOutput.push('     /  /::\  /  /::\\    ----------------');
      newOutput.push('    /  /:/\:\  /:/\:\\   OS: PinkieOS 1.0 LTS');
      newOutput.push('   /  /:/~/:/  /:/~/:/    Kernel: 6.1.0-pinkie');
      newOutput.push('  /__/:/ /:/  /:/ /:/     Uptime: 42 days');
      newOutput.push('  \  \:\/:/  /:/ /:/      Shell: pinkiesh 1.0');
      newOutput.push('   \  \::/  /:/ /:/       Terminal: PinkieTerm');
      newOutput.push('    \  \:\/:/ /:/         CPU: Neural Core i9');
      newOutput.push('     \  \::/ /:/          Memory: ∞ GB');
      newOutput.push('      \__\/ /:/           ');
      newOutput.push('        /__/:/            ');
      newOutput.push('        \__\/             ');
      newOutput.push('');
    } else if (lowerCommand === 'home') {
      newOutput.push('');
      newOutput.push('Loading home...');
      newOutput.push('');
      setOutput(newOutput);
      setTimeout(() => {
        setOutput([]);
        navigate('/');
      }, 500);
      return;
    } else if (lowerCommand === 'about') {
      newOutput.push('');
      if (currentLang === 'ja') {
        newOutput.push('==================[ PinkieTechについて ]==================');
        newOutput.push('');
        newOutput.push('PinkieTechは2023年に設立された日本のAIテクノロジー企業です。');
        newOutput.push('最先端のAIソリューションとコンサルティングを専門としています。');
        newOutput.push('');
        newOutput.push('私たちのミッション:');
        newOutput.push('  > AIテクノロジーの民主化');
        newOutput.push('  > 革新的なソリューションの構築');
        newOutput.push('  > AIによるビジネスの変革');
        newOutput.push('');
        newOutput.push('東京を拠点に、日本の企業向けにAIソリューションを提供。');
        newOutput.push('大手企業から中小企業まで、幅広いクライアントをサポート。');
        newOutput.push('');
        newOutput.push('「team」でチームメンバーを表示');
        newOutput.push('「cat README.md」で詳細情報を確認');
      } else {
        newOutput.push('==================[ ABOUT PINKIETECH ]==================');
        newOutput.push('');
        newOutput.push('PinkieTech is a Japanese AI technology company founded in 2023.');
        newOutput.push('We specialize in cutting-edge AI solutions and consulting.');
        newOutput.push('');
        newOutput.push('Our Mission:');
        newOutput.push('  > Democratize AI technology');
        newOutput.push('  > Build innovative solutions');
        newOutput.push('  > Transform businesses with AI');
        newOutput.push('');
        newOutput.push('Based in Tokyo, providing AI solutions for Japanese companies.');
        newOutput.push('Supporting a wide range of clients from large enterprises to SMEs.');
        newOutput.push('');
        newOutput.push('Type "team" to view our team members');
        newOutput.push('Type "cat README.md" for more details');
      }
    } else if (lowerCommand === 'services') {
      newOutput.push('');
      newOutput.push('==================[ サービス一覧 ]==================');
      newOutput.push('');
      newOutput.push('[1] AIコンサルティング');
      newOutput.push('    └─ AI導入戦略の立案');
      newOutput.push('    └─ 技術評価とロードマップ作成');
      newOutput.push('    └─ ROI分析とビジネスケース開発');
      newOutput.push('');
      newOutput.push('[2] カスタムAI開発');
      newOutput.push('    └─ 機械学習モデル構築');
      newOutput.push('    └─ 自然言語処理（日本語特化）');
      newOutput.push('    └─ 画像認識・コンピュータビジョン');
      newOutput.push('');
      newOutput.push('[3] AI統合・実装');
      newOutput.push('    └─ API開発とデプロイメント');
      newOutput.push('    └─ クラウドインフラ構築');
      newOutput.push('    └─ パフォーマンス最適化');
      newOutput.push('');
      newOutput.push('「services <番号>」で詳細情報を表示');
    } else if (lowerCommand === 'works' || lowerCommand === 'projects') {
      newOutput.push('');
      newOutput.push('==================[ 実績・事例 ]==================');
      newOutput.push('');
      newOutput.push('PROJECT_001: EC向けAIアシスタント');
      newOutput.push('├─ ステータス: 完了');
      newOutput.push('├─ クライアント: 大手ECサイト運営企業');
      newOutput.push('└─ 成果: コンバージョン率45%向上');
      newOutput.push('');
      newOutput.push('PROJECT_002: 医療診断支援AI');
      newOutput.push('├─ ステータス: 進行中');
      newOutput.push('├─ クライアント: 国内医療機関ネットワーク');
      newOutput.push('└─ 成果: 早期発見精度92%達成');
      newOutput.push('');
      newOutput.push('PROJECT_003: 金融不正検知システム');
      newOutput.push('├─ ステータス: 完了');
      newOutput.push('├─ クライアント: メガバンク');
      newOutput.push('└─ 成果: 年間2.5億円の不正防止');
      newOutput.push('');
      newOutput.push('「cat project_<番号>」で事例詳細を表示');
    } else if (lowerCommand === 'contact') {
      newOutput.push('');
      newOutput.push('==================[ お問い合わせ ]==================');
      newOutput.push('');
      newOutput.push('メール:    info@pinkietech.jp');
      newOutput.push('電話:      03-1234-5678');
      newOutput.push('住所:      〒150-0001 東京都渋谷区神宮前1-2-3');
      newOutput.push('          PinkieTechビル 5F');
      newOutput.push('');
      newOutput.push('営業時間: 平日 9:00-18:00 (JST)');
      newOutput.push('');
      newOutput.push('ソーシャルメディア:');
      newOutput.push('├─ Twitter:  @pinkietech_jp');
      newOutput.push('├─ LinkedIn: /company/pinkietech-japan');
      newOutput.push('└─ GitHub:   /pinkietech-jp');
      newOutput.push('');
      newOutput.push('「mail」でメッセージを送信');
    } else if (lowerCommand === 'team') {
      newOutput.push('');
      newOutput.push('==================[ チームメンバー ]==================');
      newOutput.push('');
      newOutput.push('代表取締役CEO');
      newOutput.push('├─ 氏名: 山田 太郎');
      newOutput.push('├─ 経歴: 元Google Japan AI研究部門');
      newOutput.push('└─ 専門: 深層学習、自然言語処理');
      newOutput.push('');
      newOutput.push('取締役CTO');
      newOutput.push('├─ 氏名: 鈴木 花子');
      newOutput.push('├─ 経歴: 元楽天技術研究所');
      newOutput.push('└─ 専門: MLインフラ、大規模システム');
      newOutput.push('');
      newOutput.push('エンジニアリング部長');
      newOutput.push('├─ 氏名: 田中 健一');
      newOutput.push('├─ 経歴: 元Microsoft Japan');
      newOutput.push('└─ 専門: コンピュータビジョン、ロボティクス');
    } else if (lowerCommand === 'blog' || lowerCommand === 'news') {
      newOutput.push('');
      newOutput.push('==================[ 最新ニュース ]==================');
      newOutput.push('');
      newOutput.push('[2024-01-15] 日本の医療におけるAIの未来');
      newOutput.push('[2024-01-08] スケーラブルなML基盤の構築方法');
      newOutput.push('[2023-12-20] 2023年のAI技術総括');
      newOutput.push('[2023-12-15] Transformerモデルの実装と応用');
      newOutput.push('');
      newOutput.push('「read <日付>」で記事全文を表示');
    } else if (lowerCommand === 'faq') {
      newOutput.push('');
      newOutput.push('==================[ よくある質問 ]==================');
      newOutput.push('');
      newOutput.push('Q: PinkieTechの強みは何ですか？');
      newOutput.push('A: 最先端のAI研究と実践的なビジネスソリューションを融合させています。');
      newOutput.push('');
      newOutput.push('Q: スタートアップとも協業していますか？');
      newOutput.push('A: はい！スタートアップ向けの特別プログラムをご用意しています。');
      newOutput.push('');
      newOutput.push('Q: どんな業界に対応していますか？');
      newOutput.push('A: 医療、金融、小売、製造業など幅広く対応しています。');
      newOutput.push('');
      newOutput.push('「faq --all」ですべての質問を表示');
    } else if (lowerCommand === 'legal' || lowerCommand === 'privacy') {
      newOutput.push('');
      newOutput.push('==================[ 法的情報 ]==================');
      newOutput.push('');
      newOutput.push('株式会社PinkieTech');
      newOutput.push('Copyright (c) 2023-2024. All rights reserved.');
      newOutput.push('');
      newOutput.push('利用可能な文書:');
      newOutput.push('├─ 利用規約.txt');
      newOutput.push('├─ プライバシーポリシー.txt');
      newOutput.push('└─ クッキーポリシー.txt');
      newOutput.push('');
      newOutput.push('「cat <ファイル名>」で内容を表示');
    } else if (lowerCommand.startsWith('cat ')) {
      const filename = command.substring(4).trim();
      if (filename === 'README.md' || filename === 'readme.md') {
        newOutput.push('');
        newOutput.push('# PinkieTech - 日本発AIイノベーション企業');
        newOutput.push('');
        newOutput.push('## 会社概要');
        newOutput.push('PinkieTechは日本の最先端AI技術企業として、');
        newOutput.push('ビジネスを変革するソリューションを開発しています。');
        newOutput.push('');
        newOutput.push('## 私たちの価値観');
        newOutput.push('- **革新**: AIの可能性を追求');
        newOutput.push('- **倫理**: 責任あるAI開発');
        newOutput.push('- **卓越**: 世界水準のソリューション提供');
        newOutput.push('');
        newOutput.push('## はじめに');
        newOutput.push('`help`コマンドで利用可能なコマンドを確認');
      } else if (filename.includes('project_')) {
        newOutput.push('');
        newOutput.push('=============== PROJECT CASE STUDY ===============');
        newOutput.push('Details coming soon...');
        newOutput.push('Contact us for more information.');
      } else {
        newOutput.push(`cat: ${filename}: No such file or directory`);
      }
    } else if (lowerCommand.startsWith('mail')) {
      newOutput.push('');
      newOutput.push('メールクライアントを起動中...');
      newOutput.push('宛先: info@pinkietech.jp');
      newOutput.push('');
      newOutput.push('[デモ版ではメール機能は実装されていません]');
      newOutput.push('直接 info@pinkietech.jp までご連絡ください');
    } else if (lowerCommand === 'sudo' || lowerCommand.startsWith('sudo ')) {
      newOutput.push('[sudo] guestのパスワード: ');
      newOutput.push('権限がありません。ナイストライ！ 😏');
    } else if (lowerCommand === 'hack' || lowerCommand === 'hack the planet') {
      newOutput.push('');
      newOutput.push('ACCESS DENIED');
      newOutput.push('');
      newOutput.push('冗談です！好奇心旺盛な方、大歓迎です。');
      newOutput.push('採用情報をチェックしてください - あなたのような人材を求めています！');
    } else if (lowerCommand === 'vim' || lowerCommand === 'vi' || lowerCommand === 'emacs' || lowerCommand === 'nano') {
      newOutput.push(`${command}: Command not found`);
      newOutput.push('これはWebターミナルで、本物のシェルではありません！');
      newOutput.push('でも、ターミナルエディタへの愛は評価します。');
    } else if (lowerCommand === 'exit' || lowerCommand === 'quit' || lowerCommand === 'logout') {
      newOutput.push('');
      newOutput.push('さようなら！');
      newOutput.push('ページを再読み込みしています...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      newOutput.push(`-bash: ${command}: コマンドが見つかりません`);
      newOutput.push('「help」で利用可能なコマンドを確認');
    }

    setOutput(newOutput);
    setHistory((prevHistory) => [...prevHistory, command]);
    setHistoryIndex(-1); // Reset history index
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      } else if (historyIndex === 0) {
        setInput('');
        setHistoryIndex(-1);
      }
    }
  };

  return (
    <div
      className={cn(
        'w-full h-full bg-gray-950 text-pink-400 font-mono text-sm p-4 overflow-hidden',
        'flex flex-col',
        'relative'
      )}
      style={{
        fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
        background: 'radial-gradient(ellipse at center, #1a0a14 0%, #000000 100%)',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanlines effect */}
      <div className="pointer-events-none absolute inset-0 opacity-50" 
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236, 72, 153, 0.03) 2px, rgba(236, 72, 153, 0.03) 4px)',
        }}
      />
      <div ref={outputRef} className="flex-grow overflow-y-auto whitespace-pre-wrap custom-scrollbar pr-2">
        {output.map((line, index) => (
          <div key={index} className={line.startsWith('$') ? 'text-pink-300' : 'text-pink-400/90'}>
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4 pt-4 border-t border-pink-500/30">
        <span className="text-pink-300 mr-2 font-bold">guest@pinkietech:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent outline-none text-pink-300 caret-pink-300 terminal-glow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
        />
        <span className={cn(
          'text-pink-300 ml-0.5',
          showCursor ? 'opacity-100' : 'opacity-0'
        )}>▌</span>
      </div>
    </div>
  );
};

export default CLIEmulator;
