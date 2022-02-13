import Head from "next/head";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";

const Layout = ({ children, title = "デフォルトページ" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gray-600">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
