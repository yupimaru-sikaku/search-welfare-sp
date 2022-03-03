import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { SWRConfig } from "swr";
import { OfficeDetail } from "src/components/Office/OfficeDetail";
import { ServiceOfficeList } from "src/components/Service/ServiceOfficeList";

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
        <ServiceOfficeList />
      </SWRConfig>
      <Link href={`/office/${props.officeData.id}/serviceOfficeCreate`}>
        <button className="block mt-10 mx-auto text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          サービスを追加する
        </button>
      </Link>

      <Link href="/office">
        <a className="border mt-10 mx-auto w-52 border-gray-600 block rounded-lg font-bold py-4 px-6 flex items-center text-white bg-gray-500 hover:text-white hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          事業者一覧に戻る
        </a>
      </Link>
      <div className="h-10"></div>
    </Layout>
  );
};

export default OfficeId;
