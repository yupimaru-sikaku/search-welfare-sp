import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Element, scroller } from "react-scroll";
import { useFetch } from "src/hooks/useFetch";
import Select from "react-select";
import { serviceList } from "src/items/serviceList";
import { ServiceOfficeCreateConfirm } from "src/components/Service/ServiceOfficeCreateConfirm";

export const ServiceOfficeCreate = () => {
  const router = useRouter();
  const SERVICE_LIST = serviceList;

  const { data: officeData, isLoading: officeIsLoading } = useFetch(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office/${router.query.id}`
      : null
  );
  //useFormを呼び出して使いたいメソッドを書く
  const { register, handleSubmit, formState, getValues, control } = useForm({
    // リアルタイムでエラーを表示
    mode: "onChange",
    // エラーを何個返すか
    criteriaMode: "all",
  });
  //isConfirmationVisibleにstateを持たせて、入力内容確認画面の表示・非表示をコントロール、初期値はfalseで非表示
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  //入力内容確認画面の閉じるボタンを押した時非表示にする関数を宣言
  const hideConfirmation = () => setIsConfirmationVisible(false);
  //submitボタンを押した時、入力内容確認画面を表示させる
  const onSubmitData = async (data) => {
    const duplicateFlag = await checkDuplicate(data.officeNumber);
    setOfficeNumberIsDuplicate(false);
    if (duplicateFlag) {
      setOfficeNumberIsDuplicate(true);
      return;
    }
    setIsConfirmationVisible(true);
  };

  const checkDuplicate = async (officeNumber) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-service/?officeNumber=${officeNumber}`
    );
    const data = await res.json();
    return data.length ? true : false;
  };
  const [officeNumberIsDuplicate, setOfficeNumberIsDuplicate] = useState(false);

  return (
    <div className="px-5 py-20 bg-gray-600">
      <div className="max-w-2xl mx-auto bg-white rounded-lg px-5">
        <h2 className="sm:text-lg py-10 text-center text-gray-500 font-bold mb-1 md:mb-0 pr-4">
          サービス情報登録
        </h2>
        {/*onSubmit(入力フォームの送信ボタンがクリックされた時に発生するイベント)で入力された値をhandleSubmitで取り出す*/}
        <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col">
          <div className="md:flex md:items-center mb-6">
            {officeIsLoading ? (
              <>
                <div className="flex md:w-1/5 md:block">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    関連事業所
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                    <div className="animate-pulse flex">
                      <div className="flex-1 space-y-6">
                        <div className="h-1.5 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex md:w-1/5 md:block">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    関連事業所
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    name="officeName"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={officeData.officeName}
                    disabled
                  />
                </div>
              </>
            )}
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="flex md:w-1/5 md:block">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                サービス種別
              </label>
              <label className="block text-green-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                必須
              </label>
            </div>
            <div className="md:w-2/3">
              <Controller
                control={control}
                name="serviceType"
                rules={{
                  required: true,
                  onChange: () => setIsConfirmationVisible(false),
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    options={SERVICE_LIST}
                    instanceId="selectbox"
                    name={name}
                    onChange={onChange}
                  />
                )}
              />
              {formState.errors?.serviceType?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="flex md:w-1/5 md:block">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                事業所番号
              </label>
              <label className="block text-green-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                必須
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="officeNumber"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("officeNumber", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
                maxLength={11}
              />
              {formState.errors?.officeNumber?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.officeNumber?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">半角数字のみです</p>
              )}
              {officeNumberIsDuplicate && (
                <p className="text-xs mt-1 text-rose-500">
                  既にデータが存在しています
                </p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                半角数字のみ
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                例）27203000000
              </p>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="flex md:w-1/5 md:block">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                定員
              </label>
              <label className="block text-green-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                必須
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="capacity"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("capacity", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
                maxLength={2}
              />
              {formState.errors?.capacity?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.capacity?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">半角数字のみです</p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                半角数字のみ
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">例）4</p>
            </div>
          </div>

          <div className="btnBox">
            <button
              type="submit"
              className="block mx-auto my-10 h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
              // onClick={confirmDuplicate}
            >
              入力内容を確認
            </button>
          </div>
        </form>
        {/* <Element name="scrollTarget" /> */}
        {isConfirmationVisible && ( //trueの時だけ入力内容確認画面を表示
          <ServiceOfficeCreateConfirm //入力内容確認画面コンポーネント
            values={getValues()} //getValues()でフォーム全体のデータを返してくれる！！
            formState={formState}
            hideConfirmation={hideConfirmation} //入力内容確認画面表示・非表示のstateをConfirmationに渡す
            officeName={officeData.officeName}
          />
        )}
      </div>
    </div>
  );
};
