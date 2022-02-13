import { useState, useEffect, useCallback } from "react";
import { searchCompanyData } from "../lib/companies";
import Link from "next/link";
import { getAllCompanyData } from "../lib/companies";

const companySearchForm = ({ comapnyList }) => {
  const [searchWord, setSearchWord] = useState("");
  const [searchedCompanyList, setSearchedCompanyList] = useState([]);
  console.log(comapnyList);

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

export async function getStaticProps() {
  const comapnyList = await getAllCompanyData();

  return {
    props: {
      comapnyList,
    },
    revalidate: 3,
  };
}

export default companySearchForm;
