import React from "react";
import ThemeToggle from "../componenrs/Theme/ThemeToggle";

function Layout({ children }) {
  return (
    <>
      <header>
      <ThemeToggle />

      </header>
      {children}
      <footer>
        
      </footer>
    </>
  );
}

export default Layout;
