import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Edit from './Edit';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/create" element={<Create />}></Route>
      <Route exact path="/update/:id" element={<Edit />}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
