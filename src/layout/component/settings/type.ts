import { Localization } from "@mui/material/locale";
// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";
export type ThemeContrast = "default" | "bold";
export type ThemeLayout = "vertical" | "horizontal";
export type ThemeColorPresets =
  | "default"
  | "purple"
  | "cyan"
  | "blue"
  | "orange"
  | "red";
export type ThemeStretch = boolean;

export type Lang = {
  label: string;
  value: string;
  systemValue: Localization[];
  icon: string;
};

export type SettingsValueProps = {
  defaultLang: Lang;
  allLangs: Lang[];
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: ThemeStretch;
  themeContrast: ThemeContrast;
  themeDirection: ThemeDirection;
  themeColorPresets: ThemeColorPresets;
};

export type SettingsContextProps = SettingsValueProps & {
  setColor: ColorVariants;
  colorOption: {
    name: string;
    value: string;
  }[];

  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Layout
  onToggleLayout: VoidFunction;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Color
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Stretch
  onToggleStretch: VoidFunction;

  // Reset
  onResetSetting: VoidFunction;
};
