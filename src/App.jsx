import { useState } from 'react';
import NavBar from "./components/NavBar"
import SideBar from "./components/Sidebar"
import Footer from "./components/Footer"

function getFilenames() {
  // this array should have three fields for each file (id (unique identifier for key), name (for 
  // displaying), path (for serverside navigation of markdown files))
  return {
    
  }
}

export default function App() {
  
  return (
    <>
      <NavBar />
      <SideBar file={getFilenames()}/>

      <Footer />
    </>
  );
}