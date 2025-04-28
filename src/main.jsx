import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import UserProvider from "./context/UserContext.jsx";
import Layout from "./Layout/Layout.jsx";
import DeleteGroupUsersProvider from "./context/DeleteGroupUsersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeleteGroupUsersProvider>
      <UserProvider>
        <Layout>
          <App />
        </Layout>
      </UserProvider>
    </DeleteGroupUsersProvider>
  </StrictMode>
);
