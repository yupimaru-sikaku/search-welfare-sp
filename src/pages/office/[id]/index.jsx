import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { SWRConfig } from "swr";
import { OfficeDetail } from "src/components/Office/OfficeDetail";

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-office`
  );
  const officeList = await res.json();
  const paths = officeList.map((office) => ({
    params: { id: office.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const OFFICE_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office/${id}`;
  const office = await fetch(OFFICE_API_URL);
  if (!office.ok) {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
  const officeData = await office.json();

  const SERVICE_LIST_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service-office/?office=${id}`;
  const serviceList = await fetch(SERVICE_LIST_API_URL);
  const serviceListData = await serviceList.json();

  return {
    props: {
      fallback: {
        [OFFICE_API_URL]: officeData,
        [SERVICE_LIST_API_URL]: serviceListData,
      },
      officeData,
    },
    revalidate: 5,
  };
};

const OfficeId = (props) => {
  const { fallback } = props;
  return (
    <Layout title={props.officeData.officeName}>
      <SWRConfig value={{ fallback }}>
        <OfficeDetail />
      </SWRConfig>
      <Link href="/office">
        <span className="block text-center text-white p-5 cursor-pointer hover:text-gray-500">
          事業所情報一覧に戻る
        </span>
      </Link>
    </Layout>
  );
};

export default OfficeId;
