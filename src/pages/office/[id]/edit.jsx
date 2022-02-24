import { Layout } from "src/layouts/Layout";
import { SWRConfig } from "swr";
import { OfficeEdit } from "src/components/Office/OfficeEdit";

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

  return {
    props: {
      fallback: {
        [OFFICE_API_URL]: officeData,
      },
    },
    revalidate: 5,
  };
};

const OfficeIdEdit = (props) => {
  const { fallback } = props;
  return (
    <Layout title="編集画面">
      <SWRConfig value={{ fallback }}>
        <OfficeEdit />
      </SWRConfig>
    </Layout>
  );
};

export default OfficeIdEdit;
