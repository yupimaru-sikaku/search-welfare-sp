import { Layout } from "src/layouts/Layout";
import { OfficeList } from "src/components/Office/OfficeList";
import { SWRConfig } from "swr";
import Link from "next/link";

export const getStaticProps = async () => {
  const OFFICE_LIST_API = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-office`;
  const res = await fetch(OFFICE_LIST_API);
  const officeListData = await res.json();

  return {
    props: {
      fallback: {
        [OFFICE_LIST_API]: officeListData,
      },
    },
    revalidate: 5,
  };
};

const OfficeIndex = (props) => {
  const { fallback } = props;

  return (
    <Layout title="事業所一覧">
      <div className="flex items-center justify-center p-10 text-2xl text-white">
        <p>事業所一覧</p>
      </div>

      <SWRConfig value={{ fallback }}>
        <OfficeList />
      </SWRConfig>
    </Layout>
  );
};

export default OfficeIndex;
