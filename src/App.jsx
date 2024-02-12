import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Playground from './pages/playground/playground'
import Gemini from './pages/gemini/gemini'
import './App.css'

function App() {
  const Layout = () => {
    return (
      //<div className="app">
          // <Navbar />
          <Outlet />
          // <Footer />
      //</div>
  ) ;
  };

  const router = createBrowserRouter([
    {

      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Playground />,//from Playgroud to homepage "a changer" 🙂🪄
        },
        {
          path: "/Playground",
          element: <Playground />,
        },
        {
          path: "/ChatBot",
          element: <Gemini />,
        },
        
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
