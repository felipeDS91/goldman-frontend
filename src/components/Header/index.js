import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import {
  IoIosStats,
  IoIosCash,
  IoMdStats,
  IoMdPerson,
  IoIosBrush,
  IoLogoBuffer,
  IoIosConstruct,
} from 'react-icons/io';
import { FaTruck } from 'react-icons/fa';
import { RiBillLine } from 'react-icons/ri';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-2.svg';
import { Container, Content, Profile } from './styles';
import NavMenu from '~/components/NavMenu';

const registrationMenu = [
  {
    Icon: IoIosCash,
    title: 'Tipos de pagamento',
    classNames: 'dropdown__item',
    href: '/list-payment-type',
  },
  {
    Icon: IoMdPerson,
    title: 'Usuários',
    classNames: 'dropdown__item',
    href: '/list-users',
  },
  {
    Icon: IoMdStats,
    title: 'Status',
    classNames: 'dropdown__item',
    href: '/list-status',
  },
  {
    Icon: IoLogoBuffer,
    title: 'Formatos externos',
    classNames: 'dropdown__item',
    href: '/list-finishings',
  },
  {
    Icon: IoIosConstruct,
    title: 'Materiais',
    classNames: 'dropdown__item',
    href: '/list-materials',
  },
  {
    Icon: IoIosBrush,
    title: 'Tonalidades',
    classNames: 'dropdown__item',
    href: '/list-colors',
  },
  {
    Icon: FaTruck,
    title: 'Transportadoras',
    classNames: 'dropdown__item',
    href: '/list-carriers',
  },
  {
    Icon: RiBillLine,
    title: 'Tipos de frete',
    classNames: 'dropdown__item',
    href: '/list-freight-types',
  },
];

const reportMenu = [
  {
    Icon: IoIosStats,
    title: 'Relação de pedidos',
    classNames: 'dropdown__item',
    href: '/report-order',
  },
];

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/home">
            <img src={logo} alt="GOLDMAN" width="135" height="34" />
          </NavLink>
          <NavLink to="/list-customers">CLIENTES</NavLink>
          <NavLink to="/list-orders">PEDIDOS</NavLink>
          <NavMenu menu={registrationMenu}>CADASTROS</NavMenu>
          <NavLink to="/company">CONFIGURAÇÕES</NavLink>
          <NavMenu menu={reportMenu}>RELATÓRIOS</NavMenu>
        </nav>

        <aside>
          <Profile>
            <div>
              <Link to="/change-password">
                <strong>{profile.name}</strong>
              </Link>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
