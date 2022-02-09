import Layout from "../Components/Layout";
import Link from "next/link";

const MainPage = () => {
  return (
    <Layout title={"メインページ"}>
      <div className="h-screen flex items-center justify-around">
        <Link href="/company-page">
          <a className="bg-green-900 p-10 text-white rounded-lg hover:bg-green-900 hover:text-gray-400">
            法人名で探す
          </a>
        </Link>
        <Link href="/">
          <a className="bg-indigo-900 p-10 text-white rounded-lg hover:bg-indigo-800 hover:text-gray-400">
            事業所名で探す
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default MainPage;
