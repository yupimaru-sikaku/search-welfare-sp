import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "src/hooks/useFetch";
import { usePromiseToast } from "src/hooks/usePromiseToast";

export const CompanyEdit = () => {
  const router = useRouter();

  const { data: companyData, mutate } = useFetch(
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

  const handleClick = async () => {
    await promiseToast(handleUpdate());
  };
  const { promiseToast, Toaster } = usePromiseToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdate = async () => {
    setIsLoading(true);
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
        },
      }
    ).then((res) => {
      if (res.ok) {
        router.push(`/company/${companyData.id}`);
        mutate();
        return new Promise((resolve) => resolve("登録に成功しました"));
      } else if (res.status === 401) {
        setIsLoading(false);
        return new Promise((resolve, reject) => reject("ログインしてください"));
      } else {
        setIsLoading(false);
        return new Promise((resolve, reject) => reject("登録に失敗しました"));
      }
    });
  };

  return (
    <section className="antialiased text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <header className="flex items-center px-5 py-4 border-b border-gray-100">
            <div className="relative z-0 w-full group">
              <input
                name="companyNumber"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            {isLoading ? (
              <span className="ml-5 animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 h-6 w-6 cursor-pointer text-green-500 font-extrabold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={handleClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </>
            )}
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
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="companyNumber"
                          value={companyNumber}
                          onChange={(e) => setCompanyNumber(e.target.value)}
                          maxLength={13}
                          required
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">〒</div>
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="postalCode"
                          value={postalCode}
                          onChange={(e) => setpPostalCode(e.target.value)}
                          maxLength={7}
                          required
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">住所</div>
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">TEL</div>
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="telephoneNumber"
                          value={telephoneNumber}
                          onChange={(e) => setTelephoneNumber(e.target.value)}
                          maxLength={11}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
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
                      <div className="relative z-0 w-full group">
                        <input
                          name="faxNumber"
                          value={faxNumber ? faxNumber : "---"}
                          onChange={(e) => setFaxNumber(e.target.value)}
                          maxLength={11}
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">代表者</div>
                        <div className="block bg-green-200 text-xs px-1 rounded-lg text-green-500 font-bold md:text-right ml-2">
                          必須
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="relative z-0 w-full group">
                        <input
                          name="humanName"
                          value={humanName}
                          onChange={(e) => setHumanName(e.target.value)}
                          required
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};
