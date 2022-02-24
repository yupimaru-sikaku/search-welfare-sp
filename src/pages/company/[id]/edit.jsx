import { Layout } from "src/layouts/Layout";
import { SWRConfig } from "swr";
import { CompanyEdit } from "src/components/Company/CompanyEdit";

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`
  );
  const companyList = await res.json();
  const paths = companyList.map((company) => ({
    params: { id: company.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const COMPANY_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${id}`;
  const company = await fetch(COMPANY_API_URL);
  if (!company.ok) {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
  const companyData = await company.json();

  return {
    props: {
      fallback: {
        [COMPANY_API_URL]: companyData,
      },
    },
    revalidate: 5,
  };
};

const CompanyIdEdit = (props) => {
  const { fallback } = props;
  return (
    <Layout title="編集画面">
      <SWRConfig value={{ fallback }}>
        <CompanyEdit />
      </SWRConfig>
    </Layout>
  );
};

export default CompanyIdEdit;
