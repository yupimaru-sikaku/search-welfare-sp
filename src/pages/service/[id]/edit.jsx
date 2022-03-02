import { Layout } from "src/layouts/Layout";
import { SWRConfig } from "swr";
import { ServiceEdit } from "src/components/Service/ServiceEdit";

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-service`
  );
  const serviceList = await res.json();
  const paths = serviceList.map((service) => ({
    params: { id: service.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const SERVICE_API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service/${id}`;
  const service = await fetch(SERVICE_API_URL);
  if (!service.ok) {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
  const serviceData = await service.json();

  return {
    props: {
      fallback: {
        [SERVICE_API_URL]: serviceData,
      },
    },
    revalidate: 5,
  };
};

const ServiceIdEdit = (props) => {
  const { fallback } = props;
  return (
    <Layout title="編集画面">
      <SWRConfig value={{ fallback }}>
        <ServiceEdit />
      </SWRConfig>
    </Layout>
  );
};

export default ServiceIdEdit;
