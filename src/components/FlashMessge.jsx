export const FlashMessge = ({ isCopy }) => {
  return (
    <>
      {isCopy ? (
        <span className="text-white">
            Copied
        </span>
      ) : (
        <></>
      )}
    </>
  );
}
