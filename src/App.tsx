import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import Works from './pages/Works.tsx';
import News from './pages/News.tsx';
import Careers from './pages/Careers.tsx';
import Contact from './pages/Contact.tsx';
import Blog from './pages/Blog.tsx';
import FAQ from './pages/FAQ.tsx';
import Legal from './pages/Legal.tsx';

const router = createBrowserRouter([
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
