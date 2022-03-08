import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { ITEM_LIST } from "src/items/main";

const Home = () => {
  return (
    <Layout title={"メインページ"}>
      <div className="container px-6 py-10 m-auto">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 md:gap-12 md:w-2/3 md:mx-auto xl:w-1/3">
          {ITEM_LIST.map((item) => {
            return (
              <Link href={item.href} passHref key={item.title}>
                <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl cursor-pointer hover:bg-indigo-900">
                  <span className="inline-block text-blue-500 dark:text-blue-400">
                    {item.svg}
                  </span>
                  <h1 className="text-2xl font-semibold text-gray-200 capitalize dark:text-white">
                    {item.title}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
