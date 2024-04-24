import ReactDOM from "react-dom";
import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Legal from "./pages/Legal";
import Win from "./pages/Win";
import Lose from "./pages/Lose";
import NoPage from "./pages/NoPage";
import Play from "./pages/Play";
import "./index.css";



// import { collection, orderBy, query } from 'firebase/firestore'
// import { db } from './firebase-config'



export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index="home" element={<Home />} />
          <Route path="/form" element={<Form />} Component={Form}/>
          <Route path="/legal" element={<Legal />} />
          <Route path="/play" element={<Play />} />
          <Route path="/win" element={<Win />} />
          <Route path="/lose" element={<Lose />} />
        </Route>
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));