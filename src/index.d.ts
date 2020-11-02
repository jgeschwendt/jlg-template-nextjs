import 'styled-components';
import { theme } from './styled/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: typeof theme.breakpoints;
  }
}
