export const FlashMessge = ({ isCopy }) => {
  return (
    <>
      {isCopy ? (
        <span className="absolute text-xs top-0 right-12 bg-gray-100 rounded-md p-1">
            Copied
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
