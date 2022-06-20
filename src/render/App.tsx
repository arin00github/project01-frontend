import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashobardIndex from "./pages/dashboard";
import DataTableIndex from "./pages/data-table";
import GisIndex from "./pages/gis";
import NotFount from "./pages/not-fount";
import { Layout } from "./pages/layout";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<DashobardIndex />} />
            <Route path="/gis-monitoring" element={<GisIndex />} />
            <Route path="/data-monitoring" element={<DataTableIndex />} />
            <Route path="*" element={<NotFount />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
