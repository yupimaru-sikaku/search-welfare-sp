import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { SWRConfig } from "swr";
import { CompanyDetail } from "src/components/Company/CompanyDetail";

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

  const OFFICE_LIST_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office-company/?company=${id}`;
  const officeList = await fetch(OFFICE_LIST_API_URL);
  const officeListData = await officeList.json();

  return {
    props: {
      fallback: {
        [COMPANY_API_URL]: companyData,
        [OFFICE_LIST_API_URL]: officeListData,
      },
      companyData,
    },
    revalidate: 5,
  };
};

const CompanyId = (props) => {
  const { fallback } = props;
  return (
    <Layout title={props.companyData.companyName}>
      <SWRConfig value={{ fallback }}>
        <CompanyDetail />
      </SWRConfig>
      <Link href={`/company/${props.companyData.id}/officeCompanyCreate`}><a>事業所を作成する</a></Link>
      <Link href="/company">
        <a className="block text-center text-white p-5 cursor-pointer hover:text-gray-500">
          会社情報一覧に戻る
        </a>
      </Link>
    </Layout>
  );
};

export default CompanyId;
