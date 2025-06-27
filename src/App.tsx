import { type FC } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

// All pages now use the same CLI interface
const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      // Remove other routes - everything is handled through CLI now
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
}

export default App;
