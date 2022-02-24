export async function searchCompanyData(companyName) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company/?companyName=${companyName}`
    )
  );
  const searchedCompanyList = await res.json();
  return searchedCompanyList;
}
