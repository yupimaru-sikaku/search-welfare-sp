export async function getAllCompanyIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`)
  );
  const comanies = await res.json();

  return comanies.map((company) => {
    return {
      params: {
        id: String(company.id),
      },
    };
  });
}

export async function getCompanyData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-company/${id}`)
  );
  const company = await res.json();
  return company;
}

export async function getOfficeCompanyListData(id) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-office-company/?company=${id}`
    )
  );
  const officeList = await res.json();
  return officeList;
}

export async function searchCompanyData(companyName) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company/?companyName=${companyName}`
    )
  );
  const searchedCompanyList = await res.json();
  return searchedCompanyList;
}

export async function getServiceOfficeListData(id) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-service-office/?office=${id}`
    )
  );
  const serviceList = await res.json();
  return serviceList;
}
