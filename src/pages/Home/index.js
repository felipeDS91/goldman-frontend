import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

export default function Home() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <div>
        Bem vindo, <strong>{profile.name}</strong>
      </div>
    </Container>
  );
}
