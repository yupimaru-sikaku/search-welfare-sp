import {
  getAllCompanyIds,
  getCompanyData,
  getOfficeCompanyListData,
} from "../../lib/companies";
import Layout from "../../Components/Layout";
import { ServiceOffice } from "../../Components/ServiceOffice";
import Link from "next/link";
import { ClipBoard } from "../../Components/ClipBoard";

const Comapny = ({ staticComapny, staticOffice }) => {
  return (
    <Layout title={staticComapny.companyName}>
      <div className="text-center p-10 text-xl">
        <p className="p-1 text-yellow-200">{staticComapny.companyName}の情報</p>
        <ul>
          <li className="p-5">{`〒${staticComapny.postalCode}`}</li>
          <ClipBoard copyWord={staticComapny.postalCode} />
          <li className="p-5">{`住所：${staticComapny.address}`}</li>
          <ClipBoard copyWord={staticComapny.address} />
          <li className="p-5">{`TEL:${staticComapny.telephoneNumber}`}</li>
          <ClipBoard copyWord={staticComapny.telephoneNumber} />
          <li className="p-5">{`FAX：${staticComapny.faxNumber}`}</li>
          <ClipBoard copyWord={staticComapny.faxNumber} />
          <li className="p-5">{`メールアドレス：${staticComapny.email}`}</li>
          <ClipBoard copyWord={staticComapny.email} />
          <li className="p-5">{`代表者：${staticComapny.humanName}`}</li>
          <ClipBoard copyWord={staticComapny.humanName} />
        </ul>
        <p className="text-yellow-200 m-10">事業所とサービスの情報</p>
        {staticOffice.length ? (
          staticOffice.map((office, index) => (
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

export async function getStaticPaths() {
  const paths = await getAllCompanyIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const staticComapny = await getCompanyData(params.id);
  const staticOffice = await getOfficeCompanyListData(params.id);
  return {
    props: {
      id: staticComapny.id,
      staticComapny,
      staticOffice,
    },
    revalidate: 3,
  };
}

export default Comapny;
