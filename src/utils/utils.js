
/**
 * Returns a formatted number with comma 
 * @param {(number|string)} number 
 */
export const formatNumber = (number) => {
  number = number.toString().split('').reverse()
  number = number.map((n, index) => (index+1)%3 === 0 ? `,${n}` : n)
  number = number.reverse().join('')
  return number.indexOf(',') === 0 ? number.substring(1) : number
}