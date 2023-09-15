import Head from "next/head";
import type { MetaProps } from "./MetaTag.types";

export const MetaTag = ({ title, name, content }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name={name} content={content} />
    </Head>
  );
};
