import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "src/hooks/useFetch";
import Select from "react-select";
import { serviceList } from "src/items/serviceList";
import { usePromiseToast } from "src/hooks/usePromiseToast";

export const ServiceEdit = () => {
  const router = useRouter();
  const SERVICE_LIST = serviceList;

  const { data: serviceData } = useFetch(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service/${router.query.id}`
      : null
  );

  const [serviceType, setServiceType] = useState(serviceData.serviceType);
  const [officeNumber, setOfficeNumber] = useState(serviceData.officeNumber);
  const [capacity, setCapacity] = useState(serviceData.capacity);

  const handleClick = async () => {
    await promiseToast(handleUpdate());
  };
  const { promiseToast, Toaster } = usePromiseToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/services/${serviceData.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...serviceData,
          officeNumber: officeNumber,
          serviceType: serviceType,
          capacity: capacity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        router.push("/office");
        return new Promise((resolve, reject) => resolve("登録に成功しました"));
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
              <Select
                className="w-11/12"
                instanceId="selectbox"
                value={serviceType.value}
                defaultValue={{ label: serviceType, value: serviceType }}
                options={SERVICE_LIST}
                onChange={(serviceType) => setServiceType(serviceType.value)}
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
                          事業所番号
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="z-0 w-full group">
                        <input
                          name="officeNumber"
                          value={officeNumber}
                          onChange={(e) => setOfficeNumber(e.target.value)}
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
                        <div className="font-medium text-gray-800">定員</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="z-0 w-full group">
                        <input
                          name="capacity"
                          value={capacity}
                          onChange={(e) => setCapacity(e.target.value)}
                          maxLength={7}
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
