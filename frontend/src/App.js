import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Create from './Create';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/create" element={<Create />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
