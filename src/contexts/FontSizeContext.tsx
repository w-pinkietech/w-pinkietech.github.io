import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontSizeScale = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'max';

export interface FontSizeSettings {
  scale: FontSizeScale;
  percentage: number;
}

interface FontSizeContextType {
  settings: FontSizeSettings;
  setFontSize: (scale: FontSizeScale) => void;
  getFontSizeClass: (baseSize?: string) => string;
  resetToDefault: () => void;
}

const FONT_SIZE_STORAGE_KEY = 'pinkietech-font-settings';

const FONT_SIZE_MAP: Record<FontSizeScale, { percentage: number; class: string }> = {
  xs: { percentage: 75, class: 'text-xs' },
  sm: { percentage: 100, class: 'text-sm' },
  base: { percentage: 125, class: 'text-base' },
  lg: { percentage: 150, class: 'text-lg' },
  xl: { percentage: 175, class: 'text-xl' },
  max: { percentage: 200, class: 'text-2xl' }
};

const DEFAULT_SETTINGS: FontSizeSettings = {
  scale: 'sm',
  percentage: 100
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<FontSizeSettings>(DEFAULT_SETTINGS);

  const loadSettings = (): FontSizeSettings => {
    try {
      const stored = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.scale && FONT_SIZE_MAP[parsed.scale as FontSizeScale]) {
          return {
            scale: parsed.scale,
            percentage: FONT_SIZE_MAP[parsed.scale as FontSizeScale].percentage
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load font size settings:', error);
    }
    return DEFAULT_SETTINGS;
  };

  const saveSettings = (newSettings: FontSizeSettings) => {
    try {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.warn('Failed to save font size settings:', error);
    }
  };

  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);
  }, []);

  const setFontSize = (scale: FontSizeScale) => {
    const newSettings: FontSizeSettings = {
      scale,
      percentage: FONT_SIZE_MAP[scale].percentage
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const getFontSizeClass = (baseSize?: string): string => {
    if (baseSize) {
      return baseSize;
    }
    return FONT_SIZE_MAP[settings.scale].class;
  };

  const resetToDefault = () => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  };

  const contextValue: FontSizeContextType = {
    settings,
    setFontSize,
    getFontSizeClass,
    resetToDefault
  };

  return (
    <FontSizeContext.Provider value={contextValue}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export { FONT_SIZE_MAP };