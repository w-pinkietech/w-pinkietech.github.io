import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils'; // Assuming cn is a utility for class names

interface CLIEmulatorProps {
  initialOutput?: string[];
}

const CLIEmulator: React.FC<CLIEmulatorProps> = ({ initialOutput = [] }) => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
    // Scroll to bottom on new output
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let newOutput = [...output, `$ ${command}`];

    if (lowerCommand === 'help') {
      newOutput.push(t('cli.helpMessage'));
      newOutput.push(t('cli.availableCommands'));
      newOutput.push('  home    - ' + t('cli.command.home'));
      newOutput.push('  about   - ' + t('cli.command.about'));
      newOutput.push('  services- ' + t('cli.command.services'));
      newOutput.push('  works   - ' + t('cli.command.works'));
      newOutput.push('  news    - ' + t('cli.command.news'));
      newOutput.push('  careers - ' + t('cli.command.careers'));
      newOutput.push('  contact - ' + t('cli.command.contact'));
      newOutput.push('  blog    - ' + t('cli.command.blog'));
      newOutput.push('  faq     - ' + t('cli.command.faq'));
      newOutput.push('  legal   - ' + t('cli.command.legal'));
      newOutput.push('  clear   - ' + t('cli.command.clear'));
      newOutput.push('  help    - ' + t('cli.command.help'));
    } else if (lowerCommand === 'clear') {
      newOutput = [];
    } else if (lowerCommand === 'home') {
      navigate('/');
      newOutput.push(t('cli.navigatingTo', { page: 'Home' }));
    } else if (lowerCommand === 'about') {
      navigate('/about');
      newOutput.push(t('cli.navigatingTo', { page: 'About' }));
    } else if (lowerCommand === 'services') {
      navigate('/services');
      newOutput.push(t('cli.navigatingTo', { page: 'Services' }));
    } else if (lowerCommand === 'works') {
      navigate('/works');
      newOutput.push(t('cli.navigatingTo', { page: 'Works' }));
    } else if (lowerCommand === 'news') {
      navigate('/news');
      newOutput.push(t('cli.navigatingTo', { page: 'News' }));
    } else if (lowerCommand === 'careers') {
      navigate('/careers');
      newOutput.push(t('cli.navigatingTo', { page: 'Careers' }));
    } else if (lowerCommand === 'contact') {
      navigate('/contact');
      newOutput.push(t('cli.navigatingTo', { page: 'Contact' }));
    } else if (lowerCommand === 'blog') {
      navigate('/blog');
      newOutput.push(t('cli.navigatingTo', { page: 'Blog' }));
    } else if (lowerCommand === 'faq') {
      navigate('/faq');
      newOutput.push(t('cli.navigatingTo', { page: 'FAQ' }));
    } else if (lowerCommand === 'legal') {
      navigate('/legal');
      newOutput.push(t('cli.navigatingTo', { page: 'Legal' }));
    } else {
      newOutput.push(t('cli.commandNotFound', { command: command }));
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
        'w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 overflow-hidden',
        'flex flex-col'
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={outputRef} className="flex-grow overflow-y-auto whitespace-pre-wrap custom-scrollbar">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-grow bg-transparent outline-none text-green-400 caret-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default CLIEmulator;
