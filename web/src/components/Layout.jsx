import React from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import { useSearch } from "../search/search-context";

export default function Layout({ children }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useSearch();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };
  const onKeyPress = async (event) => {
    if (event.key === "Enter") {
      await router.push({
        pathname: "/search",
        query: { term: searchTerm },
      });
      event.target.blur();
      setSearchTerm("");
    }
  };

  return (
    <>
      <NavBar
        searchTerm={searchTerm}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
      {children}
    </>
  );
}
