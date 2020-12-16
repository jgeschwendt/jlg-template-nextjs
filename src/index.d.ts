// eslint-disable-next-line import/no-unassigned-import -- declaration merging
import "@emotion/react";
import type { theme } from "./styled/theme";

declare module "@emotion/react" {
  export type Theme = {
    breakpoints: typeof theme.breakpoints;
  };
}
