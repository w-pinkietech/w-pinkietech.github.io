import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontSizeScale = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'max';

export interface FontSizeSettings {
  scale: FontSizeScale;
  percentage: number;
}

interface FontSizeContextType {
  settings: FontSizeSettings;
  setFontSize: (scale: FontSizeScale) => void;
  getFontSizeClass: () => string;
  getFontSizePixels: (isMobile?: boolean) => string;
  resetToDefault: () => void;
}

const FONT_SIZE_STORAGE_KEY = 'pinkietech-font-settings';

const FONT_SIZE_MAP: Record<FontSizeScale, { percentage: number; class: string; mobile: string; desktop: string }> = {
  xs: { percentage: 75, class: 'text-xs', mobile: '12px', desktop: '10.5px' },
  sm: { percentage: 100, class: 'text-sm', mobile: '16px', desktop: '14px' },
  base: { percentage: 125, class: 'text-base', mobile: '20px', desktop: '17.5px' },
  lg: { percentage: 150, class: 'text-lg', mobile: '24px', desktop: '21px' },
  xl: { percentage: 175, class: 'text-xl', mobile: '28px', desktop: '24.5px' },
  max: { percentage: 200, class: 'text-2xl', mobile: '32px', desktop: '28px' }
};

const getDefaultSettings = (): FontSizeSettings => {
  const isMobile = window.innerWidth < 640;
  const defaultScale = isMobile ? 'sm' : 'xl'; // PC: xl (24.5px), スマホ: sm (16px = normal)
  return {
    scale: defaultScale,
    percentage: FONT_SIZE_MAP[defaultScale].percentage
  };
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<FontSizeSettings>(getDefaultSettings());

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
    return getDefaultSettings();
  };

  const saveSettings = (newSettings: FontSizeSettings) => {
    try {
      localStorage.setItem(FONT_SIZE_STORAGE_KEY, JSON.stringify(newSettings));
      console.log('Font settings saved:', newSettings);
    } catch (error) {
      console.warn('Failed to save font size settings:', error);
    }
  };

  useEffect(() => {
    const loadedSettings = loadSettings();
    console.log('Font settings loaded:', loadedSettings);
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

  const getFontSizeClass = (): string => {
    return FONT_SIZE_MAP[settings.scale].class;
  };

  const getFontSizePixels = (isMobile?: boolean): string => {
    const fontMap = FONT_SIZE_MAP[settings.scale];
    if (isMobile === undefined) {
      isMobile = window.innerWidth < 640;
    }
    return isMobile ? fontMap.mobile : fontMap.desktop;
  };

  const resetToDefault = () => {
    const defaultSettings = getDefaultSettings();
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
  };

  const contextValue: FontSizeContextType = {
    settings,
    setFontSize,
    getFontSizeClass,
    getFontSizePixels,
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