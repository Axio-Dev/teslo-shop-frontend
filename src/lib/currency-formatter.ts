export const currencyFormatter = (amount: number) => {
  return amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'MXN',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
  });
};
