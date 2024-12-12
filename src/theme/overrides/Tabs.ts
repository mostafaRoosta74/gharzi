import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Tabs(theme: Theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[200],
          borderRadius: "8px",
        },
        flexContainer: {
          justifyContent: "space-around",
        },
      },
    },
  };
}
