import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Playground from './pages/playground/playground'
import './App.css'
import Query from './pages/query/Query';

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
          element: <Playground />,
        },
        {
          path:"/query",
          element: <Query/>,
        }
        
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
