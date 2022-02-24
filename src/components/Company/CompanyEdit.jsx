import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "src/hooks/useFetch";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const CompanyEdit = () => {
  const router = useRouter();

  const { data: companyData } = useFetch(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${router.query.id}`
      : null
  );

  const [companyName, setCompanyName] = useState(companyData.companyName);
  const [companyNumber, setCompanyNumber] = useState(companyData.companyNumber);
  const [postalCode, setpPostalCode] = useState(companyData.postalCode);
  const [address, setAddress] = useState(companyData.address);
  const [telephoneNumber, setTelephoneNumber] = useState(
    companyData.telephoneNumber
  );
  const [faxNumber, setFaxNumber] = useState(companyData.faxNumber);
  const [email, setEmail] = useState(companyData.email);
  const [humanName, setHumanName] = useState(companyData.humanName);

  const handleUpdate = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/companies/${companyData.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...companyData,
          id: companyData.id,
          companyName: companyName,
          companyNumber: companyNumber,
          postalCode: postalCode,
          address: address,
          telephoneNumber: telephoneNumber,
          faxNumber: faxNumber,
          email: email,
          humanName: humanName,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("更新出来ませんでした");
      }
    });
    router.push(`/company/${companyData.id}`);
  };

  return (
    <section className="antialiased text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <header className="flex px-5 py-4 border-b border-gray-100">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="companyName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer text-green-500 font-extrabold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleUpdate}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>{" "}
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <tbody className="text-sm divide-y divide-gray-100">
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">
                          法人番号
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="companyNumber"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={companyNumber}
                          onChange={(e) => setCompanyNumber(e.target.value)}
                          maxLength={7}
                          required
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">〒</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="postalCode"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={postalCode}
                          onChange={(e) => setpPostalCode(e.target.value)}
                          maxLength={7}
                          required
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">住所</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="address"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">TEL</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="telephoneNumber"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={telephoneNumber}
                          onChange={(e) => setTelephoneNumber(e.target.value)}
                          maxLength={11}
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">FAX</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="faxNumber"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={faxNumber ? faxNumber : "---"}
                          onChange={(e) => setFaxNumber(e.target.value)}
                          maxLength={11}
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
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
                      <div className="relative z-0 w-full group">
                        <input
                          type="email"
                          name="email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">代表者</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="humanName"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={humanName}
                          onChange={(e) => setHumanName(e.target.value)}
                          required
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};