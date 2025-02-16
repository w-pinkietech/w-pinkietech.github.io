import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Workflow, Bot, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
