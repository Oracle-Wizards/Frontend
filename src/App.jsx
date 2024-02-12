import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Playground from './pages/playground/playground'
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
          path: "/",
          element: <Playground />,
        },
        {
          path:"/query",
          element: <Query/>,
        },
        {
          path:"/home",
          element: <Home/>,
        }
        
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
