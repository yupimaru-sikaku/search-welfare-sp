import { useState, useEffect } from "react";
import { searchCompanyData } from "../lib/companies";
import Link from "next/link";

const companySearchForm = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchedCompanyList, setSearchedCompanyList] = useState([]);

  useEffect(async () => {
    let searchedCompanyList = await searchCompanyData(searchWord);
    setSearchedCompanyList(searchedCompanyList);
  }, [searchWord]);

  return (
    <div>
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
            <Link href={`/companies/${company.id}`}>
              <p>{company.companyName}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

// export async function searchCompanyData

export default companySearchForm;
