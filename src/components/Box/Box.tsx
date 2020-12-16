import styled from "@emotion/styled";

const Component = styled.div``;

export const Box = ({ children }: Readonly<React.PropsWithChildren<Record<string, unknown>>>): JSX.Element => (
  <Component>{children}</Component>
);
