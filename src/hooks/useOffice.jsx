import useSWR from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  const json = await res.json();
  return json;
};

export const useOfficeCompany = ({ companyId }) => {
  const { data: officeList, error: officeListError } = useSWR(
    companyId
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office-company/?company=${companyId}`
      : null
  );
  return {
    officeList,
    officeListError,
  };
};
