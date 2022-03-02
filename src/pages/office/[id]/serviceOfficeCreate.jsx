import { Layout } from "src/layouts/Layout";
import { ServiceOfficeCreate } from "src/components/Service/ServiceOfficeCreate";

const serviceOfficeIdCreate = () => {
  return (
    <Layout title="新規作成画面">
      <ServiceOfficeCreate />
    </Layout>
  );
};

export default serviceOfficeIdCreate;
