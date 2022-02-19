import { useState, useEffect, useCallback } from "react";
import { searchCompanyData } from "src/hooks/companies";
import Link from "next/link";

export const getStaticProps = async () => {
  const COMPANY_LIST_API = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`;
  const res = await fetch(COMPANY_LIST_API);
  const companyListData = await res.json();

  return {
    props: {
      fallback: {
        [COMPANY_LIST_API]: companyListData,
      },
    },
  };
};

export const CompanyList = (props) => {
  console.log(props);
  const [searchWord, setSearchWord] = useState("");
  const [searchedCompanyList, setSearchedCompanyList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let searchedCompanyList = await searchCompanyData(searchWord);
      setSearchedCompanyList(searchedCompanyList);
    };
    fetch();
  }, [searchWord]);

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
