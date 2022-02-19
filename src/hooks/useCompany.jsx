import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export const useCompanyList = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company/`
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isEmpty: data && !data.length,
  };
};

export const useCompany = () => {
  const router = useRouter();
  const { data: company, error: companyError } = useSWR(
    router.query.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${router.query.id}`
      : null
  );

  const { data: officeList, error: officeListError } = useSWR(
    company?.id
      ? `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office-company/?office=${company.id}`
      : null
  );

  return {
    company,
    officeList,
    error: companyError || officeListError,
    isLoading: !officeList && !officeListError,
  };
};
