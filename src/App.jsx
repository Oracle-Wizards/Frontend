// import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Playground from './pages/playground/playground'
import Gemini from './pages/gemini/gemini'
import './App.css'
import Query from './pages/query/Query';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/home/Home';

function App() {
  const Layout = () => {
    return (
      <ChakraProvider>
    
          <Outlet />
        
      </ChakraProvider>
  ) ;
  };

  const router = createBrowserRouter([
    {

      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/playground",
          element: <Playground />,//from Playgroud to homepage "a changer" 🙂🪄
        },
         
        {
          path:"/query",
          element: <Query/>,
        },
        {
          path:"/",
          element: <Home/>,
        },{
          
          path: "/ChatBot",
          element: <Gemini />,
        }
        
        
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
