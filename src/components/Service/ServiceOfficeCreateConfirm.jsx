import React, { useState } from "react";
import { useRouter } from "next/router";
import { usePromiseToast } from "src/hooks/usePromiseToast";

export const ServiceOfficeCreateConfirm = (props) => {
  const router = useRouter();
  //propsで渡ってきたvaluesを受けとって入力内容確認画面で表示
  const { values, officeName } = props;

  // 新規作成 → toasterの処理
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    await promiseToast(createOfficeCompany());
  };
  const { promiseToast, Toaster } = usePromiseToast();

  const createOfficeCompany = async () => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/services/`, {
      method: "POST",
      body: JSON.stringify({
        office: router.query.id,
        officeNumber: values.officeNumber,
        serviceType: values.serviceType.value,
        capacity: Number(values.capacity),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        router.push(`/office/${router.query.id}`);
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
    <div className="">
      <h2 className="sm:text-lg py-10 text-center text-gray-500 font-bold mb-1 md:mb-0 pr-4">
        確認画面
      </h2>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            関連事業所
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={officeName}
            disabled
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            サービス種別
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={values.serviceType.value}
            disabled
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            事業所番号
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={values.officeNumber}
            disabled
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/5">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            定員
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={values.capacity}
            disabled
          />
        </div>
      </div>

      <div className="my-10 flex items-center justify-center">
        {isLoading ? (
          <div className="my-10 animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        ) : (
          <>
            <button
              type="submit"
              className="block mx-auto my-10 h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
              onClick={handleClick}
              disabled={isLoading}
            >
              新規作成
            </button>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};
