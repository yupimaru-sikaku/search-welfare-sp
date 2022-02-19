import { Layout } from "src/layouts/Layout";
import Link from "next/link";
import { SWRConfig } from "swr";
import { CompanyDetail } from "src/components/CompanyDetail";

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`
  );
  const companyList = await res.json();
  const paths = companyList.map((company) => ({
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
      revalidate: 5,
    };
  }

  const companyData = await company.json();

  return {
    props: {
      fallback: {
        [COMPANY_API_URL]: companyData,
      },
    },
    revalidate: 5,
  };
};

const CompanyId = (props) => {
  const { fallback } = props;

  return (
    <Layout>
      <SWRConfig value={{ fallback }}>
        <CompanyDetail />
      </SWRConfig>
      {/* <p className="text-yellow-200 m-10">事業所とサービスの情報</p>
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
        )} */}
      <Link href="/company">
        <span className="block text-center text-white p-5 cursor-pointer hover:text-gray-500">
          会社情報一覧に戻る
        </span>
      </Link>
    </Layout>
  );
};

export default CompanyId;
