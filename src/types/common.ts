export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";

export type SettingsValueProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;
};

export type SettingsContextProps = {
  themeMode: ThemeMode;
  themeDirection: ThemeDirection;

  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Direction
  onToggleDirection: VoidFunction;
  onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDirectionByLang: (lang: string) => void;

  // Reset
  onResetSetting: VoidFunction;
};

export type NestedRouteObject = {
  [key: string]: any | NestedRouteObject;
};

export type ObjectType = {
  [key: string]: any;
};

export type PrepareDataForAutoCompleteProps = {
  array: ObjectType[];
  keyProp: Function | string;
  valueProp: Function | string;
  otherPropsFn?: Function;
};

export type Token = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
};
