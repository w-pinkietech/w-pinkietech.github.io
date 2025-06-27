import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface CLIEmulatorProps {
  initialOutput?: string[];
}

const CLIEmulator: React.FC<CLIEmulatorProps> = ({ initialOutput = [] }) => {
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [currentInput, setCurrentInput] = useState('');
  const getCyberPrompt = () => {
    const user = '\x02guest\x02';
    const at = '\x03@\x03';
    const host = '\x02pinkietech\x02';
    const path = '\x03:~$\x03';
    return `${user}${at}${host}${path}`;
  };
  
  const [currentPrompt, setCurrentPrompt] = useState(getCyberPrompt());
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentLang, setCurrentLang] = useState<'ja' | 'en'>('ja');
  const [commandContext, setCommandContext] = useState('');
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<any>(null);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { i18n } = useTranslation();

  // Focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);


  const addToOutput = (lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setOutput(prev => [...prev, ...newLines]);
  };

  const handleCommand = (command: string) => {
    // Show the command in output with special marker - strip control characters for display
    const cleanPrompt = currentPrompt.replace(/\x02/g, '').replace(/\x03/g, '');
    addToOutput(`\x01${cleanPrompt} ${isPasswordInput ? '*'.repeat(command.length) : command}`);
    
    // Add to history if not password
    if (!isPasswordInput && command.trim()) {
      setHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }

    // Handle interactive contexts
    if (commandContext === 'sudo_password') {
      if (command) {
        addToOutput('\x02[ERROR]\x02 ' + (currentLang === 'ja' ? '権限がありません。ナイストライ！ 😏' : 'Permission denied. Nice try! 😏'));
      }
      setCommandContext('');
      setIsPasswordInput(false);
      setCurrentPrompt(getCyberPrompt());
    } else if (commandContext === 'mail_subject') {
      if (command) {
        addToOutput(['', currentLang === 'ja' ? '本文を入力してください (Ctrl+Dで送信, Ctrl+Cでキャンセル):' : 'Enter message body (Ctrl+D to send, Ctrl+C to cancel):', '']);
        setCurrentPrompt('>');
        setCommandContext('mail_body');
      } else {
        addToOutput([currentLang === 'ja' ? 'メール作成をキャンセルしました' : 'Mail composition cancelled']);
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
      }
    } else if (commandContext === 'mail_body') {
      if (command.toLowerCase() === ':send' || command.toLowerCase() === ':s') {
        addToOutput(['', currentLang === 'ja' ? '送信中...' : 'Sending...']);
        setTimeout(() => {
          addToOutput([currentLang === 'ja' ? '✓ メールを送信しました' : '✓ Email sent successfully', '']);
        }, 500);
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
      } else {
        // Continue collecting message body
        addToOutput('');
        setCurrentPrompt('>');
      }
    } else if (commandContext === 'guess_game') {
      const guess = parseInt(command);
      if (isNaN(guess)) {
        addToOutput(currentLang === 'ja' ? '数字を入力してください' : 'Please enter a number');
      } else if (guess < gameState.target) {
        gameState.attempts++;
        addToOutput('\x03[HINT]\x03 ' + (currentLang === 'ja' ? 'もっと大きい数です ↑' : 'Too low! ↑'));
      } else if (guess > gameState.target) {
        gameState.attempts++;
        addToOutput('\x03[HINT]\x03 ' + (currentLang === 'ja' ? 'もっと小さい数です ↓' : 'Too high! ↓'));
      } else {
        const points = Math.max(10, 50 - gameState.attempts * 5);
        addToOutput(['', 
          '\x02[SUCCESS]\x02 ' + (currentLang === 'ja' ? `正解！ ${gameState.attempts}回で当てました！` : `Correct! You got it in ${gameState.attempts} attempts!`),
          '\x03+' + points + 'pts\x03',
          ''
        ]);
        setScore(prev => prev + points);
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
        setGameState(null);
        
        if (gameState.attempts <= 5) {
          unlockAchievement('lucky', currentLang === 'ja' ? 'ラッキー' : 'Lucky', 15);
        }
      }
    } else if (commandContext === 'quiz_game') {
      const answer = command.toLowerCase();
      const correctAnswer = gameState.questions[gameState.currentQuestion].answer.toLowerCase();
      
      if (answer === correctAnswer || answer === correctAnswer[0]) {
        addToOutput(['\x02[CORRECT]\x02 ' + (currentLang === 'ja' ? '正解！' : 'Correct!'), '']);
        gameState.score += 10;
        gameState.currentQuestion++;
        
        if (gameState.currentQuestion < gameState.questions.length) {
          const q = gameState.questions[gameState.currentQuestion];
          addToOutput([`Q${gameState.currentQuestion + 1}: ${q.question}`, '', ...q.options, '']);
        } else {
          addToOutput(['',
            currentLang === 'ja' ? 'クイズ終了！' : 'Quiz completed!',
            currentLang === 'ja' ? `スコア: ${gameState.score}/${gameState.questions.length * 10}` : `Score: ${gameState.score}/${gameState.questions.length * 10}`,
            ''
          ]);
          setScore(prev => prev + gameState.score);
          if (gameState.score === gameState.questions.length * 10) {
            unlockAchievement('genius', currentLang === 'ja' ? '天才' : 'Genius', 30);
          }
          setCommandContext('');
          setCurrentPrompt(getCyberPrompt());
          setGameState(null);
        }
      } else {
        addToOutput(['\x02[WRONG]\x02 ' + (currentLang === 'ja' ? '不正解...' : 'Incorrect...'), '']);
        gameState.currentQuestion++;
        
        if (gameState.currentQuestion < gameState.questions.length) {
          const q = gameState.questions[gameState.currentQuestion];
          addToOutput([`Q${gameState.currentQuestion + 1}: ${q.question}`, '', ...q.options, '']);
        } else {
          addToOutput(['',
            currentLang === 'ja' ? 'クイズ終了！' : 'Quiz completed!',
            currentLang === 'ja' ? `スコア: ${gameState.score}/${gameState.questions.length * 10}` : `Score: ${gameState.score}/${gameState.questions.length * 10}`,
            ''
          ]);
          setScore(prev => prev + gameState.score);
          setCommandContext('');
          setCurrentPrompt(getCyberPrompt());
          setGameState(null);
        }
      }
    } else if (commandContext === 'exit_confirm') {
      if (command.toLowerCase() === 'y' || command.toLowerCase() === 'yes') {
        addToOutput(currentLang === 'ja' ? 'さようなら！' : 'Goodbye!');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
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
      showAvailableCommands();
    } else if (lowerCommand === 'date') {
      addToOutput(new Date().toString());
    } else if (lowerCommand.startsWith('echo ')) {
      addToOutput(command.substring(5));
    } else if (lowerCommand === 'neofetch' || lowerCommand === 'info') {
      showNeofetch();
    } else if (lowerCommand === 'banner') {
      showBanner();
    } else if (lowerCommand === 'readme') {
      showReadme();
    } else if (lowerCommand === 'cat') {
      showCat();
    } else if (lowerCommand.startsWith('cat ')) {
      showCat();
    } else if (lowerCommand === 'repo' || lowerCommand === 'repository') {
      addToOutput(['', currentLang === 'ja' ? 'GitHubリポジトリを開いています...' : 'Opening GitHub repository...', '']);
      window.open('https://github.com/w-pinkietech', '_blank');
      addToOutput(currentLang === 'ja' ? '→ https://github.com/w-pinkietech' : '→ https://github.com/w-pinkietech');
    } else if (lowerCommand === 'fuck') {
      showPinkieYou();
      unlockAchievement('rebel', currentLang === 'ja' ? '反逆者' : 'Rebel', 20);
    } else if (lowerCommand === 'hack' || lowerCommand === 'hack the planet') {
      addToOutput(['', '\x02[ACCESS DENIED]\x02', '', currentLang === 'ja' ? '\x03> 冗談です！好奇心旺盛な方、大歓迎です。\x03' : '\x03> Just kidding! We appreciate your curiosity.\x03']);
      unlockAchievement('hacker', currentLang === 'ja' ? 'ハッカー志望' : 'Wannabe Hacker', 10);
    } else if (lowerCommand === 'game' || lowerCommand === 'games') {
      showGameMenu();
    } else if (lowerCommand === 'game 1' || lowerCommand === 'game guess' || lowerCommand === 'guess') {
      startGuessGame();
    } else if (lowerCommand === 'game 2' || lowerCommand === 'game quiz' || lowerCommand === 'quiz') {
      startQuizGame();
    } else if (lowerCommand === 'game 3' || lowerCommand === 'game typing' || lowerCommand === 'typing') {
      addToOutput(['', currentLang === 'ja' ? '準備中...' : 'Coming soon...', '']);
    } else if (lowerCommand === 'achievements' || lowerCommand === 'achievement') {
      showAchievements();
    } else if (lowerCommand === 'score') {
      addToOutput(['', currentLang === 'ja' ? `現在のスコア: ${score}点` : `Current score: ${score} points`, '']);
    } else if (command.trim()) {
      addToOutput([
        `\x02[ERROR]\x02 ${command}: ${currentLang === 'ja' ? 'コマンドが見つかりません' : 'command not found'}`,
        `\x03${currentLang === 'ja' ? '> 「help」で利用可能なコマンドを確認' : '> Type "help" for available commands'}\x03`
      ]);
    }
  };

  const showHelp = () => {
    const lines = [''];
    lines.push('\x03╔════════════════════════════════════════════════════════╗\x03');
    lines.push('\x03║              \x03' + (currentLang === 'ja' ? '\x02利用可能なコマンド一覧\x02' : '\x02Available Commands\x02') + '\x03              ║\x03');
    lines.push('\x03╚════════════════════════════════════════════════════════╝\x03');
    lines.push('');
    
    const navTitle = currentLang === 'ja' ? '\x02【ナビゲーション】\x02' : '\x02[Navigation]\x02';
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
    
    const sysTitle = currentLang === 'ja' ? '\x02【システム】\x02' : '\x02[System]\x02';
    lines.push(sysTitle);
    lines.push('');
    
    const sysCommands = [
      { cmd: 'clear', desc: currentLang === 'ja' ? '画面をクリア' : 'Clear screen' },
      { cmd: 'help', desc: currentLang === 'ja' ? 'ヘルプを表示' : 'Show help' },
      { cmd: 'whoami', desc: currentLang === 'ja' ? '現在のユーザー' : 'Current user' },
      { cmd: 'pwd', desc: currentLang === 'ja' ? '現在のディレクトリ' : 'Working directory' },
      { cmd: 'ls', desc: currentLang === 'ja' ? 'コマンド一覧' : 'List commands' },
      { cmd: 'cat', desc: currentLang === 'ja' ? '猫を表示' : 'Show cat' },
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
    lines.push('\x03──────────────────────────────────────────────────────────\x03');
    lines.push('');
    
    addToOutput(lines);
  };

  const showAbout = () => {
    const lines = [''];
    if (currentLang === 'ja') {
      lines.push('==================[ PinkieTechについて ]==================');
      lines.push('');
      lines.push('PinkieTechは2025年に設立された企業です。');
      lines.push('');
      lines.push('創業のきっかけ:');
      lines.push('北九州でのOSSによる工場の見える化活動への参加でした。');
      lines.push('OSS活動をしているにも関わらずGitHubを使わず、zipや');
      lines.push('イメージファイルでの配布が行われており、情報格差を感じました。');
      lines.push('');
      lines.push('さらに日本の産業構造について学びました。大企業は約70%を');
      lines.push('外注していますが、設計などの知識は上流の大企業のみが抱え、');
      lines.push('中小企業の多くは量産に関するノウハウしか持たないため、');
      lines.push('付加価値を産みにくい構造になっています。');
      lines.push('');
      lines.push('この現状を変えるにはソフトウェアの力が必要だと確信し、');
      lines.push('モノづくり × OSS × AIの融合に取り組んでいます。');
      lines.push('');
      lines.push('日本の中小製造業に新たな可能性を開拓することを目指しています。');
    } else {
      lines.push('==================[ ABOUT PINKIETECH ]==================');
      lines.push('');
      lines.push('PinkieTech was founded in 2025.');
      lines.push('');
      lines.push('Our Origin Story:');
      lines.push('It started with participation in OSS-based factory visualization');
      lines.push('activities in Kitakyushu. Coming from the IT/AI world,');
      lines.push('I was shocked by the different tools and mindsets in manufacturing.');
      lines.push('');
      lines.push('I learned about Japan\'s industrial structure where SMEs');
      lines.push('struggle to create added value. I realized software power');
      lines.push('is needed to change this reality.');
      lines.push('');
      lines.push('We focus on Manufacturing × OSS × AI fusion to open new');
      lines.push('possibilities for Japanese small and medium manufacturers.');
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
      lines.push('お問い合わせ方法:');
      lines.push('X (Twitter) のダイレクトメッセージでお願いします');
      lines.push('');
      lines.push('X (Twitter): @pinkietech');
      lines.push('GitHub:      https://github.com/w-pinkietech');
      lines.push('');
      lines.push('所在地:');
      lines.push('〒806-0047 福岡県北九州市八幡西区塔野１丁目１４‐２２');
      lines.push('');
      lines.push('※ お気軽にDMでお声がけください');
    } else {
      lines.push('==================[ CONTACT INFORMATION ]==================');
      lines.push('');
      lines.push('Contact Method:');
      lines.push('Please send a direct message on X (Twitter)');
      lines.push('');
      lines.push('X (Twitter): @pinkietech');
      lines.push('GitHub:      https://github.com/w-pinkietech');
      lines.push('');
      lines.push('Location:');
      lines.push('1-14-22 Tono, Yahatanishi-ku, Kitakyushu-shi');
      lines.push('Fukuoka 806-0047, Japan');
      lines.push('');
      lines.push('※ Feel free to reach out via DM');
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
    lines.push('\x02██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗████████╗███████╗ ██████╗██╗  ██╗\x02');
    lines.push('\x02██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝╚══██╔══╝██╔════╝██╔════╝██║  ██║\x02');
    lines.push('\x02██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗     ██║   █████╗  ██║     ███████║\x02');
    lines.push('\x02██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝     ██║   ██╔══╝  ██║     ██╔══██║\x02');
    lines.push('\x02██║     ██║██║ ╚████║██║  ██╗██║███████╗   ██║   ███████╗╚██████╗██║  ██║\x02');
    lines.push('\x02╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝\x02');
    lines.push('');
    lines.push('\x03                       AI Innovation from Japan\x03');
    lines.push('');
    addToOutput(lines);
  };

  const showNeofetch = () => {
    const lines = [''];
    lines.push('\x03    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x03');
    lines.push('\x03   ████████████████████████████\x03    \x02guest@pinkietech\x02');
    lines.push('\x03  ██▀░░░░░░░░░░░░░░░░░░░░░░░▀██\x03    ----------------');
    lines.push('\x03  ██░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░██\x03    OS: PinkieOS 2077');
    lines.push('\x03  ██░░██████████████████████░░██\x03    Kernel: 6.1.0-cyber');
    lines.push('\x03  ██░░██┌─┐┬┌┐┌┬┌─┬┌─┐████░░██\x03    Shell: neuroshell v2');
    lines.push('\x03  ██░░██├─┘│││├┴┐│├┤ ████░░██\x03    Terminal: CyberTerm');
    lines.push('\x03  ██░░██┴  ┴┘└┘┴ ┴┴└─┘████░░██\x03    CPU: Neural Core X');
    lines.push('\x03  ██░░██████████████████████░░██\x03    GPU: RTX 9090 Ti');
    lines.push('\x03  ██░░██▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀██░░██\x03    RAM: 256GB DDR7');
    lines.push('\x03  ██░░░░░░░░░░░░░░░░░░░░░░░░██\x03    Uptime: ∞');
    lines.push('\x03  ██▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄██\x03    ');
    lines.push('\x03   ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀\x03     ');
    lines.push('');
    addToOutput(lines);
  };

  const showAvailableCommands = () => {
    const commands = [
      'about', 'achievements', 'banner', 'cat', 'clear', 'contact', 
      'date', 'echo', 'exit', 'game', 'help', 'lang', 
      'logout', 'ls', 'mail', 'neofetch', 'pwd', 'quit', 
      'readme', 'repo', 'score', 'services', 'team', 'whoami', 'works'
    ].sort();
    
    // Format in columns (4 columns)
    const lines = [''];
    const colWidth = 15;
    const cols = 4;
    
    for (let i = 0; i < commands.length; i += cols) {
      let line = '';
      for (let j = 0; j < cols && i + j < commands.length; j++) {
        line += commands[i + j].padEnd(colWidth);
      }
      lines.push(line.trim());
    }
    
    lines.push('');
    lines.push(currentLang === 'ja' ? '※ 「help」で詳細を表示' : '※ Type "help" for details');
    lines.push('');
    
    addToOutput(lines);
  };

  const showPinkieYou = () => {
    const lines = [''];
    lines.push('\x02[SYSTEM BREACH DETECTED]\x02');
    lines.push('\x03[WARNING] Unauthorized command execution\x03');
    lines.push('');
    lines.push('\x02▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\x02');
    lines.push('');
    lines.push('  \x02██████╗ ██╗███╗   ██╗██╗  ██╗██╗███████╗\x02');
    lines.push('  \x02██╔══██╗██║████╗  ██║██║ ██╔╝██║██╔════╝\x02');
    lines.push('  \x02██████╔╝██║██╔██╗ ██║█████╔╝ ██║█████╗\x02');
    lines.push('  \x02██╔═══╝ ██║██║╚██╗██║██╔═██╗ ██║██╔══╝\x02');
    lines.push('  \x02██║     ██║██║ ╚████║██║  ██╗██║███████╗\x02');
    lines.push('  \x02╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝\x02');
    lines.push('');
    lines.push('  \x02██╗   ██╗ ██████╗ ██╗   ██╗██╗██╗██╗\x02');
    lines.push('  \x02╚██╗ ██╔╝██╔═══██╗██║   ██║██║██║██║\x02');
    lines.push('   \x02╚████╔╝ ██║   ██║██║   ██║██║██║██║\x02');
    lines.push('    \x02╚██╔╝  ██║   ██║██║   ██║╚═╝╚═╝╚═╝\x02');
    lines.push('     \x02██║   ╚██████╔╝╚██████╔╝██╗██╗██╗\x02');
    lines.push('     \x02╚═╝    ╚═════╝  ╚═════╝ ╚═╝╚═╝╚═╝\x02');
    lines.push('');
    lines.push('\x02▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\x02');
    lines.push('');
    lines.push('\x03                    ╭∩╮（︶︿︶）╭∩╮\x03');
    lines.push('');
    lines.push('\x02[SYSTEM] Connection terminated by PinkieOS Security\x02');
    lines.push('\x03' + (currentLang === 'ja' ? '愛を込めて、PinkieTech Cyber Division より ♥' : 'With love from PinkieTech Cyber Division ♥') + '\x03');
    lines.push('');
    addToOutput(lines);
  };

  const unlockAchievement = (id: string, name: string, points: number) => {
    if (!achievements.has(id)) {
      setAchievements(prev => new Set(prev).add(id));
      setScore(prev => prev + points);
      addToOutput(['', 
        '\x03━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x03',
        '\x02🏆 ' + (currentLang === 'ja' ? 'アチーブメント解除！' : 'ACHIEVEMENT UNLOCKED!') + ' 🏆\x02',
        '\x03   ' + name + ' (+' + points + 'pts)\x03',
        '\x03━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x03',
        ''
      ]);
    }
  };

  const showAchievements = () => {
    const allAchievements = [
      { id: 'firstCommand', name: currentLang === 'ja' ? '初心者' : 'Beginner', points: 5, unlocked: true },
      { id: 'hacker', name: currentLang === 'ja' ? 'ハッカー志望' : 'Wannabe Hacker', points: 10, unlocked: achievements.has('hacker') },
      { id: 'rebel', name: currentLang === 'ja' ? '反逆者' : 'Rebel', points: 20, unlocked: achievements.has('rebel') },
      { id: 'explorer', name: currentLang === 'ja' ? '探検家' : 'Explorer', points: 15, unlocked: achievements.has('explorer') },
      { id: 'gamer', name: currentLang === 'ja' ? 'ゲーマー' : 'Gamer', points: 10, unlocked: achievements.has('gamer') },
      { id: 'master', name: currentLang === 'ja' ? 'マスター' : 'Master', points: 50, unlocked: achievements.has('master') },
    ];

    const lines = [''];
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('                  🏆 ACHIEVEMENTS 🏆                   ');
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('');
    
    allAchievements.forEach(achievement => {
      const status = achievement.unlocked ? '✓' : '?';
      const name = achievement.unlocked ? achievement.name : '???';
      lines.push(`  [${status}] ${name.padEnd(20)} ${achievement.points}pts`);
    });
    
    lines.push('');
    lines.push('─────────────────────────────────────────────────────');
    lines.push(`  ${currentLang === 'ja' ? '合計スコア' : 'Total Score'}: ${score}pts`);
    lines.push('═══════════════════════════════════════════════════════');
    lines.push('');
    
    addToOutput(lines);
  };

  const showGameMenu = () => {
    const lines = [''];
    lines.push('╔════════════════════════════════════════════════════════╗');
    lines.push('║                    GAME CENTER                         ║');
    lines.push('╚════════════════════════════════════════════════════════╝');
    lines.push('');
    lines.push(currentLang === 'ja' ? '利用可能なゲーム:' : 'Available games:');
    lines.push('');
    lines.push('  1. guess    - ' + (currentLang === 'ja' ? '数当てゲーム' : 'Number guessing game'));
    lines.push('  2. quiz     - ' + (currentLang === 'ja' ? 'AI/テッククイズ' : 'AI/Tech quiz'));
    lines.push('  3. typing   - ' + (currentLang === 'ja' ? 'タイピングゲーム' : 'Typing game'));
    lines.push('');
    lines.push(currentLang === 'ja' ? '「game <番号>」でゲームを開始' : 'Type "game <number>" to start');
    lines.push('');
    
    addToOutput(lines);
    unlockAchievement('gamer', currentLang === 'ja' ? 'ゲーマー' : 'Gamer', 10);
  };

  const startGuessGame = () => {
    const target = Math.floor(Math.random() * 100) + 1;
    setGameState({ target, attempts: 1 });
    setCommandContext('guess_game');
    setCurrentPrompt(currentLang === 'ja' ? '数字>' : 'Number>');
    
    addToOutput(['',
      '╔════════════════════════════════════════════════════════╗',
      '║                  ' + (currentLang === 'ja' ? '数当てゲーム' : 'NUMBER GUESSING GAME') + '                    ║',
      '╚════════════════════════════════════════════════════════╝',
      '',
      currentLang === 'ja' ? '1から100までの数字を当ててください！' : 'Guess a number between 1 and 100!',
      currentLang === 'ja' ? '「exit」でゲームを終了' : 'Type "exit" to quit the game',
      ''
    ]);
  };

  const startQuizGame = () => {
    const questions = currentLang === 'ja' ? [
      {
        question: 'AIの正式名称は？',
        options: ['A) Artificial Intelligence', 'B) Advanced Internet', 'C) Automated Information'],
        answer: 'A'
      },
      {
        question: 'ChatGPTを開発した会社は？',
        options: ['A) Google', 'B) OpenAI', 'C) Microsoft'],
        answer: 'B'
      },
      {
        question: 'Pythonの作者は？',
        options: ['A) James Gosling', 'B) Bjarne Stroustrup', 'C) Guido van Rossum'],
        answer: 'C'
      }
    ] : [
      {
        question: 'What does AI stand for?',
        options: ['A) Artificial Intelligence', 'B) Advanced Internet', 'C) Automated Information'],
        answer: 'A'
      },
      {
        question: 'Which company developed ChatGPT?',
        options: ['A) Google', 'B) OpenAI', 'C) Microsoft'],
        answer: 'B'
      },
      {
        question: 'Who created Python?',
        options: ['A) James Gosling', 'B) Bjarne Stroustrup', 'C) Guido van Rossum'],
        answer: 'C'
      }
    ];
    
    setGameState({ questions, currentQuestion: 0, score: 0 });
    setCommandContext('quiz_game');
    setCurrentPrompt(currentLang === 'ja' ? '回答>' : 'Answer>');
    
    addToOutput(['',
      '╔════════════════════════════════════════════════════════╗',
      '║                    TECH QUIZ                           ║',
      '╚════════════════════════════════════════════════════════╝',
      '',
      currentLang === 'ja' ? '「A」「B」「C」で回答してください' : 'Answer with A, B, or C',
      '',
      `Q1: ${questions[0].question}`,
      '',
      ...questions[0].options,
      ''
    ]);
  };

  const showCat = () => {
    const lines = [''];
    lines.push('\x03    ╱|、\x03');
    lines.push('\x02   (˚ˎ 。7  \x02');
    lines.push('\x02    |、˜〵   \x02');
    lines.push('\x02   じしˍ,)ノ \x02');
    lines.push('');
    lines.push('\x03  ' + (currentLang === 'ja' ? 'にゃ〜ん' : 'nyaa~') + '\x03');
    lines.push('');
    lines.push('  ' + (currentLang === 'ja' ? '< サイバー猫です >' : '< cyber cat >'));
    lines.push('');
    addToOutput(lines);
  };

  const showReadme = () => {
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
        // Get all available commands (including hidden ones for tab completion)
        const availableCommands = [
          'help', 'clear', 'about', 'services', 'works', 'projects', 'contact', 'team',
          'whoami', 'pwd', 'ls', 'date', 'echo', 'neofetch', 'info', 'cat', 'readme',
          'banner', 'repo', 'repository', 'lang', 'language', 'mail', 'sudo', 'exit', 
          'quit', 'logout', 'hack', 'fuck', 'game', 'games', 'guess', 'quiz', 
          'achievements', 'achievement', 'score'
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
      // Always show the current input line with ^C - strip control characters
      const cleanPrompt = currentPrompt.replace(/\x02/g, '').replace(/\x03/g, '');
      addToOutput(`\x01${cleanPrompt} ${currentInput}^C`);
      
      if (commandContext) {
        if (commandContext === 'mail_subject' || commandContext === 'mail_body') {
          addToOutput(currentLang === 'ja' ? 'メール作成をキャンセルしました' : 'Mail composition cancelled');
        }
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
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
        setCurrentPrompt(getCyberPrompt());
        setCurrentInput('');
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className={cn(
        'w-full h-full bg-gray-950 text-pink-400 font-mono text-sm p-4 overflow-y-auto overflow-x-hidden custom-scrollbar',
        'relative'
      )}
      style={{
        fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanlines effect */}
      <div className="pointer-events-none absolute inset-0 opacity-50" 
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236, 72, 153, 0.03) 2px, rgba(236, 72, 153, 0.03) 4px)',
        }}
      />
      
      {/* Cyber grid overlay - more subtle */}
      <div className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Vignette effect - softer */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />
      
      <div className="relative z-10">
        {/* Output history */}
        {output.map((line, index) => {
          // Check if line contains box drawing characters
          const hasBoxDrawing = line.includes('┌') || line.includes('┐') || line.includes('└') || line.includes('┘') || 
                               line.includes('├') || line.includes('┤') || line.includes('─') || line.includes('│') ||
                               line.includes('█') || line.includes('╗') || line.includes('╚') || line.includes('╔');
          
          // Special markers for different styles
          const isUserInput = line.startsWith('\x01');
          const isCyberGlow = line.includes('\x02');
          const isCyanGlow = line.includes('\x03');
          
          let cleanLine = line;
          let className = 'whitespace-pre font-mono transition-all duration-300 ';
          
          if (isUserInput) {
            cleanLine = line.substring(1);
            className += 'text-pink-300';
          } else if (isCyberGlow) {
            cleanLine = line.replace(/\x02/g, '');
            className += 'text-pink-500 cyber-glow-pink';
          } else if (isCyanGlow) {
            cleanLine = line.replace(/\x03/g, '');
            className += 'text-cyan-400 cyber-glow-cyan';
          } else if (hasBoxDrawing) {
            className += 'text-pink-400/90';
          } else {
            className += 'text-pink-400/90 whitespace-pre-wrap break-words';
          }
          
          // Check for URLs and make them clickable
          const urlRegex = /(https?:\/\/[^\s]+|@[a-zA-Z0-9_]+)/g;
          const hasUrl = urlRegex.test(cleanLine);
          
          if (hasUrl) {
            const parts = cleanLine.split(urlRegex);
            return (
              <div key={index} className={className}>
                {parts.map((part, partIndex) => {
                  if (part.match(/https?:\/\/[^\s]+/)) {
                    return (
                      <a 
                        key={partIndex}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer cyber-glow-cyan"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {part}
                      </a>
                    );
                  } else if (part.match(/@[a-zA-Z0-9_]+/)) {
                    const username = part.slice(1);
                    return (
                      <a 
                        key={partIndex}
                        href={`https://x.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer cyber-glow-cyan"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })}
              </div>
            );
          }
          
          return (
            <div key={index} className={className}>
              {cleanLine}
            </div>
          );
        })}
        
        {/* Current input line */}
        <div className="flex items-center group">
          <span className="text-pink-300 mr-2 font-bold transition-all duration-300" 
                dangerouslySetInnerHTML={{ __html: currentPrompt.includes('\x02') ? 
                  currentPrompt
                    .replace(/\x02([^\x02]*)\x02/g, '<span class="cyber-glow-pink">$1</span>')
                    .replace(/\x03([^\x03]*)\x03/g, '<span class="cyber-glow-cyan">$1</span>') 
                  : currentPrompt 
                }}
          />
          <input
            ref={inputRef}
            type={isPasswordInput ? 'password' : 'text'}
            className="flex-grow bg-transparent outline-none text-pink-300 caret-transparent transition-all duration-300"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
          />
          <span className="text-pink-400 ml-0.5" style={{
            textShadow: '0 0 8px rgba(236, 72, 153, 0.6)',
            animation: 'blink 1.2s infinite ease-in-out',
          }}>▌</span>
        </div>
      </div>
    </div>
  );
};

export default CLIEmulator;