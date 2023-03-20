import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Game from './pages/Game';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Game />,
      },
    ],
  },
]);

export default router;
