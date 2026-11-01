import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({
  children,
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  knownTypes,
  onSearchSubmit,
}) {
  return (
    <div className="app-container">
      <Nav
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        knownTypes={knownTypes}
        onSearchSubmit={onSearchSubmit}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}