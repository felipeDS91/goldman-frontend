import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegSadCry } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import logo from '~/assets/logo.svg';

import { Container } from './styles';

function PageNotFound() {
  return (
    <Container>
      <img src={logo} alt="Página não encontrada" width="800" height="200" />
      <div>
        <strong>Erro 404</strong>
      </div>
      <br />
      <div>
        <span>Página não encontrada</span>
        <FaRegSadCry size={26} color="##444" />
      </div>
      <Link to="/home">
        <FiHome size={18} color="##444" />
        Ir para Home
      </Link>
    </Container>
  );
}

export default PageNotFound;
