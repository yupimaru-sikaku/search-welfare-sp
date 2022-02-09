import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const CompanyForm = ({ companyCreated }) => {
  const { selectedCompany, setSelectedCompany } = useContext(StateContext);

  let a = Math.random().toString(32).substring(2)
  
  const create = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/companies/`, {
      method: "POST",
      body: JSON.stringify({
        companyName: selectedCompany.companyName,
        companyNumber: a,
        postalCode: "1",
        address: "1",
        telephoneNumber: "1",
        faxNumber: "1",
        email: `yukiharu.nagao@gmail.com${a}`,
        humanName: "1",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert("新規作成出来ませんでした");
      }
    });
    setSelectedCompany({ id: 0, companyName: "" });
    companyCreated();
  };

  const update = async (e) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/companies/${selectedCompany.id}/`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...selectedCompany,
          companyName: selectedCompany.companyName,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        alert("更新出来ませんでした");
      }
    });
    setSelectedCompany({
      id: 0,
      companyName: "",
      companyNumber: "",
      postalCode: "",
      address: "",
      telephoneNumber: "",
      faxNumber: "",
      email: "",
      humanName: "",
    });
    companyCreated();
  };

  return (
    <div>
      <form onSubmit={selectedCompany.id !== 0 ? update : create}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedCompany.companyName}
          onChange={(e) =>
            setSelectedCompany({
              ...selectedCompany,
              companyName: e.target.value,
            })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedCompany.id !== 0 ? "更新する" : "作成する"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
