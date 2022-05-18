import Head from "next/head";
import { MainHeader } from "src/layouts/MainHeader";
import { MainFooter } from "src/layouts/MainFooter";

export const Layout = ({ children, title = "デフォルトページ" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader />
      <main className="bg-gray-600 min-h-screen">{children}</main>
      <MainFooter />
    </div>
  );
};
