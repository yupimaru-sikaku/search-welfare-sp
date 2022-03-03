import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const usePromiseToast = () => {
  const [toastIsLoading, setToastIsLoading] = useState(false);

  const promiseToast = async (promise) => {
    setToastIsLoading(true);
    await toast.promise(promise, {
      loading: "処理中",
      success: "成功しました",
      error: (error) => {
        return error;
      },
    });
    setToastIsLoading(false);
  };

  return { promiseToast, toastIsLoading, Toaster };
};
