import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './modules/Home';
import Pokemon from './modules/components/Pokemon';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/pokemon/:name" element={<Pokemon></Pokemon>} />
      </Routes>
    </Router>
  );
}

export default App;
