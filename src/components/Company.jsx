import Link from "next/link";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const Company = ({ company, companyDeleted }) => {
  const deleteCompany = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/companies/${company.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("削除出来ませんでした");
      }
    });
    companyDeleted();
  };
  return (
    <div className="flex justify-around">
      <Link href={`/companies/${company.id}`}>
        <div className="cursor-pointer">
          <span>{company.id}-</span>
          <span>{company.companyName}</span>
        </div>
      </Link>
      <svg
        onClick={deleteCompany}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <svg
        onClick={() => setSelectedCompany(company)}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </div>
  );
};
