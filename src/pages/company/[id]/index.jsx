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
      <Link href={`/company/${props.companyData.id}/officeCompanyCreate`} passHref>
        <button className="block mx-auto text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          事業所を作成する
        </button>
      </Link>

      <Link href="/company" passHref>
        <a className="border mt-10 mx-auto w-52 border-gray-600 block rounded-lg font-bold py-4 px-6 flex items-center text-white bg-gray-500 hover:text-white hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
            />
          </svg>
          法人一覧に戻る
        </a>
      </Link>
      <div className="h-10"></div>
    </Layout>
  );
};

export default CompanyId;
