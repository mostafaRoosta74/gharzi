// @mui
import { enUS, Localization, faIR } from "@mui/material/locale";

// types
import { SettingsValueProps } from "./types/common";

// API
// ----------------------------------------------------------------------

export const KEYCLOAK_SERVICE_API = process.env.REACT_APP_KEYCLOAK_URL || "";
export const KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM || "";
export const KEYCLOAK_CLIENT_ID =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "";
export const HONEST_SERVICE_API = process.env.REACT_APP_BASE_URL || "";
export const NOTIFICATIONS_SERVICE_API =
  process.env.REACT_APP_BASE_NOTIFICATION_SERVICE || "";
export const LOG_SERVICE_API = process.env.REACT_APP_LOGS_BASE_URL || "";
export const COMMIT_ID = process.env.REACT_APP_COMMIT_ID || "";

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: "light",
  themeDirection: "ltr",
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: [enUS],
    icon: "/assets/flags/ic_flag_en.svg",
  },
  {
    label: "Persian",
    value: "fa",
    systemValue: [faIR],
    icon: "/assets/flags/ic_flag_fa.svg",
  },
];

export const defaultLang = allLangs[0]; // English
