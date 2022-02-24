import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/contact/:id' element={<Contact />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
      </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;
