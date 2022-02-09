import { getAllCompanyIds, getCompanyData } from "../../lib/companies";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../Components/Layout";
import { useEffect } from "react";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Comapny = ({ staticComapny, id }) => {
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
      <div>{staticComapny.companyName}</div>
      <div>{staticComapny.companyName}</div>
      <div>{staticComapny.postalCode}</div>
      <div>{staticComapny.address}</div>
      <div>{staticComapny.telephoneNumber}</div>
      <div>{staticComapny.faxNumber}</div>
      <div>{staticComapny.email}</div>
      <div>{staticComapny.humanName}</div>
      <Link href="/company-page">
        <span>会社情報一覧に戻る</span>
      </Link>
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
  return {
    props: {
      id: staticComapny.id,
      staticComapny,
    },
    revalidate: 3,
  };
}

export default Comapny;
