import styled from "@emotion/styled";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  max-width: 80%;
`;

type Props = Readonly<{
  date: string;
}>;

const Home = (props: Props): JSX.Element => {
  const [date, updateDate] = useState<string | null>(null);

  useEffect(() => {
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

const getStaticProps: GetStaticProps<Props> = async () => Promise.resolve({
  props: {
    date: new Date().toISOString(),
  },
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- revalidate after 5 minutes
  revalidate: 60 * 5,
});

export {
  Home as default,
  getStaticProps,
};
