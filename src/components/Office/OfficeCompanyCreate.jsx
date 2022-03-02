import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Element, scroller } from "react-scroll";
import { OfficeCompanyCreateConfirm } from "src/components/Office/OfficeCompanyCreateConfirm";
import { useFetch } from "src/hooks/useFetch";

export const OfficeCompanyCreate = () => {
  const router = useRouter();
  const { data: companyData, isLoading: companyIsLoading } = useFetch(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${router.query.id}`
      : null
  );
  //useFormを呼び出して使いたいメソッドを書く
  const { register, handleSubmit, formState, getValues } = useForm({
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
  const onSubmitData = (data) => {
    setIsConfirmationVisible(true);
  };

  return (
    <div className="px-5 py-20 bg-gray-600">
      <div className="max-w-2xl mx-auto bg-white rounded-lg px-5">
        <h2 className="sm:text-lg py-10 text-center text-gray-500 font-bold mb-1 md:mb-0 pr-4">
          事業所情報登録
        </h2>
        {/*onSubmit(入力フォームの送信ボタンがクリックされた時に発生するイベント)で入力された値をhandleSubmitで取り出す*/}
        <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col">
          <div className="md:flex md:items-center mb-6">
            {companyIsLoading ? (
              <>
                <div className="md:w-1/5">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    関連法人
                  </label>
                </div>
                <div className="md:w-2/3">
                  <div class="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                    <div class="animate-pulse flex">
                      <div class="flex-1 space-y-6">
                        <div class="h-1.5 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:w-1/5">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    関連法人
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    name="companyName"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={companyData.companyName}
                    disabled
                  />
                </div>
              </>
            )}
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                事業所名
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="officeName"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("officeName", { required: "必須です" })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors.officeName && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                例）グループホーム○○○
              </p>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                郵便番号
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="postalCode"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("postalCode", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
                maxLength={7}
              />
              {formState.errors?.postalCode?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.postalCode?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">半角数字のみです</p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                半角数字のみ、ハイフン無し
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                例）1234567
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                住所
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="address"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("address", { required: true })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors?.address?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                例）大阪府大阪市北区○○丁目○○番地○○号
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                電話番号
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="telephoneNumber"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                maxLength={11}
                {...register("telephoneNumber", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors?.telephoneNumber?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.telephoneNumber?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">
                  半角数字のみ、ハイフンは不要です
                </p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                半角数字のみ、ハイフン無し
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                例）09012345678
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                FAX
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="faxNumber"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                maxLength={11}
                {...register("faxNumber", {
                  pattern: /^[0-9]*$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors?.faxNumber?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.faxNumber?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">
                  半角数字のみ、ハイフンは不要です
                </p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                半角数字のみ、ハイフン無し
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                例）09012345678
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                メールアドレス
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="email"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors?.email?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              {formState.errors?.email?.types?.pattern && (
                <p className="text-xs mt-1 text-rose-500">
                  正しい表記にしてください
                </p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                例）company@gmail.com
              </p>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/5">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                代表者
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                name="humanName"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                {...register("humanName", { required: true })}
                onChange={() => setIsConfirmationVisible(false)}
              />
              {formState.errors?.humanName?.types?.required && (
                <p className="text-xs mt-1 text-rose-500">必須項目です</p>
              )}
              <p className="text-xs text-gray-700 dark:text-gray-700 mt-2">
                例）代表取締役　代表 太郎
              </p>
            </div>
          </div>

          <div className="btnBox">
            <button
              type="submit"
              className="block mx-auto my-10 h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
              // onClick={scrollToTarget}
            >
              入力内容を確認
            </button>
          </div>
        </form>
        {/* <Element name="scrollTarget" /> */}
        {isConfirmationVisible && ( //trueの時だけ入力内容確認画面を表示
          <OfficeCompanyCreateConfirm //入力内容確認画面コンポーネント
            values={getValues()} //getValues()でフォーム全体のデータを返してくれる！！
            hideConfirmation={hideConfirmation} //入力内容確認画面表示・非表示のstateをConfirmationに渡す
            companyName={companyData.companyName}
          />
        )}
      </div>
    </div>
  );
};
