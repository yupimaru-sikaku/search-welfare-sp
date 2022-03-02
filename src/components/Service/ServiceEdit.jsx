import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "src/hooks/useFetch";
import Cookie from "universal-cookie";
import Select from "react-select";
import { serviceList } from "src/items/serviceList";

const cookie = new Cookie();

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

  const handleUpdate = async () => {
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
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("再度ログインしてください");
      }
    });
    router.push("/office");
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
                          事業所番号
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="z-0 w-full group">
                        <input
                          type="text"
                          name="officeNumber"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={officeNumber}
                          onChange={(e) => setOfficeNumber(e.target.value)}
                          maxLength={7}
                          required
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
                          type="text"
                          name="capacity"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          value={capacity}
                          onChange={(e) => setCapacity(e.target.value)}
                          maxLength={7}
                          required
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
    </section>
  );
};
