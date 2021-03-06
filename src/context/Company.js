import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { formatCNPJ } from '~/util/format';

import api from '~/services/api';

const CompanyContext = createContext();

export default function CompanyProvider({ children }) {
  const [company, setCompany] = useState({});
  const signed = useSelector(state => state.auth.signed);

  const loadCompany = useCallback(async () => {
    if (!signed) return;

    const { data } = await api.get('/company');

    setCompany({
      ...data,
      cnpj: formatCNPJ(data.cnpj),
      logo_url: data.logo_name
        ? `${process.env.REACT_APP_API_URL}files/${data.logo_name}`
        : 'https://res.cloudinary.com/dixtjpk8s/image/upload/v1601900815/Goldman/logo-2__rfeaal.svg',
    });
  }, [signed]);

  useEffect(() => {
    loadCompany();
  }, [loadCompany, signed]);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context)
    throw new Error('useCompany must be used within a CompanyProvider');
  const { company, setCompany } = context;
  return { company, setCompany };
}

CompanyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
