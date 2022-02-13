import Layout from "../Components/Layout";
// import CompanySearchForm from "../Components/CompanySearchForm";
import { getAllCompanyData } from "../lib/companies";
import Link from "next/link";

const CompanyPage = ({ companyList }) => {
  return (
    <Layout title="法人一覧">
      <div className="text-center p-10 text-2xl text-white">
        <p>法人一覧</p>
        {companyList.map((company) => {
          return (
            <li key={company.id}>
              <Link href={`/companies/${company.id}`} key={company.id}>
                <p>{company.companyName}</p>
              </Link>
            </li>
          );
        })}
      </div>
    </Layout>
  );
};

export default CompanyPage;

export async function getStaticProps() {
  const companyList = await getAllCompanyData();

  return {
    props: { companyList },
    revalidate: 3,
  };
}
