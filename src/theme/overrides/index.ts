import { Theme } from "@mui/material/styles";
//

import Tabs from "./Tabs";
import Button from "./Button";
import Backdrop from "./Backdrop";
import Alert from "./Alert";
import Input from "./Input";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Tabs(theme),
    Button(theme),
    Backdrop(theme),
    Alert(theme),
    Input(theme)
  ) as any;
}
