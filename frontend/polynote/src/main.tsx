import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import { EditorPage } from './pages/editor';
import { Home } from './pages/home';
import { LoginPage } from './pages/login';
import { ManifestoPage } from './pages/manifesto';
import { SignupPage } from './pages/signup';
import { Tos } from './pages/tos';
import { ValidateEmail } from './pages/validateEmail';
import { ValidationRequired } from './pages/validationRequired';

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
    path: '/editor/:documentId',
    element: <EditorPage />,
  },
  {
    path: '/tos',
    element: <Tos />,
  },
  {
    path: '/validate',
    element: <ValidationRequired />,
  },
  {
    path: '/validate/:emailValidationId',
    element: <ValidateEmail />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
