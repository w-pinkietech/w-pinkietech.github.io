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

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/works', element: <Works /> },
      { path: '/news', element: <News /> },
      { path: '/careers', element: <Careers /> },
      { path: '/contact', element: <Contact /> },
      { path: '/blog', element: <Blog /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/legal', element: <Legal /> },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
}

export default App;
