import { useState, useEffect, useCallback } from "react";
import { searchCompanyData } from "src/hooks/companies";
import Link from "next/link";
import { useFetchArray } from "src/hooks/useFetchArray";

export const CompanyList = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`
  );

  const [searchWord, setSearchWord] = useState("");
  const [searchedCompanyList, setSearchedCompanyList] = useState(data);

  useEffect(() => {
    const fetch = async () => {
      let searchedCompanyList = await searchCompanyData(searchWord);
      setSearchedCompanyList(searchedCompanyList);
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
        {searchedCompanyList &&
          searchedCompanyList.map((company) => (
            <Link href={`/companies/${company.id}`} key={company.id}>
              <p className="cursor-pointer hover:text-gray-500 p-5">
                {company.companyName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};
