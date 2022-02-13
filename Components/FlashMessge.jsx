export function FlashMessge({ isCopy }) {
  return (
    <>
      {isCopy ? (
        <div className="text-white">
            Copied
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
