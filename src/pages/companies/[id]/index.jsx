import { Layout } from "src/layouts/Layout";
import { useCompany } from "src/hooks/useCompany";
import { useOfficeCompany } from "src/hooks/useOffice";
import { ClipBoard } from "src/components/ClipBoard";
import Link from "next/link";
import { ServiceOffice } from "src/components/ServiceOffice";

export const getStaticPaths = async () => {
  const companyList = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company?_limit=10`
  );
  const companyListData = await companyList.json();
  const paths = companyListData.map((company) => ({
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
    };
  }

  const companyData = await company.json();

  return {
    props: {
      fallback: {
        [COMPANY_API_URL]: companyData,
      },
    },
  };
};

const ComapnyId = (props) => {
  const { fallback } = props;
  const { company, officeList, error, isLoading } = useCompany();

  if (error) {
    return <div>エラーが発生したため、データの取得に失敗しました</div>;
  }
  if (isLoading) {
    return <div>ローディンク中</div>;
  }
  return (
    <Layout>
      <div className="text-center p-10 text-xl">
        <p className="p-1 text-yellow-200">{company?.companyName}の情報</p>
        <ul>
          <li className="p-5">{`〒${company?.postalCode}`}</li>
          <ClipBoard copyWord={company?.postalCode} />
          <li className="p-5">{`住所：${company?.address}`}</li>
          <ClipBoard copyWord={company?.address} />
          <li className="p-5">{`TEL:${company?.telephoneNumber}`}</li>
          <ClipBoard copyWord={company?.telephoneNumber} />
          <li className="p-5">{`FAX：${company?.faxNumber}`}</li>
          <ClipBoard copyWord={company?.faxNumber} />
          <li className="p-5">{`メールアドレス：${company?.email}`}</li>
          <ClipBoard copyWord={company?.email} />
          <li className="p-5">{`代表者：${company?.humanName}`}</li>
          <ClipBoard copyWord={company?.humanName} />
        </ul>
        <p className="text-yellow-200 m-10">事業所とサービスの情報</p>
        {officeList?.length ? (
          officeList.map((office, index) => (
            <div key={office.officeName}>
              <div className="m-10">
                <p className="text-white">{`事業所-${index + 1}`}</p>
                <ul>
                  <li className="p-1">{`事業所名：${office.officeName}`}</li>
                  <li className="p-1">{`〒：${office.postalCode}`}</li>
                  <li className="p-1">{`住所：${office.address}`}</li>
                  <li className="p-1">{`TEL：${office.telephoneNumber}`}</li>
                  <li className="p-1">{`FAX：${office.faxNumber}`}</li>
                  <li className="p-1">{`メールアドレス：${office.email}`}</li>
                  <li className="p-1">{`代表者名：${office.humanName}`}</li>
                  <li className="p-1">{`定員：${office.capacity}`}</li>
                </ul>
              </div>
              <ServiceOffice
                officeId={office.id}
                officeName={office.officeName}
              />
            </div>
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

export default ComapnyId;
