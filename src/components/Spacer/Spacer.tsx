import React from 'react';
import styled from 'styled-components';

const Component = styled.div``;

export const Spacer = ({ children }: React.PropsWithChildren<Record<string, unknown>>): JSX.Element => {
  return (
    <Component>{children}</Component>
  );
};
