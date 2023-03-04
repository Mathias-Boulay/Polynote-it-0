import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { EditorPage } from './pages/editor';
import { LoginPage } from './pages/login';
import { ManifestoPage } from './pages/manifesto';
import { SignupPage } from './pages/signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ManifestoPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/editor',
    element: <EditorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
