import styled from 'styled-components';
import { Form } from '@unform/web';
import { colors } from '~/styles';

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 10px 22px 22px 22px;
  background: ${colors.background};
  border-radius: 4px;
`;
