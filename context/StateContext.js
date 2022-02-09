import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectedCompany, setSelectedCompany] = useState({
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
  return (
    <StateContext.Provider
      value={{
        selectedCompany,
        setSelectedCompany,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
