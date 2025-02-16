import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      // Other routes will be added as we create the pages
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
}

export default App;
