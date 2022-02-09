import Layout from "../Components/Layout";
import Company from "../Components/Company";
import { getAllCompanyData } from "../lib/companies";
import StateContextProvider from "../context/StateContext";
import { useEffect } from "react";
import useSWR from "swr";
import CompanyForm from "../Components/CompanyForm";

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
    <StateContextProvider>
      <Layout title="法人一覧">
        <div className="text-center">
          <p>法人一覧</p>
        </div>
        <CompanyForm companyCreated={mutate} />
        <div>
          {filteredCompanies &&
            filteredCompanies.map((company) => (
              <Company
                key={company.id}
                company={company}
                companyDeleted={mutate}
              />
            ))}
        </div>
      </Layout>
    </StateContextProvider>
  );
};

export default CompanyPage;

export async function getStaticProps() {
  const staticfilterdCompanies = await getAllCompanyData();

  return {
    props: {
      staticfilterdCompanies,
    },
    revalidate: 3,
  };
}
