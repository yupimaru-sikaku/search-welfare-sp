import {
  getAllCompanyIds,
  getCompanyData,
  getOfficeCompanyListData,
} from "../../lib/companies";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../Components/Layout";
import { useEffect } from "react";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Comapny = ({ staticComapny, statticOffice, id }) => {
  const router = useRouter();
  const { data: company, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${id}`,
    fetcher,
    {
      fallbackData: staticComapny,
    }
  );
  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !company) {
    return <div>Loading</div>;
  }

  return (
    <Layout title={staticComapny.companyName}>
      <div className="text-center p-10 text-2xl">
        <p className="p-5 text-white">{staticComapny.companyName}の情報</p>
        <ul>
          <li className="p-5">{`〒${staticComapny.postalCode}`}</li>
          <li className="p-5">{`住所${staticComapny.address}`}</li>
          <li className="p-5">{`TEL:${staticComapny.telephoneNumber}`}</li>
          <li className="p-5">{`FAX：${staticComapny.faxNumber}`}</li>
          <li className="p-5">{`メールアドレス：${staticComapny.email}`}</li>
          <li className="p-5">{`代表者：${staticComapny.humanName}`}</li>
        </ul>
        <p>事業所情報</p>
        {statticOffice.length ? (
          statticOffice.map((office) => (
            <ul>
              <li key={office.id}>{office.officeName}</li>
            </ul>
          ))
        ) : (
          <p>事業所はありませんね</p>
        )}
        <Link href="/company-page">
          <span className="block p-5 cursor-pointer hover:text-gray-500">
            会社情報一覧に戻る
          </span>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getAllCompanyIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const staticComapny = await getCompanyData(params.id);
  const statticOffice = await getOfficeCompanyListData(params.id);
  return {
    props: {
      id: staticComapny.id,
      staticComapny,
      statticOffice,
    },
    revalidate: 3,
  };
}

export default Comapny;
