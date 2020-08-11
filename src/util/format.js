import { format } from 'date-fns';

export function unformat(value) {
  return value.replace(/[. \-*+?^${}()|/[\]\\]/g, '');
}

export function formatCPF(value) {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatCNPJ(value) {
  return value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
}

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatDate(value) {
  const date = new Date(value);
  return Number(date.getTime()) ? format(new Date(value), 'dd/MM/yyyy') : '';
}

export function formatDateTime(value) {
  const date = new Date(value);
  return Number(date.getTime())
    ? format(new Date(value), 'dd/MM/yyyy HH:mm')
    : '';
}
