export async function searchOfficeData(officeName) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-office/?officeName=${officeName}`
    )
  );
  const searchedOfficeList = await res.json();
  return searchedOfficeList;
}
