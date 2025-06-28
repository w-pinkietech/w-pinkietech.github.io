import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface CLIEmulatorProps {
  initialOutput?: string[];
}

const CLIEmulator: React.FC<CLIEmulatorProps> = ({ initialOutput = [] }) => {
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

  // Generate boot sequence based on current language and screen size
  const generateBootSequence = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    
    if (currentLang === 'ja') {
      return [
        isMobile ? '\x03[BOOT] PinkieOS v0.0.1\x03' : '\x03[BOOT] PinkieOS ver.0.0.1 - Manufacturing × OSS × AI\x03',
        isMobile ? '\x02[INIT] Monozukuri... [OK]\x02' : '\x02[INIT] Japanese Monozukuri Spirit... [OK]\x02',
        isMobile ? '\x02[INIT] Open Source... [OK]\x02' : '\x02[INIT] Open Source Philosophy... [OK]\x02',
        isMobile ? '\x02[INIT] AI Engine... [OK]\x02' : '\x02[INIT] AI Innovation Engine... [OK]\x02',
        isMobile ? '\x03[VISION] OSS × AI for Manufacturing\x03' : '\x03[VISION] Bringing OSS and AI power to Japanese manufacturing\x03',
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
    } else {
      return [
        isMobile ? '\x03[BOOT] PinkieOS v0.0.1\x03' : '\x03[BOOT] PinkieOS ver.0.0.1 - Manufacturing × OSS × AI\x03',
        isMobile ? '\x02[INIT] Monozukuri... [OK]\x02' : '\x02[INIT] Japanese Monozukuri Spirit... [OK]\x02',
        isMobile ? '\x02[INIT] Open Source... [OK]\x02' : '\x02[INIT] Open Source Philosophy... [OK]\x02',
        isMobile ? '\x02[INIT] AI Engine... [OK]\x02' : '\x02[INIT] AI Innovation Engine... [OK]\x02',
        isMobile ? '\x03[VISION] OSS × AI for\x03' : '\x03[VISION] Bringing OSS and AI power to Japanese manufacturing\x03',
        ...(isMobile ? ['\x03Manufacturing\x03'] : []),
        isMobile ? '\x03[MISSION] Tech innovation\x03' : '\x03[MISSION] Driving technical innovation in manufacturing industry\x03',
        ...(isMobile ? ['\x03in manufacturing\x03'] : []),
        isMobile ? '\x03[VALUES] Quality • OSS • AI\x03' : '\x03[VALUES] Quality craftsmanship • Open Source • AI democratization\x03',
        isMobile ? '\x02[GOAL] Traditional ×\x02' : '\x02[GOAL] Fusion of traditional craftsmanship with digital technology\x02',
        ...(isMobile ? ['\x02Digital fusion\x02'] : []),
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
        'Last login: ' + new Date().toLocaleString('en-US'),
        '',
        isMobile ? '「help」でコマンド一覧' : '「neofetch」でシステム情報を表示 / Run \'neofetch\' for system info',
        isMobile ? '「lang」で言語切替' : '「help」で利用可能なコマンドを表示 / Type \'help\' for commands',
        ...(isMobile ? [] : ['「lang」で言語切替 / Type \'lang\' to change language']),
        '',
      ];
    }
  }, [currentLang]);

  const [output, setOutput] = useState<string[]>(() => {
    return initialOutput.length > 0 ? initialOutput : generateBootSequence();
  });

  // Handle window resize to regenerate boot sequence for responsive display
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      // Debounce resize events
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Only regenerate if we're still showing the initial boot sequence
        if (initialOutput.length === 0 && output.length <= 20) {
          setOutput(generateBootSequence());
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [generateBootSequence, output.length, initialOutput.length]);

  // Enhanced scroll to bottom with proper timing for mobile
  const scrollToBottom = useCallback((immediate = false) => {
    if (terminalRef.current) {
      const element = terminalRef.current;
      element.scrollTop = element.scrollHeight;
      console.log('Scrolled to bottom:', element.scrollTop, element.scrollHeight);
    }
  }, []);

  // Focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Force immediate scroll on every output change
    setTimeout(() => {
      scrollToBottom(true);
    }, 50);
  }, [output, scrollToBottom]);

  // Update boot sequence when language changes
  useEffect(() => {
    if (initialOutput.length === 0) {
      setOutput(generateBootSequence());
    }
  }, [currentLang, generateBootSequence, initialOutput.length]);


  const addToOutput = useCallback((lines: string | string[]) => {
    const newLines = Array.isArray(lines) ? lines : [lines];
    setOutput(prev => [...prev, ...newLines]);
    
    // Force scroll immediately after state update
    setTimeout(() => {
      scrollToBottom(true);
    }, 10);
  }, [scrollToBottom]);

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
    } else if (lowerCommand === 'legal') {
      showLegal();
    } else if (lowerCommand === 'sudo' || lowerCommand.startsWith('sudo ')) {
      addToOutput('[sudo] ' + (currentLang === 'ja' ? 'guestのパスワード: ' : 'password for guest: '));
      setCommandContext('sudo_password');
      setIsPasswordInput(true);
      setCurrentPrompt('[sudo] password');
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
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (isMobile) {
      lines.push('\x03=====[ コマンド一覧 ]=====\x03');
      lines.push('');
      lines.push('\x02【基本】\x02');
      lines.push('about    - 会社概要');
      lines.push('services - サービス');
      lines.push('works    - 実績');
      lines.push('contact  - 連絡先');
      lines.push('legal    - 法的情報');
      lines.push('');
      lines.push('\x02【その他】\x02');
      lines.push('clear  - 画面クリア');
      lines.push('lang   - 言語切替');
      lines.push('cat    - 猫表示');
      lines.push('repo   - GitHub');
    } else {
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
        { cmd: 'legal', desc: currentLang === 'ja' ? '法的情報' : 'Legal information' },
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
        { cmd: 'exit', desc: currentLang === 'ja' ? '終了' : 'Exit' },
      ];
      
      sysCommands.forEach(({ cmd, desc }) => {
        lines.push(`  ${cmd.padEnd(11)} - ${desc}`);
      });
      
      lines.push('');
      lines.push('\x03──────────────────────────────────────────────────────────\x03');
    }
    lines.push('');
    
    addToOutput(lines);
  };

  const showAbout = () => {
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (currentLang === 'ja') {
      if (isMobile) {
        lines.push('=====[ 会社概要 ]=====');
        lines.push('');
        lines.push('会社名: PinkieTech株式会社');
        lines.push('設立: 2025/01/17');
        lines.push('代表: 渡部健太');
        lines.push('資本金: 500万円');
        lines.push('');
        lines.push('【ミッション】');
        lines.push('モノづくり × OSS × AI');
        lines.push('中小製造業の新たな可能性を開拓');
      } else {
        lines.push('==================[ PinkieTechについて ]==================');
        lines.push('');
        lines.push('【基本情報】');
        lines.push('会社名: PinkieTech株式会社');
        lines.push('設立日: 2025年01月17日');
        lines.push('代表者: 渡部健太');
        lines.push('資本金: 5,000,000円');
        lines.push('');
        lines.push('【ミッション】');
        lines.push('モノづくり × OSS × AIの融合に取り組み、');
        lines.push('日本の中小製造業に新たな可能性を開拓することを目指しています。');
      }
    } else {
      if (isMobile) {
        lines.push('=====[ ABOUT ]=====');
        lines.push('');
        lines.push('Company: PinkieTech Co., Ltd.');
        lines.push('Founded: Jan 17, 2025');
        lines.push('CEO: Kenta Watanabe');
        lines.push('Capital: 5M JPY');
        lines.push('');
        lines.push('【Mission】');
        lines.push('Manufacturing × OSS × AI');
        lines.push('New possibilities for SME');
      } else {
        lines.push('==================[ ABOUT PINKIETECH ]==================');
        lines.push('');
        lines.push('【Company Information】');
        lines.push('Company: PinkieTech Co., Ltd.');
        lines.push('Founded: January 17, 2025');
        lines.push('CEO: Kenta Watanabe');
        lines.push('Capital: 5,000,000 JPY');
        lines.push('');
        lines.push('【Mission】');
        lines.push('We focus on Manufacturing × OSS × AI fusion to open new');
        lines.push('possibilities for Japanese small and medium manufacturers.');
      }
    }
    lines.push('');
    addToOutput(lines);
  };

  const showServices = () => {
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (currentLang === 'ja') {
      if (isMobile) {
        lines.push('=====[ サービス ]=====');
        lines.push('');
        lines.push('[1] 製造業DX支援');
        lines.push('• 工場見える化');
        lines.push('• GitHub導入支援');
        lines.push('• データ標準化');
        lines.push('');
        lines.push('[2] IoT導入支援');
        lines.push('• センサーデータ収集');
        lines.push('• 監視ダッシュボード');
        lines.push('• データ見える化');
        lines.push('');
        lines.push('[3] OSS開発');
        lines.push('• 製造業向けツール開発');
        lines.push('• OSSカスタマイズ');
        lines.push('');
        lines.push('[4] 技術研修');
        lines.push('• OSS活用研修');
        lines.push('• AI技術研修');
        lines.push('• IoT研修');
      } else {
        lines.push('==================[ サービス一覧 ]==================');
        lines.push('');
        lines.push('[1] 製造業DX支援');
        lines.push('    └─ OSS活用による工場見える化');
        lines.push('    └─ GitHubベースの開発プロセス導入');
        lines.push('    └─ 製造データのデジタル化・標準化');
        lines.push('');
        lines.push('[2] IoT導入支援');
        lines.push('    └─ センサーデータ収集・可視化システム');
        lines.push('    └─ リアルタイム監視ダッシュボード構築');
        lines.push('    └─ 製造業以外でもデータ見える化をお手伝い');
        lines.push('');
        lines.push('[3] OSS開発');
        lines.push('    └─ 製造業向けOSSツール開発');
        lines.push('    └─ 既存OSSのカスタマイズ・改良');
        lines.push('    └─ オープンソースプロジェクトへの貢献');
        lines.push('');
        lines.push('[4] 技術研修・教育');
        lines.push('    └─ OSS活用研修（GitHub、現代的な開発手法）');
        lines.push('    └─ AI技術基礎研修');
        lines.push('    └─ IoTシステム構築研修');
        lines.push('    └─ 最新IT技術・ツール活用研修');
        lines.push('');
        lines.push('[5] OSSコミュニティ構築');
        lines.push('    └─ 技術勉強会・ワークショップ開催');
        lines.push('    └─ 製造業×OSS知識共有');
      }
    } else {
      if (isMobile) {
        lines.push('=====[ SERVICES ]=====');
        lines.push('');
        lines.push('[1] Manufacturing DX');
        lines.push('• Factory visualization');
        lines.push('• GitHub adoption');
        lines.push('• Data standardization');
        lines.push('');
        lines.push('[2] IoT Implementation');
        lines.push('• Sensor data collection');
        lines.push('• Monitoring dashboard');
        lines.push('• Data visualization');
        lines.push('');
        lines.push('[3] OSS Development');
        lines.push('• Manufacturing tools');
        lines.push('• OSS customization');
        lines.push('');
        lines.push('[4] Technical Training');
        lines.push('• OSS training');
        lines.push('• AI training');
        lines.push('• IoT training');
      } else {
        lines.push('==================[ OUR SERVICES ]==================');
        lines.push('');
        lines.push('[1] Manufacturing DX Support');
        lines.push('    └─ Factory visualization using OSS');
        lines.push('    └─ GitHub-based development process adoption');
        lines.push('    └─ Manufacturing data digitization & standardization');
        lines.push('');
        lines.push('[2] IoT Implementation Support');
        lines.push('    └─ Sensor data collection & visualization systems');
        lines.push('    └─ Real-time monitoring dashboard development');
        lines.push('    └─ Data visualization support beyond manufacturing');
        lines.push('');
        lines.push('[3] OSS Development');
        lines.push('    └─ Manufacturing-focused OSS tool development');
        lines.push('    └─ Customization & improvement of existing OSS');
        lines.push('    └─ Contribution to open source projects');
        lines.push('');
        lines.push('[4] Technical Training & Education');
        lines.push('    └─ OSS utilization training (GitHub, modern dev practices)');
        lines.push('    └─ AI technology fundamentals training');
        lines.push('    └─ IoT system development training');
        lines.push('    └─ Latest IT technology & tool utilization training');
        lines.push('');
        lines.push('[5] OSS Community Building');
        lines.push('    └─ Technical study sessions & workshops');
        lines.push('    └─ Manufacturing × OSS knowledge sharing');
      }
    }
    lines.push('');
    addToOutput(lines);
  };

  const showWorks = () => {
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (currentLang === 'ja') {
      if (isMobile) {
        lines.push('=====[ 実績 ]=====');
        lines.push('');
        lines.push('[1] OSS活動・公開');
        lines.push('状況: 進行中');
        lines.push('内容: GitHub公開');
        lines.push('');
        lines.push('[2] 北九州OSS参加');
        lines.push('状況: 完了');
        lines.push('内容: 工場見える化学習');
        lines.push('');
        lines.push('[3] DXソリューション開発');
        lines.push('状況: 計画中');
        lines.push('内容: データ可視化');
        lines.push('');
        lines.push('[4] 技術研修開発');
        lines.push('状況: 準備中');
        lines.push('内容: OSS・AI・IoT研修');
      } else {
        lines.push('==================[ 活動実績・取組み ]==================');
        lines.push('');
        lines.push('PROJECT_001: OSS活動・公開');
        lines.push('├─ ステータス: 進行中');
        lines.push('├─ 内容: GitHub上でのOSSプロジェクト公開');
        lines.push('└─ 成果: ドキュメント整備、コミュニティ貢献');
        lines.push('');
        lines.push('PROJECT_002: 北九州OSS工場見える化参加');
        lines.push('├─ ステータス: 完了');
        lines.push('├─ 内容: 地域OSS活動への参加・学習');
        lines.push('└─ 成果: 製造業の現状把握、課題発見');
        lines.push('');
        lines.push('PROJECT_003: 製造業向けDXソリューション開発');
        lines.push('├─ ステータス: 計画中');
        lines.push('├─ 内容: OSS活用による工場データ可視化');
        lines.push('└─ 目標: 中小製造業の情報格差解消');
        lines.push('');
        lines.push('PROJECT_004: 技術研修プログラム開発');
        lines.push('├─ ステータス: 準備中');
        lines.push('├─ 内容: OSS・AI・IoT技術研修カリキュラム作成');
        lines.push('└─ 目標: 製造業従事者のスキルアップ支援');
      }
    } else {
      if (isMobile) {
        lines.push('=====[ WORKS ]=====');
        lines.push('');
        lines.push('[1] OSS Activities');
        lines.push('Status: IN_PROGRESS');
        lines.push('Content: GitHub publication');
        lines.push('');
        lines.push('[2] Kitakyushu OSS');
        lines.push('Status: COMPLETED');
        lines.push('Content: Factory visualization');
        lines.push('');
        lines.push('[3] DX Solution Dev');
        lines.push('Status: PLANNING');
        lines.push('Content: Data visualization');
        lines.push('');
        lines.push('[4] Training Program');
        lines.push('Status: PREPARING');
        lines.push('Content: OSS/AI/IoT training');
      } else {
        lines.push('==================[ ACTIVITIES & PROJECTS ]==================');
        lines.push('');
        lines.push('PROJECT_001: OSS Activities & Publication');
        lines.push('├─ Status: IN_PROGRESS');
        lines.push('├─ Content: OSS project publication on GitHub');
        lines.push('└─ Result: Documentation improvement, community contribution');
        lines.push('');
        lines.push('PROJECT_002: Kitakyushu OSS Factory Visualization Participation');
        lines.push('├─ Status: COMPLETED');
        lines.push('├─ Content: Participation & learning in local OSS activities');
        lines.push('└─ Result: Understanding manufacturing industry, issue identification');
        lines.push('');
        lines.push('PROJECT_003: Manufacturing DX Solution Development');
        lines.push('├─ Status: PLANNING');
        lines.push('├─ Content: Factory data visualization using OSS');
        lines.push('└─ Goal: Bridging information gap for SME manufacturers');
        lines.push('');
        lines.push('PROJECT_004: Technical Training Program Development');
        lines.push('├─ Status: PREPARING');
        lines.push('├─ Content: OSS/AI/IoT technology training curriculum');
        lines.push('└─ Goal: Skill enhancement support for manufacturing workers');
      }
    }
    lines.push('');
    addToOutput(lines);
  };

  const showContact = () => {
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (currentLang === 'ja') {
      if (isMobile) {
        lines.push('=====[ 連絡先 ]=====');
        lines.push('');
        lines.push('X: @pinkietech');
        lines.push('GitHub: w-pinkietech');
        lines.push('');
        lines.push('所在地: 福岡県北九州市');
        lines.push('八幡西区塔野1-14-22');
        lines.push('(https://www.google.com/maps/place/1-ch%C5%8Dme-14-22+T%C5%8Dno,+Yahatanishi+Ward,+Kitakyushu,+Fukuoka+807-0085,+Japan/@33.824228,130.737943,16z/|GoogleMap)');
        lines.push('');
        lines.push('※ お気軽にDMを');
      } else {
        lines.push('==================[ お問い合わせ ]==================');
        lines.push('');
        lines.push('お問い合わせ方法:');
        lines.push('X (Twitter) のダイレクトメッセージでお願いします');
        lines.push('');
        lines.push('X (Twitter): @pinkietech');
        lines.push('GitHub:      https://github.com/w-pinkietech');
        lines.push('');
        lines.push('所在地: 〒806-0047 福岡県北九州市八幡西区塔野１丁目１４‐２２ (https://www.google.com/maps/place/1-ch%C5%8Dme-14-22+T%C5%8Dno,+Yahatanishi+Ward,+Kitakyushu,+Fukuoka+807-0085,+Japan/@33.824228,130.737943,16z/|GoogleMap)');
        lines.push('');
        lines.push('※ お気軽にDMでお声がけください');
      }
    } else {
      if (isMobile) {
        lines.push('=====[ CONTACT ]=====');
        lines.push('');
        lines.push('X: @pinkietech');
        lines.push('GitHub: w-pinkietech');
        lines.push('');
        lines.push('Location: Kitakyushu, Japan');
        lines.push('1-14-22 Tono, Yahatanishi');
        lines.push('(https://www.google.com/maps/place/1-ch%C5%8Dme-14-22+T%C5%8Dno,+Yahatanishi+Ward,+Kitakyushu,+Fukuoka+807-0085,+Japan/@33.824228,130.737943,16z/|GoogleMap)');
        lines.push('');
        lines.push('※ Feel free to DM');
      } else {
        lines.push('==================[ CONTACT INFORMATION ]==================');
        lines.push('');
        lines.push('Contact Method:');
        lines.push('Please send a direct message on X (Twitter)');
        lines.push('');
        lines.push('X (Twitter): @pinkietech');
        lines.push('GitHub:      https://github.com/w-pinkietech');
        lines.push('');
        lines.push('Location: 1-14-22 Tono, Yahatanishi-ku, Kitakyushu-shi, Fukuoka 806-0047, Japan (https://www.google.com/maps/place/1-ch%C5%8Dme-14-22+T%C5%8Dno,+Yahatanishi+Ward,+Kitakyushu,+Fukuoka+807-0085,+Japan/@33.824228,130.737943,16z/|GoogleMap)');
        lines.push('');
        lines.push('※ Feel free to reach out via DM');
      }
    }
    lines.push('');
    addToOutput(lines);
  };

  const showLegal = () => {
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (currentLang === 'ja') {
      if (isMobile) {
        lines.push('=====[ 法的情報 ]=====');
        lines.push('');
        lines.push('【プライバシーポリシー】');
        lines.push('• 個人情報は適切に管理');
        lines.push('• 第三者提供は行いません');
        lines.push('• お問い合わせ対応のみ使用');
        lines.push('');
        lines.push('【利用規約】');
        lines.push('• サービスは現状有姿で提供');
        lines.push('• 法令違反行為は禁止');
        lines.push('• 損害の責任は負いません');
        lines.push('');
        lines.push('【特定商取引法】');
        lines.push('事業者: PinkieTech株式会社');
        lines.push('代表者: 渡部健太');
        lines.push('所在地: 福岡県北九州市');
        lines.push('連絡先: @pinkietech');
      } else {
        lines.push('==================[ 法的情報 ]==================');
        lines.push('');
        lines.push('【プライバシーポリシー】');
        lines.push('');
        lines.push('1. 個人情報の取得について');
        lines.push('   当社では、お客様からお問い合わせをいただく際に、');
        lines.push('   お名前、連絡先等の個人情報を取得いたします。');
        lines.push('');
        lines.push('2. 個人情報の利用目的');
        lines.push('   ・お客様からのお問い合わせへの対応');
        lines.push('   ・サービス提供に関する連絡');
        lines.push('   ・その他、お客様との円滑なコミュニケーション');
        lines.push('');
        lines.push('3. 個人情報の第三者提供');
        lines.push('   法令に基づく場合を除き、ご本人の同意なく');
        lines.push('   第三者に個人情報を提供することはありません。');
        lines.push('');
        lines.push('4. 個人情報の管理');
        lines.push('   適切な安全管理措置を講じ、個人情報の漏洩、');
        lines.push('   滅失又は毀損の防止に努めます。');
        lines.push('');
        lines.push('【利用規約】');
        lines.push('');
        lines.push('1. 本規約について');
        lines.push('   本規約は、PinkieTech株式会社が提供するサービスの');
        lines.push('   利用条件を定めるものです。');
        lines.push('');
        lines.push('2. サービスの利用');
        lines.push('   ・サービスは現状有姿で提供されます');
        lines.push('   ・法令に違反する行為は禁止します');
        lines.push('   ・当社の業務に支障をきたす行為は禁止します');
        lines.push('');
        lines.push('3. 免責事項');
        lines.push('   当社は、サービスの利用によって生じた');
        lines.push('   いかなる損害についても責任を負いません。');
        lines.push('');
        lines.push('【特定商取引法に基づく表記】');
        lines.push('');
        lines.push('事業者名: PinkieTech株式会社');
        lines.push('代表者:   渡部健太');
        lines.push('所在地:   〒806-0047 福岡県北九州市八幡西区塔野１丁目１４‐２２');
        lines.push('連絡先:   X(Twitter) @pinkietech のDMにてお問い合わせください');
        lines.push('事業内容: 製造業DX支援、IoT導入支援、OSS開発、技術研修・教育');
      }
    } else {
      if (isMobile) {
        lines.push('=====[ LEGAL INFO ]=====');
        lines.push('');
        lines.push('【Privacy Policy】');
        lines.push('• Personal info properly managed');
        lines.push('• No third-party disclosure');
        lines.push('• Used for inquiries only');
        lines.push('');
        lines.push('【Terms of Service】');
        lines.push('• Services provided as-is');
        lines.push('• Illegal activities prohibited');
        lines.push('• No liability for damages');
        lines.push('');
        lines.push('【Commercial Transaction】');
        lines.push('Business: PinkieTech Co., Ltd.');
        lines.push('CEO: Kenta Watanabe');
        lines.push('Location: Kitakyushu, Fukuoka');
        lines.push('Contact: @pinkietech');
      } else {
        lines.push('==================[ LEGAL INFORMATION ]==================');
        lines.push('');
        lines.push('【Privacy Policy】');
        lines.push('');
        lines.push('1. Collection of Personal Information');
        lines.push('   We collect personal information such as your name and');
        lines.push('   contact details when you make inquiries.');
        lines.push('');
        lines.push('2. Purpose of Use');
        lines.push('   ・Responding to customer inquiries');
        lines.push('   ・Service-related communications');
        lines.push('   ・Other smooth communication with customers');
        lines.push('');
        lines.push('3. Third Party Disclosure');
        lines.push('   We do not provide personal information to third parties');
        lines.push('   without consent, except as required by law.');
        lines.push('');
        lines.push('4. Information Management');
        lines.push('   We implement appropriate security measures to prevent');
        lines.push('   leakage, loss, or damage of personal information.');
        lines.push('');
        lines.push('【Terms of Service】');
        lines.push('');
        lines.push('1. About These Terms');
        lines.push('   These terms define the conditions for using services');
        lines.push('   provided by PinkieTech Co., Ltd.');
        lines.push('');
        lines.push('2. Service Usage');
        lines.push('   ・Services are provided as-is');
        lines.push('   ・Activities violating laws are prohibited');
        lines.push('   ・Activities disrupting our business are prohibited');
        lines.push('');
        lines.push('3. Disclaimer');
        lines.push('   We are not liable for any damages arising from');
        lines.push('   the use of our services.');
        lines.push('');
        lines.push('【Commercial Transaction Act Notice】');
        lines.push('');
        lines.push('Business Name: PinkieTech Co., Ltd.');
        lines.push('Representative: Kenta Watanabe');
        lines.push('Address: 1-14-22 Tono, Yahatanishi-ku, Kitakyushu-shi, Fukuoka 806-0047, Japan');
        lines.push('Contact: Please contact via DM on X(Twitter) @pinkietech');
        lines.push('Business: Manufacturing DX support, IoT implementation, OSS development, Technical training');
      }
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
    const isMobile = window.innerWidth < 640;
    const lines = [''];
    
    if (isMobile) {
      lines.push('=====[ SYSTEM INFO ]=====');
      lines.push('');
      lines.push('\x02guest@pinkietech\x02');
      lines.push('----------------');
      lines.push('OS: PinkieOS 2077');
      lines.push('Kernel: 6.1.0-cyber');
      lines.push('Shell: neuroshell v2');
      lines.push('Terminal: CyberTerm');
      lines.push('CPU: Neural Core X');
      lines.push('GPU: RTX 9090 Ti');
      lines.push('RAM: 256GB DDR7');
      lines.push('Uptime: ∞');
      lines.push('');
      lines.push('\x03▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\x03');
      lines.push('\x03██████████████████████\x03');
      lines.push('\x03██░░██ PINKIE ██░░██\x03');
      lines.push('\x03██████████████████████\x03');
      lines.push('\x03▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀\x03');
    } else {
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
    }
    lines.push('');
    addToOutput(lines);
  };

  const showAvailableCommands = () => {
    const commands = [
      'about', 'achievements', 'banner', 'cat', 'clear', 'contact', 
      'date', 'echo', 'exit', 'game', 'help', 'lang', 'legal', 
      'logout', 'ls', 'neofetch', 'pwd', 'quit', 
      'readme', 'repo', 'score', 'services', 'whoami', 'works'
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
      lines.push('# PinkieTech株式会社');
      lines.push('## モノづくり × OSS × AI');
      lines.push('');
      lines.push('## 会社概要');
      lines.push('PinkieTech株式会社は、日本の製造業にOSSとAIの力を');
      lines.push('融合させることで、新たな可能性を開拓する企業です。');
      lines.push('');
      lines.push('設立: 2025年01月17日');
      lines.push('代表: 渡部健太');
      lines.push('');
      lines.push('## 主要サービス');
      lines.push('- **製造業DX支援**: OSS活用による工場見える化');
      lines.push('- **IoT導入支援**: センサーデータ収集・可視化システム');
      lines.push('- **OSS開発**: 製造業向けOSSツール開発');
      lines.push('- **技術研修**: OSS・AI・IoT技術教育');
      lines.push('');
      lines.push('## ミッション');
      lines.push('日本の中小製造業が直面する情報格差を解消し、');
      lines.push('ソフトウェアの力で新たな付加価値を創造する。');
      lines.push('');
      lines.push('## お問い合わせ');
      lines.push('X(Twitter): @pinkietech');
      lines.push('GitHub: https://github.com/w-pinkietech');
    } else {
      lines.push('# PinkieTech Co., Ltd.');
      lines.push('## Manufacturing × OSS × AI');
      lines.push('');
      lines.push('## About Us');
      lines.push('PinkieTech Co., Ltd. opens new possibilities for Japanese');
      lines.push('manufacturing by fusing OSS and AI technologies.');
      lines.push('');
      lines.push('Founded: January 17, 2025');
      lines.push('CEO: Kenta Watanabe');
      lines.push('');
      lines.push('## Key Services');
      lines.push('- **Manufacturing DX**: Factory visualization using OSS');
      lines.push('- **IoT Implementation**: Sensor data collection & visualization');
      lines.push('- **OSS Development**: Manufacturing-focused OSS tools');
      lines.push('- **Technical Training**: OSS/AI/IoT technology education');
      lines.push('');
      lines.push('## Mission');
      lines.push('Bridge the information gap facing Japanese SME manufacturers');
      lines.push('and create new added value through software innovation.');
      lines.push('');
      lines.push('## Contact');
      lines.push('X(Twitter): @pinkietech');
      lines.push('GitHub: https://github.com/w-pinkietech');
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
          'help', 'clear', 'about', 'services', 'works', 'projects', 'contact', 'legal',
          'whoami', 'pwd', 'ls', 'date', 'echo', 'neofetch', 'info', 'cat', 'readme',
          'banner', 'repo', 'repository', 'lang', 'language', 'sudo', 'exit', 
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
          const cleanPrompt = currentPrompt.replace(/\x02/g, '').replace(/\x03/g, '');
          addToOutput(`\x01${cleanPrompt} ${currentInput}`);
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
        setCommandContext('');
        setCurrentPrompt(getCyberPrompt());
        setIsPasswordInput(false);
      }
      
      // Clear current input
      setCurrentInput('');
    } else if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={terminalRef}
      className={cn(
        'w-full bg-gray-950 text-pink-400 font-mono p-2 sm:p-4 overflow-y-auto overflow-x-hidden custom-scrollbar',
        'relative break-words whitespace-pre-wrap',
        'min-h-screen h-screen scroll-smooth', // Fix height conflicts
        window.innerWidth < 640 ? 'text-xs' : 'text-sm' // Dynamic responsive text size
      )}
      style={{
        scrollbarGutter: 'stable both-edges',
        WebkitOverflowScrolling: 'touch', // Better mobile scrolling
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
            className += 'text-pink-400/90 whitespace-nowrap overflow-x-auto';
          } else {
            className += 'text-pink-400/90 whitespace-pre-wrap break-words';
          }
          
          // Check for URLs and make them clickable (exclude user input lines and email-like patterns)
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const customLinkRegex = /\((https?:\/\/[^|)]+)\|([^)]+)\)/g;
          const twitterRegex = /(?:^|\s)(@[a-zA-Z0-9_]+)(?=\s|$)/g;
          const hasUrl = urlRegex.test(cleanLine);
          const hasCustomLink = customLinkRegex.test(cleanLine);
          const hasTwitter = !isUserInput && !cleanLine.includes('guest@') && twitterRegex.test(cleanLine);
          
          if (hasUrl || hasCustomLink || hasTwitter) {
            let processedLine = cleanLine;
            const elements = [];
            let lastIndex = 0;
            
            // Process custom links first (URL|DisplayText)
            let customLinkMatch;
            customLinkRegex.lastIndex = 0;
            while ((customLinkMatch = customLinkRegex.exec(cleanLine)) !== null) {
              if (customLinkMatch.index > lastIndex) {
                elements.push(processedLine.slice(lastIndex, customLinkMatch.index));
              }
              elements.push(
                <a 
                  key={`custom-${customLinkMatch.index}`}
                  href={customLinkMatch[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer cyber-glow-cyan"
                  onClick={(e) => e.stopPropagation()}
                >
                  {customLinkMatch[2]}
                </a>
              );
              lastIndex = customLinkMatch.index + customLinkMatch[0].length;
            }
            
            // Process regular URLs (only if no custom links were processed)
            if (!hasCustomLink) {
              let urlMatch;
              urlRegex.lastIndex = 0;
              while ((urlMatch = urlRegex.exec(cleanLine)) !== null) {
                if (urlMatch.index > lastIndex) {
                  elements.push(processedLine.slice(lastIndex, urlMatch.index));
                }
                elements.push(
                  <a 
                    key={`url-${urlMatch.index}`}
                    href={urlMatch[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer cyber-glow-cyan"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {urlMatch[0]}
                  </a>
                );
                lastIndex = urlMatch.index + urlMatch[0].length;
              }
            }
            
            // Process Twitter handles (only if not in user input and not guest@)
            if (hasTwitter) {
              let twitterMatch;
              twitterRegex.lastIndex = 0;
              while ((twitterMatch = twitterRegex.exec(cleanLine)) !== null) {
                const username = twitterMatch[1].slice(1);
                if (twitterMatch.index > lastIndex) {
                  elements.push(processedLine.slice(lastIndex, twitterMatch.index));
                }
                elements.push(
                  <a 
                    key={`twitter-${twitterMatch.index}`}
                    href={`https://x.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer cyber-glow-cyan"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {twitterMatch[1]}
                  </a>
                );
                lastIndex = twitterMatch.index + twitterMatch[0].length;
              }
            }
            
            if (lastIndex < cleanLine.length) {
              elements.push(processedLine.slice(lastIndex));
            }
            
            return (
              <div key={index} className={cn(className, 'break-words whitespace-pre-wrap overflow-wrap-anywhere')}>
                {elements}
              </div>
            );
          }
          
          return (
            <div key={index} className={cn(className, 'break-words whitespace-pre-wrap overflow-wrap-anywhere')}>
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
            onFocus={() => {
              // Auto-scroll when input gets focus (especially on mobile with virtual keyboard)
              setTimeout(() => {
                scrollToBottom();
              }, 300); // Delay to account for virtual keyboard animation
            }}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            inputMode="text"
            style={{ 
              fontSize: window.innerWidth < 640 ? '16px' : '14px' // Responsive font size, prevent iOS zoom on mobile
            }}
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