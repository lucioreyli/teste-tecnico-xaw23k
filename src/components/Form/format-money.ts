const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
});

const numberRegex = /\D/g;

export const formatMoney = (value: string): string => {
  value = value.replace('.', '').replace(',', '').replace(numberRegex, '');

  const result = moneyFormatter.format(Number(value) / 100);

  return 'R$ ' + result;
};
