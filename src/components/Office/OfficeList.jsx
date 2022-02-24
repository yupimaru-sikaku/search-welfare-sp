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
    <div className="text-center">
      <div>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <div>
        {searchedOfficeList &&
          searchedOfficeList.map((office) => (
            <Link href={`/office/${office.id}`} key={office.id}>
              <p className="cursor-pointer hover:text-gray-500 p-5">
                {office.officeName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};
