import * as React from "react";
import { Outlet } from "react-router-dom";


import Layout from "./components/Layout";

//// Others

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
