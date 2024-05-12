import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./modules/Home";
import Pokemon from "./modules/components/Pokemon";
import Type from "./modules/Type";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/page/1" replace />} />
        <Route exact path="/page/:page" element={<Home></Home>} />
        <Route exact path="/pokemon/:name" element={<Pokemon></Pokemon>} />
        <Route exact path="/pokemon/type/:type" element={<Type></Type>} />
      </Routes>
    </Router>
  );
}

export default App;
