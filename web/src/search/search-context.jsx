import * as React from "react";

const SearchContext = React.createContext();

function useSearch() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error(`useCount must be used within a SearchProvider`);
  }
  return context;
}

function SearchProvider(props) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const value = React.useMemo(() => [searchTerm, setSearchTerm], [searchTerm]);
  return <SearchContext.Provider value={value} {...props} />;
}

export { SearchProvider, useSearch };
