import "src/styles/globals.css";
import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  const json = await res.json();
  return json;
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
