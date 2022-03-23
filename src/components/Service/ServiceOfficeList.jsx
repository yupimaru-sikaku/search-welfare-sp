import { useFetch } from "src/hooks/useFetch";
import { useFetchArray } from "src/hooks/useFetchArray";
import { useRouter } from "next/router";
import { ClipBoard } from "src/components/ClipBoard";
import Link from "next/link";
import { useCallback, useState } from "react";
import { usePromiseToast } from "src/hooks/usePromiseToast";

export const ServiceOfficeList = ({ officeId }) => {
  // サービス情報データ取得
  const router = useRouter();
  const {
    data: serviceListData,
    error: serviceError,
    isEmpty: serviceIsEmpty,
    isLoading: serviceIsLoading,
    mutate,
  } = useFetchArray(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service-office/?office=${router.query.id}`
      : null
  );

  // 削除確認画面
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    await promiseToast(handleDelete());
  };
  const { promiseToast, Toaster } = usePromiseToast();

  const handleOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/services/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        router.push(`/office/${router.query.id}`);
        setShowModal(false);
        setIsLoading(false);
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

  if (serviceError) {
    return <div>エラーが発生したため、データの取得に失敗しました</div>;
  }
  return (
    <div className="px-5">
      {serviceIsLoading ? (
        <div className="text-white">読み込み中</div>
      ) : serviceIsEmpty ? (
        <div className="text-white text-center m-10">サービスはありません</div>
      ) : (
        <div>
          {serviceListData.map((service) => {
            return (
              <div
                key={service.id}
                className="w-full max-w-2xl mt-10 mx-auto bg-green-100 shadow-lg rounded-xl border border-gray-200"
              >
                <header className="flex px-5 py-4 border-b border-gray-100">
                  <h2 className="mr-5 font-semibold text-gray-800">
                    {service.serviceType}
                  </h2>
                  <ClipBoard copyWord={service.serviceType} />
                  <Link href={`/service/${service.id}/edit`} passHref>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="block h-6 w-6 ml-5 text-blue-500 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-5 text-gray-500 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => {
                      handleOpen();
                      setDeleteId(service.id);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <tbody className="text-sm divide-y divide-gray-100">
                        <tr>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                事業者番号
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {service.officeNumber}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              <ClipBoard copyWord={service.officeNumber} />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                定員
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{service.capacity}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              <ClipBoard copyWord={service.capacity} />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl">確認画面</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-sm leading-relaxed">
                    本当に削除しますか？
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    閉じる
                  </button>
                  {isLoading ? (
                    <div className="mx-10 animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                  ) : (
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClick}
                    >
                      削除する
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Toaster />
    </div>
  );
};
