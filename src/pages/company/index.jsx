import { Layout } from "src/layouts/Layout";
import { CompanyList } from "src/components/CompanyList";
import { SWRConfig } from "swr";

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
    revalidate: 5,
  };
};

const CompanyIndex = (props) => {
  const { fallback } = props;

  return (
    <Layout title="法人一覧">
      <div className="text-center p-10 text-2xl text-white">
        <p>法人一覧</p>
      </div>
      <SWRConfig value={{ fallback }}>
        <CompanyList />
      </SWRConfig>
    </Layout>
  );
};

export default CompanyIndex;
