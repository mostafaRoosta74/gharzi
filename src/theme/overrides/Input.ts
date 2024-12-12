import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          paddingTop: "14.5px",
          paddingBottom: "14.5px",
        },
      },
    },
  };
}
