import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashobardIndex from "./pages/dashboard";
import DataTableIndex from "./pages/data-table";
import GisIndex from "./pages/gis";
import GisIndex2 from "./pages/gis2";
import NotFount from "./pages/not-fount";
import { Layout } from "./pages/layout";
import WorldMapIndex from "./pages/world";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<DataTableIndex />} />
            <Route path="/dashboard" element={<DashobardIndex />} />
            <Route path="/gis-monitoring" element={<GisIndex />} />
            <Route path="/gis-monitoring2" element={<GisIndex2 />} />
            <Route path="/data-list" element={<DataTableIndex />} />
            <Route path="/world-map" element={<WorldMapIndex />} />
            <Route path="*" element={<NotFount />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
