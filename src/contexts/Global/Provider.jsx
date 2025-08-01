import GlobalContext from "./Context";
import useGettersAndSetters from "./useGettersAndSetters";

export default function GlobalContextProvider({ children }) {
  return (
    <GlobalContext.Provider value={useGettersAndSetters()}>
      {children}
    </GlobalContext.Provider>
  );
}
