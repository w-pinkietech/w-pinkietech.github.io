import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface CLIEmulatorProps {
  initialOutput?: string[];
}

const CLIEmulator: React.FC<CLIEmulatorProps> = ({ initialOutput = [] }) => {
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('guest@pinkietech:~$');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const [commandContext, setCommandContext] = useState('');
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Helper function to pad string considering full-width characters
  const padString = (str: string, targetLength: number): string => {
    let currentLength = 0;
    for (const char of str) {
      if (char.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/)) {
        currentLength += 2;
      } else {
        currentLength += 1;
      }
    }
    const padding = targetLength - currentLength;
    return str + ' '.repeat(Math.max(0, padding));
  };

  const addToOutput = (lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setOutput(prev => [...prev, ...newLines]);
  };

  const handleCommand = (command: string) => {
    // Show the command in output with special marker
    addToOutput(`\x01${currentPrompt} ${isPasswordInput ? '*'.repeat(command.length) : command}`);
    
    // Add to history if not password
    if (!isPasswordInput && command.trim()) {
      setHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }

    // Handle interactive contexts
    if (commandContext === 'sudo_password') {
      if (command) {
        addToOutput(currentLang === 'ja' ? '権限がありません。ナイストライ！ 😏' : 'Permission denied. Nice try! 😏');
      }
      setCommandContext('');
      setIsPasswordInput(false);
      setCurrentPrompt('guest@pinkietech:~$');
    } else if (commandContext === 'mail_subject') {
      if (command) {
        addToOutput(['', currentLang === 'ja' ? '本文を入力してください (Ctrl+Dで送信, Ctrl+Cでキャンセル):' : 'Enter message body (Ctrl+D to send, Ctrl+C to cancel):', '']);
        setCurrentPrompt('>');
        setCommandContext('mail_body');
      } else {
        addToOutput([currentLang === 'ja' ? 'メール作成をキャンセルしました' : 'Mail composition cancelled']);
        setCommandContext('');
        setCurrentPrompt('guest@pinkietech:~$');
      }
    } else if (commandContext === 'mail_body') {
      if (command.toLowerCase() === ':send' || command.toLowerCase() === ':s') {
        addToOutput(['', currentLang === 'ja' ? '送信中...' : 'Sending...']);
        setTimeout(() => {
          addToOutput([currentLang === 'ja' ? '✓ メールを送信しました' : '✓ Email sent successfully', '']);
        }, 500);
        setCommandContext('');
        setCurrentPrompt('guest@pinkietech:~$');
      } else {
        // Continue collecting message body
        addToOutput('');
        setCurrentPrompt('>');
      }
    } else if (commandContext === 'exit_confirm') {
      if (command.toLowerCase() === 'y' || command.toLowerCase() === 'yes') {
        addToOutput(currentLang === 'ja' ? 'さようなら！' : 'Goodbye!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setCommandContext('');
        setCurrentPrompt('guest@pinkietech:~$');
      }
    } else {
      // Normal command processing
      processCommand(command);
    }

    setCurrentInput('');
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();

    if (lowerCommand === 'help') {
      showHelp();
    } else if (lowerCommand === 'clear') {
      setOutput([]);
    } else if (lowerCommand === 'about') {
      showAbout();
    } else if (lowerCommand === 'services') {
      showServices();
    } else if (lowerCommand === 'works' || lowerCommand === 'projects') {
      showWorks();
    } else if (lowerCommand === 'contact') {
      showContact();
    } else if (lowerCommand === 'team') {
      showTeam();
    } else if (lowerCommand === 'sudo' || lowerCommand.startsWith('sudo ')) {
      addToOutput('[sudo] ' + (currentLang === 'ja' ? 'guestのパスワード: ' : 'password for guest: '));
      setCommandContext('sudo_password');
      setIsPasswordInput(true);
      setCurrentPrompt('[sudo] password');
    } else if (lowerCommand === 'mail') {
      addToOutput([
        '',
        '╔══════════════════════════════════════════╗',
        '║        ' + (currentLang === 'ja' ? 'メールクライアント v1.0' : 'Mail Client v1.0') + '        ║',
        '╚══════════════════════════════════════════╝',
        '',
        currentLang === 'ja' ? '宛先: info@pinkietech.jp' : 'To: info@pinkietech.jp',
        currentLang === 'ja' ? '件名を入力してください:' : 'Enter subject:',
        ''
      ]);
      setCommandContext('mail_subject');
      setCurrentPrompt(currentLang === 'ja' ? '件名>' : 'Subject>');
    } else if (lowerCommand === 'exit' || lowerCommand === 'quit' || lowerCommand === 'logout') {
      addToOutput([
        '',
        currentLang === 'ja' ? '本当に終了しますか？ (y/n): ' : 'Are you sure you want to exit? (y/n): '
      ]);
      setCommandContext('exit_confirm');
      setCurrentPrompt('(y/n)');
    } else if (lowerCommand === 'lang' || lowerCommand === 'language') {
      showLanguageInfo();
    } else if (lowerCommand === 'lang ja' || lowerCommand === 'language ja') {
      setCurrentLang('ja');
      i18n.changeLanguage('ja');
      addToOutput('言語を日本語に切り替えました');
    } else if (lowerCommand === 'lang en' || lowerCommand === 'language en') {
      setCurrentLang('en');
      i18n.changeLanguage('en');
      addToOutput('Language switched to English');
    } else if (lowerCommand === 'whoami') {
      addToOutput('guest');
    } else if (lowerCommand === 'pwd') {
      addToOutput('/home/guest');
    } else if (lowerCommand === 'ls') {
      addToOutput('README.md  projects/  documents/  .config/');
    } else if (lowerCommand === 'date') {
      addToOutput(new Date().toString());
    } else if (lowerCommand.startsWith('echo ')) {
      addToOutput(command.substring(5));
    } else if (lowerCommand === 'neofetch' || lowerCommand === 'info') {
      showNeofetch();
    } else if (lowerCommand === 'banner') {
      showBanner();
    } else if (lowerCommand === 'readme') {
      handleCat('README.md');
    } else if (lowerCommand.startsWith('cat ')) {
      handleCat(command.substring(4).trim());
    } else if (lowerCommand === 'repo' || lowerCommand === 'repository') {
      addToOutput(['', currentLang === 'ja' ? 'GitHubリポジトリを開いています...' : 'Opening GitHub repository...', '']);
      window.open('https://github.com/w-pinkietech', '_blank');
      addToOutput(currentLang === 'ja' ? '→ https://github.com/w-pinkietech' : '→ https://github.com/w-pinkietech');
    } else if (lowerCommand === 'hack' || lowerCommand === 'hack the planet') {
      addToOutput(['', 'ACCESS DENIED', '', currentLang === 'ja' ? '冗談です！好奇心旺盛な方、大歓迎です。' : 'Just kidding! We appreciate your curiosity.']);
    } else if (command.trim()) {
      addToOutput([
        `-bash: ${command}: ${currentLang === 'ja' ? 'コマンドが見つかりません' : 'command not found'}`,
        currentLang === 'ja' ? '「help」で利用可能なコマンドを確認' : 'Type "help" for available commands'
      ]);
    }
  };

  const showHelp = () => {
    const lines = [''];
    lines.push('═══════════════════════════════════════════════════════');
    
    const title = currentLang === 'ja' ? '利用可能なコマンド一覧' : 'Available Commands';
    lines.push('                    ' + title);
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('');
    
    const navTitle = currentLang === 'ja' ? 'ナビゲーション:' : 'Navigation:';
    lines.push(navTitle);
    lines.push('');
    
    const commands = [
      { cmd: 'about', desc: currentLang === 'ja' ? '会社概要' : 'About us' },
      { cmd: 'services', desc: currentLang === 'ja' ? 'サービス一覧' : 'Our services' },
      { cmd: 'works', desc: currentLang === 'ja' ? '実績・事例' : 'Projects' },
      { cmd: 'contact', desc: currentLang === 'ja' ? 'お問い合わせ' : 'Contact us' },
      { cmd: 'team', desc: currentLang === 'ja' ? 'チームメンバー' : 'Team members' },
      { cmd: 'repo', desc: currentLang === 'ja' ? 'GitHub' : 'GitHub repo' },
    ];
    
    commands.forEach(({ cmd, desc }) => {
      lines.push(`  ${cmd.padEnd(11)} - ${desc}`);
    });
    
    lines.push('');
    
    const sysTitle = currentLang === 'ja' ? 'システム:' : 'System:';
    lines.push(sysTitle);
    lines.push('');
    
    const sysCommands = [
      { cmd: 'clear', desc: currentLang === 'ja' ? '画面をクリア' : 'Clear screen' },
      { cmd: 'help', desc: currentLang === 'ja' ? 'ヘルプを表示' : 'Show help' },
      { cmd: 'whoami', desc: currentLang === 'ja' ? '現在のユーザー' : 'Current user' },
      { cmd: 'pwd', desc: currentLang === 'ja' ? '現在のディレクトリ' : 'Working directory' },
      { cmd: 'ls', desc: currentLang === 'ja' ? 'ファイル一覧' : 'List files' },
      { cmd: 'cat', desc: currentLang === 'ja' ? 'ファイル表示' : 'Display file' },
      { cmd: 'readme', desc: currentLang === 'ja' ? 'README表示' : 'Show README' },
      { cmd: 'neofetch', desc: currentLang === 'ja' ? 'システム情報' : 'System info' },
      { cmd: 'banner', desc: currentLang === 'ja' ? 'ロゴ表示' : 'Show logo' },
      { cmd: 'lang', desc: currentLang === 'ja' ? '言語切替' : 'Change language' },
      { cmd: 'mail', desc: currentLang === 'ja' ? 'メール送信' : 'Send email' },
      { cmd: 'exit', desc: currentLang === 'ja' ? '終了' : 'Exit' },
    ];
    
    sysCommands.forEach(({ cmd, desc }) => {
      lines.push(`  ${cmd.padEnd(11)} - ${desc}`);
    });
    
    lines.push('');
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('');
    
    addToOutput(lines);
  };

  const showAbout = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ PinkieTechについて ]==================');
      lines.push('');
      lines.push('PinkieTechは2023年に設立された日本のAIテクノロジー企業です。');
      lines.push('最先端のAIソリューションとコンサルティングを専門としています。');
      lines.push('');
      lines.push('私たちのミッション:');
      lines.push('  > AIテクノロジーの民主化');
      lines.push('  > 革新的なソリューションの構築');
      lines.push('  > AIによるビジネスの変革');
      lines.push('');
      lines.push('東京を拠点に、日本の企業向けにAIソリューションを提供。');
      lines.push('大手企業から中小企業まで、幅広いクライアントをサポート。');
    } else {
      lines.push('==================[ ABOUT PINKIETECH ]==================');
      lines.push('');
      lines.push('PinkieTech is a Japanese AI technology company founded in 2023.');
      lines.push('We specialize in cutting-edge AI solutions and consulting.');
      lines.push('');
      lines.push('Our Mission:');
      lines.push('  > Democratize AI technology');
      lines.push('  > Build innovative solutions');
      lines.push('  > Transform businesses with AI');
      lines.push('');
      lines.push('Based in Tokyo, providing AI solutions for Japanese companies.');
      lines.push('Supporting a wide range of clients from large enterprises to SMEs.');
    }
    lines.push('');
    addToOutput(lines);
  };

  const showServices = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ サービス一覧 ]==================');
      lines.push('');
      lines.push('[1] AIコンサルティング');
      lines.push('    └─ AI導入戦略の立案');
      lines.push('    └─ 技術評価とロードマップ作成');
      lines.push('    └─ ROI分析とビジネスケース開発');
      lines.push('');
      lines.push('[2] カスタムAI開発');
      lines.push('    └─ 機械学習モデル構築');
      lines.push('    └─ 自然言語処理（日本語特化）');
      lines.push('    └─ 画像認識・コンピュータビジョン');
      lines.push('');
      lines.push('[3] AI統合・実装');
      lines.push('    └─ API開発とデプロイメント');
      lines.push('    └─ クラウドインフラ構築');
      lines.push('    └─ パフォーマンス最適化');
    } else {
      lines.push('==================[ OUR SERVICES ]==================');
      lines.push('');
      lines.push('[1] AI Consulting');
      lines.push('    └─ Strategic AI implementation planning');
      lines.push('    └─ Technology assessment and roadmap');
      lines.push('    └─ ROI analysis and business case development');
      lines.push('');
      lines.push('[2] Custom AI Development');
      lines.push('    └─ Machine Learning models');
      lines.push('    └─ Natural Language Processing');
      lines.push('    └─ Computer Vision solutions');
      lines.push('');
      lines.push('[3] AI Integration');
      lines.push('    └─ API development and deployment');
      lines.push('    └─ Cloud infrastructure setup');
      lines.push('    └─ Performance optimization');
    }
    lines.push('');
    addToOutput(lines);
  };

  const showWorks = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ 実績・事例 ]==================');
      lines.push('');
      lines.push('PROJECT_001: EC向けAIアシスタント');
      lines.push('├─ ステータス: 完了');
      lines.push('├─ クライアント: 大手ECサイト運営企業');
      lines.push('└─ 成果: コンバージョン率45%向上');
      lines.push('');
      lines.push('PROJECT_002: 医療診断支援AI');
      lines.push('├─ ステータス: 進行中');
      lines.push('├─ クライアント: 国内医療機関ネットワーク');
      lines.push('└─ 成果: 早期発見精度92%達成');
      lines.push('');
      lines.push('PROJECT_003: 金融不正検知システム');
      lines.push('├─ ステータス: 完了');
      lines.push('├─ クライアント: メガバンク');
      lines.push('└─ 成果: 年間2.5億円の不正防止');
    } else {
      lines.push('==================[ RECENT PROJECTS ]==================');
      lines.push('');
      lines.push('PROJECT_001: E-Commerce AI Assistant');
      lines.push('├─ Status: COMPLETED');
      lines.push('├─ Client: Major E-commerce Platform');
      lines.push('└─ Result: 45% increase in conversion rate');
      lines.push('');
      lines.push('PROJECT_002: Medical Diagnosis AI');
      lines.push('├─ Status: IN_PROGRESS');
      lines.push('├─ Client: Healthcare Network');
      lines.push('└─ Result: 92% accuracy in early detection');
      lines.push('');
      lines.push('PROJECT_003: Financial Fraud Detection');
      lines.push('├─ Status: COMPLETED');
      lines.push('├─ Client: Major Bank');
      lines.push('└─ Result: $2.3M saved in prevented fraud');
    }
    lines.push('');
    addToOutput(lines);
  };

  const showContact = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ お問い合わせ ]==================');
      lines.push('');
      lines.push('メール:    info@pinkietech.jp');
      lines.push('電話:      03-1234-5678');
      lines.push('住所:      〒150-0001 東京都渋谷区神宮前1-2-3');
      lines.push('          PinkieTechビル 5F');
      lines.push('');
      lines.push('営業時間: 平日 9:00-18:00 (JST)');
      lines.push('');
      lines.push('ソーシャルメディア:');
      lines.push('├─ Twitter:  @pinkietech_jp');
      lines.push('├─ LinkedIn: /company/pinkietech-japan');
      lines.push('└─ GitHub:   /pinkietech-jp');
    } else {
      lines.push('==================[ CONTACT INFORMATION ]==================');
      lines.push('');
      lines.push('Email:    info@pinkietech.jp');
      lines.push('Phone:    +81 3-1234-5678');
      lines.push('Address:  PinkieTech Building 5F');
      lines.push('          1-2-3 Jingumae, Shibuya-ku');
      lines.push('          Tokyo 150-0001, Japan');
      lines.push('');
      lines.push('Office Hours: Mon-Fri 9:00-18:00 (JST)');
      lines.push('');
      lines.push('Social Media:');
      lines.push('├─ Twitter:  @pinkietech_jp');
      lines.push('├─ LinkedIn: /company/pinkietech-japan');
      lines.push('└─ GitHub:   /pinkietech-jp');
    }
    lines.push('');
    addToOutput(lines);
  };

  const showTeam = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ チームメンバー ]==================');
      lines.push('');
      lines.push('代表取締役CEO');
      lines.push('├─ 氏名: 山田 太郎');
      lines.push('├─ 経歴: 元Google Japan AI研究部門');
      lines.push('└─ 専門: 深層学習、自然言語処理');
      lines.push('');
      lines.push('取締役CTO');
      lines.push('├─ 氏名: 鈴木 花子');
      lines.push('├─ 経歴: 元楽天技術研究所');
      lines.push('└─ 専門: ML インフラ、大規模システム');
      lines.push('');
      lines.push('エンジニアリング部長');
      lines.push('├─ 氏名: 田中 健一');
      lines.push('├─ 経歴: 元Microsoft Japan');
      lines.push('└─ 専門: コンピュータビジョン、ロボティクス');
    } else {
      lines.push('==================[ TEAM MEMBERS ]==================');
      lines.push('');
      lines.push('CEO & Founder');
      lines.push('├─ Name: Taro Yamada');
      lines.push('├─ Background: Ex-Google Japan AI Research');
      lines.push('└─ Expertise: Deep Learning, NLP');
      lines.push('');
      lines.push('CTO');
      lines.push('├─ Name: Hanako Suzuki');
      lines.push('├─ Background: Ex-Rakuten Institute of Technology');
      lines.push('└─ Expertise: ML Infrastructure, Scalability');
      lines.push('');
      lines.push('VP of Engineering');
      lines.push('├─ Name: Kenichi Tanaka');
      lines.push('├─ Background: Ex-Microsoft Japan');
      lines.push('└─ Expertise: Computer Vision, Robotics');
    }
    lines.push('');
    addToOutput(lines);
  };

  const showLanguageInfo = () => {
    addToOutput([
      '',
      'Current language / 現在の言語: ' + (currentLang === 'ja' ? '日本語' : 'English'),
      '',
      'Available languages / 利用可能な言語:',
      '  • lang ja - 日本語に切り替え',
      '  • lang en - Switch to English',
      ''
    ]);
  };

  const showBanner = () => {
    const lines = [''];
    lines.push('██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗████████╗███████╗ ██████╗██╗  ██╗');
    lines.push('██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║');
    lines.push('██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗     ██║   █████╗  ██║     ███████║');
    lines.push('██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║');
    lines.push('██║     ██║██║ ╚████║██║  ██╗██║███████╗   ██║   ███████╗╚██████╗██║  ██║');
    lines.push('╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝');
    lines.push('');
    lines.push('                       AI Innovation from Japan');
    lines.push('');
    addToOutput(lines);
  };

  const showNeofetch = () => {
    const lines = [''];
    lines.push('       ___      ___');
    lines.push('      /  /\\    /  /\\\\     guest@pinkietech');
    lines.push('     /  /::\\  /  /::\\\\    ----------------');
    lines.push('    /  /:/\\:\\  /:/\\:\\\\   OS: PinkieOS 1.0 LTS');
    lines.push('   /  /:/~/:/  /:/~/:/    Kernel: 6.1.0-pinkie');
    lines.push('  /__/:/ /:/  /:/ /:/     Uptime: 42 days');
    lines.push('  \\  \\:\\/:/  /:/ /:/      Shell: pinkiesh 1.0');
    lines.push('   \\  \\::/  /:/ /:/       Terminal: PinkieTerm');
    lines.push('    \\  \\:\\/:/ /:/         CPU: Neural Core i9');
    lines.push('     \\  \\::/ /:/          Memory: ∞ GB');
    lines.push('      \\__\\/ /:/           ');
    lines.push('        /__/:/            ');
    lines.push('        \\__\\/             ');
    lines.push('');
    addToOutput(lines);
  };

  const handleCat = (filename: string) => {
    if (filename === 'README.md' || filename === 'readme.md') {
      const lines = [''];
      if (currentLang === 'ja') {
        lines.push('# PinkieTech - 日本発AIイノベーション企業');
        lines.push('');
        lines.push('## 会社概要');
        lines.push('PinkieTechは日本の最先端AI技術企業として、');
        lines.push('ビジネスを変革するソリューションを開発しています。');
        lines.push('');
        lines.push('## 私たちの価値観');
        lines.push('- **革新**: AIの可能性を追求');
        lines.push('- **倫理**: 責任あるAI開発');
        lines.push('- **卓越**: 世界水準のソリューション提供');
      } else {
        lines.push('# PinkieTech - AI Innovation Company from Japan');
        lines.push('');
        lines.push('## About Us');
        lines.push('PinkieTech is at the forefront of AI innovation,');
        lines.push('developing solutions that transform businesses.');
        lines.push('');
        lines.push('## Our Values');
        lines.push('- **Innovation**: Pushing the boundaries of AI');
        lines.push('- **Ethics**: Responsible AI development');
        lines.push('- **Excellence**: Delivering world-class solutions');
      }
      lines.push('');
      addToOutput(lines);
    } else {
      addToOutput(`cat: ${filename}: No such file or directory`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim() || commandContext) {
        handleCommand(currentInput);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!commandContext && currentInput.trim()) {
        // Get all available commands
        const availableCommands = [
          'help', 'clear', 'about', 'services', 'works', 'projects', 'contact', 'team',
          'whoami', 'pwd', 'ls', 'date', 'echo', 'neofetch', 'info', 'cat', 'readme',
          'banner', 'repo', 'repository', 'lang', 'language', 'mail', 'sudo', 'exit', 
          'quit', 'logout', 'hack'
        ];
        
        const matches = availableCommands.filter(cmd => 
          cmd.startsWith(currentInput.toLowerCase())
        );
        
        if (matches.length === 1) {
          // Single match - complete it
          setCurrentInput(matches[0]);
        } else if (matches.length > 1) {
          // Multiple matches - show them
          addToOutput(`\x01${currentPrompt} ${currentInput}`);
          addToOutput('');
          addToOutput(matches.join('  '));
          addToOutput('');
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!commandContext && history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setCurrentInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!commandContext && historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setCurrentInput(history[history.length - 1 - newIndex]);
        setHistoryIndex(newIndex);
      } else if (historyIndex === 0) {
        setCurrentInput('');
        setHistoryIndex(-1);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setOutput([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      // Always show the current input line with ^C
      addToOutput(`\x01${currentPrompt} ${currentInput}^C`);
      
      if (commandContext) {
        if (commandContext === 'mail_subject' || commandContext === 'mail_body') {
          addToOutput(currentLang === 'ja' ? 'メール作成をキャンセルしました' : 'Mail composition cancelled');
        }
        setCommandContext('');
        setCurrentPrompt('guest@pinkietech:~$');
        setIsPasswordInput(false);
      }
      
      // Clear current input
      setCurrentInput('');
    } else if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      if (commandContext === 'mail_body') {
        addToOutput(['^D', '', currentLang === 'ja' ? '送信中...' : 'Sending...']);
        setTimeout(() => {
          addToOutput([currentLang === 'ja' ? '✓ メールを送信しました' : '✓ Email sent successfully', '']);
        }, 500);
        setCommandContext('');
        setCurrentPrompt('guest@pinkietech:~$');
        setCurrentInput('');
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className={cn(
        'w-full h-full bg-gray-950 text-pink-400 font-mono text-sm p-4 overflow-y-auto overflow-x-hidden',
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
      
      <div className="relative z-10">
        {/* Output history */}
        {output.map((line, index) => {
          // Check if line contains box drawing characters
          const hasBoxDrawing = line.includes('┌') || line.includes('┐') || line.includes('└') || line.includes('┘') || 
                               line.includes('├') || line.includes('┤') || line.includes('─') || line.includes('│') ||
                               line.includes('█') || line.includes('╗') || line.includes('╚') || line.includes('╔');
          
          return (
            <div key={index} className={line.startsWith('\x01') 
              ? 'text-pink-300 whitespace-pre font-mono' 
              : hasBoxDrawing 
                ? 'text-pink-400/90 whitespace-pre font-mono'
                : 'text-pink-400/90 whitespace-pre-wrap break-words font-mono'}>
              {line.startsWith('\x01') ? line.substring(1) : line}
            </div>
          );
        })}
        
        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-pink-300 mr-2 font-bold">{currentPrompt}</span>
          <input
            ref={inputRef}
            type={isPasswordInput ? 'password' : 'text'}
            className="flex-grow bg-transparent outline-none text-pink-300 caret-pink-300 terminal-glow"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
          />
          <span className="text-pink-300 ml-0.5 animate-pulse">▌</span>
        </div>
      </div>
    </div>
  );
};

export default CLIEmulator;