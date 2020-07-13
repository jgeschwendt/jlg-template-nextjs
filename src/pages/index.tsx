import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem auto;
  max-width: 80%;
`;

type Props = { date: string };

const Home = (props: Props): JSX.Element => {
  const [date, updateDate] = React.useState<string | null>(null);

  React.useEffect(() => {
    updateDate(new Date().toISOString());
  }, []);

  return (
    <Container>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello,</h1>
      </main>

      <footer>
        <p>Client: {date}</p>
        <p>Static: {props.date}</p>
      </footer>
    </Container>
  );
};

const getStaticProps: GetStaticProps<Props> = () => {
  return Promise.resolve({
    props: {
      date: new Date().toISOString(),
    },
    unstable_revalidate: 60 * 5,
  });
};

export {
  Home as default,
  getStaticProps,
};
