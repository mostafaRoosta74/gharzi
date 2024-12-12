//
import ThemeRtlLayout from "./ThemeRtlLayout";
import ThemeLocalization from "./ThemeLocalization";
import {ReactNode} from "react";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeLocalization>
      <ThemeRtlLayout>{children}</ThemeRtlLayout>
    </ThemeLocalization>
  );
}
