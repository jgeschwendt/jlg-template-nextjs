import { render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import { Spacer } from '../Spacer';

describe('<Spacer />', () => {
  it('should be defined', () => {
    expect(Spacer).toBeDefined();
  });

  it('should match the snapshot', () => {
    expect(create(<Spacer>Text</Spacer>).toJSON()).toMatchSnapshot();
  });

  it('should work with @testing-library/react', () => {
    const text = 'Text';
    const {
      container,
    } = render(
      <Spacer>{text}</Spacer>
    );

    expect(container.className).toBeDefined();
    expect(container.querySelector('div').textContent).toEqual(text);
  });
});
