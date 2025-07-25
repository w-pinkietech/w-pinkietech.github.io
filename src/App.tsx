import { type FC } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import { FontSizeProvider } from './contexts/FontSizeContext';

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
  return (
    <FontSizeProvider>
      <RouterProvider router={router} />
    </FontSizeProvider>
  );
}

export default App;
