import Layout from "../Components/Layout";
import { useEffect } from "react";
import useSWR from "swr";
import CompanySearchForm from "../Components/CompanySearchForm";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company/`;

const CompanyPage = ({ staticfilterdCompanies }) => {
  const { data: companies, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticfilterdCompanies,
  });

  const filteredCompanies = companies?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title="法人一覧">
      <div className="text-center p-10 text-2xl text-white">
        <p>法人一覧</p>
      </div>
      <CompanySearchForm />
    </Layout>
  );
};

export default CompanyPage;
