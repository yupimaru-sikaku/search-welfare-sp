import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { useCompanyList } from "src/hooks/useCompany";
import { SWRConfig } from "swr";
import { CompanyList } from "src/components/CompanyList";

const CompanyIndex = () => {
  return (
    <Layout title="法人一覧">
      <div className="text-center p-10 text-2xl text-white">
        <p>法人一覧</p>
      </div>
      <CompanyList />
    </Layout>
  );
};

export default CompanyIndex;

// export const getStaticProps = async () => {
//   const COMPANY_LIST = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company/`;
//   const res = await fetch(COMPANY_LIST);
//   const companyList = await res.json();
//   return {
//     props: {
//       fallback: {
//         [COMPANY_LIST]: companyList,
//       },
//     },
//   };
// };
