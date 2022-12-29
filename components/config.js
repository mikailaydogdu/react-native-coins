export const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export const priceColor = (change) => {
  return change > 0 ? "#1AFF92" : "red"
}

