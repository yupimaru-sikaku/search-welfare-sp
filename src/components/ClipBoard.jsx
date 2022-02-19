import { useCallback, useState } from "react";
import { FlashMessge } from "src/components/FlashMessge";

export const ClipBoard = ({ copyWord }) => {
  const [isCopy, setIsCopy] = useState(false);
  const copy = useCallback(async (copyWord) => {
    try {
      await navigator.clipboard.writeText(copyWord);
      setIsCopy((isCopy) => !isCopy);
      setTimeout(function () {
        setIsCopy((isCopy) => !isCopy);
      }, 500);
    } catch (error) {
      alert((error && error.message) || "コピーに失敗しました");
    }
  }, []);

  return (
    <div className="relative">
      <svg
        onClick={() => copy(copyWord)}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500 m-auto cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      {isCopy && <FlashMessge isCopy={isCopy} />}
    </div>
  );
}
