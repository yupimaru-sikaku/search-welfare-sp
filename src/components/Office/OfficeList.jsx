import { useState, useEffect } from "react";
import { searchOfficeData } from "src/hooks/office";
import Link from "next/link";
import { useFetchArray } from "src/hooks/useFetchArray";

export const OfficeList = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-office`
  );

  const [searchWord, setSearchWord] = useState("");
  const [searchedOfficeList, setSearchedOfficeList] = useState(data);

  useEffect(() => {
    const fetch = async () => {
      let searchedOfficeList = await searchOfficeData(searchWord);
      setSearchedOfficeList(searchedOfficeList);
    };
    fetch();
  }, [searchWord]);

  if (error) {
    return (
      <div className="text-center">
        エラーが発生したため、データの取得に失敗しました
      </div>
    );
  }
  if (isLoading) {
    return <div className="text-center">ローディンク中</div>;
  }
  if (isEmpty) {
    return <div className="text-center">データは空です</div>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-bl-lg rounded-tl-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
            <button
              className="btn inline-block px-6 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded-br-lg rounded-tr-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {searchedOfficeList &&
          searchedOfficeList.map((office) => (
            <Link href={`/office/${office.id}`} passHref key={office.id}>
              <a className="block p-6 text-center bg-gray-600 rounded-lg shadow-xl hover:bg-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p className="font-normal text-gray-200 dark:text-gray-400">
                  {office.officeName}
                </p>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};
