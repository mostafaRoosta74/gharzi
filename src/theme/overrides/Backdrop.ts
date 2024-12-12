import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Backdrop(theme: Theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: ["rgba(0,55,154,0.64)"],
          backdropFilter: "blur(15px)",
          "&.MuiBackdrop-invisible": {
            background: "transparent",
            backdropFilter: "none",
          },
        },
      },
    },
  };
}
