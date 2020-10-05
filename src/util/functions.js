import ptBR from 'date-fns/locale/pt-BR';

export function getAllMonths() {
  const months = [];
  let i = 0;
  for (i = 0; i < 12; i += 1) {
    months.push({ number: i + 1, name: ptBR.localize.month(i) });
  }
  return months;
}
