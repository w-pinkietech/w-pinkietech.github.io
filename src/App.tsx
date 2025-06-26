import { type FC } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import Legal from './pages/Legal';
import News from './pages/News';
import Services from './pages/Services';
import Works from './pages/Works';

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
