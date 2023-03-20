import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import './index.css';

function Main() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Main; 
