import Layout from "../Components/Layout";
import CompanySearchForm from "../Components/CompanySearchForm";

const CompanyPage = () => {
  return (
    <Layout title="法人一覧">
      <div className="text-center p-10 text-2xl text-white">
        <p>法人一覧</p>
      </div>
      <CompanySearchForm />
    </Layout>
  );
};

export default CompanyPage;
