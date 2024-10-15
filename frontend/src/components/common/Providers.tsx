import { Provider as JotaiProvider } from "jotai";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default Providers;
