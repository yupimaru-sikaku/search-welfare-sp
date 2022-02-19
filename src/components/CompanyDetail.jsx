import { useFetch } from "src/hooks/useFetch";
import { useFetchArray } from "src/hooks/useFetchArray";
import { useRouter } from "next/router";
import { ClipBoard } from "src/components/ClipBoard";
import Link from "next/link";

export const CompanyDetail = () => {
  const router = useRouter();

  const {
    data: companyData,
    error: companyError,
    companyIsLoading,
  } = useFetch(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${router.query.id}`
      : null
  );

  const {
    data: officeListData,
    error: officeListError,
    isEmpty: officeIsEmpty,
  } = useFetchArray(
    companyData.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office-company/?company=${companyData.id}`
      : null
  );

  if (companyError) {
    return <div>エラーが発生したため、データの取得に失敗しました</div>;
  }

  return (
    <section className="antialiased text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">
              {companyData.companyName}
            </h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <tbody className="text-sm divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">〒</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{companyData.postalCode}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard copyWord={companyData.postalCode} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">住所</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{companyData.address}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard copyWord={companyData.address} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">TEL</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {companyData.telephoneNumber}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard copyWord={companyData.telephoneNumber} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">FAX</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {companyData.faxNumber ? companyData.faxNumber : "---"}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard
                          copyWord={
                            companyData.faxNumber ? companyData.faxNumber : ""
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">
                          アドレス
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{companyData.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard copyWord={companyData.email} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">代表者</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{companyData.humanName}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        <ClipBoard copyWord={companyData.humanName} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto mt-10 text-start">
          {officeIsEmpty === false ? (
            officeListData.map((office) => {
              return (
                <Link href={`/office/${office.id}`} key={office.id}>
                  <div className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-900 text-white rounded-full cursor-pointer hover:bg-orange-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="feather feather-arrow-right mr-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    {office.officeName}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-white text-center m-10">
              事業所はありません
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
