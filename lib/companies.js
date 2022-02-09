export async function getAllCompanyData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-company`)
  );
  const comapnies = await res.json();
  const staticfilterdCompanies = comapnies.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return staticfilterdCompanies;
}

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
