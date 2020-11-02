import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Brand } from '../components';
import { useOnOutside } from '../hooks/useOnOutsideEvents';

const Nav = styled(motion.nav)`
  align-items: center;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  padding: .5rem 1rem;
`;

const Menu = styled(motion.div)`
  bottom: 0;
  max-width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;

  @media (min-width: 600px) {
    bottom: unset;
    max-width: unset;
    position: static;
    right: unset;
    top: unset;
    width: auto;
  }
`;

const MenuContainer = styled.div`
  background-color: #eee;
  bottom: 0;
  left: 0;
  padding-right: 25%;
  position: absolute;
  right: -25%;
  top: 0;

  @media (min-width: 600px) {
    background-color: unset;
    bottom: unset;
    left: unset;
    padding-right: unset;
    position: static;
    right: unset;
    top: unset;
  }
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const MenuItem = styled.a`
  cursor: pointer;
  display: block;
  line-height: 1;
  margin: 1rem 0;

  @media (min-width: 600px) {
    margin: .25rem;
  }
`;

const BrandLogo = styled.div`
  svg {
    color: black;
    height: 40px;
    width: 40px;
  }
`;

const Toggle = styled.div`
  border: 1px solid #000;
  cursor: pointer;
  display: block;
  line-height: 1;
  margin-left: auto;
  padding: .5rem;

  @media (min-width: 600px) {
    display: none;
  }
`;

export const Navigation = (): JSX.Element => {
  const controls = useAnimation();
  const mobile = useRef(typeof window !== 'undefined' ? !matchMedia('(min-width: 600px)').matches : false);
  const open = useRef(false);
  const ref = useRef(null);

  const onToggle = useCallback(() => {
    open.current = !open.current;

    if (mobile.current) {
      void controls.start({ x: open.current ? '0%' : '100%' });
    }
  }, [controls]);

  const onSwitchOff = useCallback(() => {
    if (open.current && mobile.current) {
      open.current = false;
      void controls.start({ x: '100%' });
    }

  }, [controls]);

  useOnOutside([
    'mousedown',
    'touchstart',
  ], ref, () => {
    if (open.current && mobile.current) {
      open.current = false;
      void controls.start({ x: '100%' });
    }
  });

  useEffect(() => {
    if (mobile.current) {
      void controls.set({ x: open.current ? '0%' : '100%' });
    } else {
      void controls.set({ x: 0 });
    }
  }, [controls]);

  useEffect(() => {
    const listener = () => {
      mobile.current = (
        typeof window !== 'undefined' ? !matchMedia('(min-width: 600px)').matches : false
      );

      if (mobile.current) {
        void controls.set({ x: open.current ? '0%' : '100%' });
      } else {
        void controls.set({ x: 0 });
      }
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [controls]);

  return (
    <Nav>
      <BrandLogo>
        <Link href="/">
          <div>
            <Brand />
          </div>
        </Link>
      </BrandLogo>
      <Menu animate={controls} initial={false} ref={ref}>
        <MenuContainer>
          <MenuList>
            <Toggle onClick={onToggle}>&times;</Toggle>
            <Link href="/products">
              <MenuItem onClick={onSwitchOff}>Products (Next)</MenuItem>
            </Link>
            <Link href="/products/recoil" prefetch={false}>
              <MenuItem onClick={onSwitchOff}>Products (Recoil)</MenuItem>
            </Link>
            <Link href="https://google.com" passHref={true}>
              <MenuItem rel="noreferrer" target="_blank">External Page</MenuItem>
            </Link>
          </MenuList>
        </MenuContainer>
      </Menu>
      <Toggle onClick={onToggle}>···</Toggle>
    </Nav>
  );
};
