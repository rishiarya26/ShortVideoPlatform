export const numberFormatter = (num) => {
 let number =  typeof num === "number" ? num : typeof num === "string" ? Number(num) : null;
 if (number === null) return null;
 let formattedNumber = Math.abs(number) > 999 ? (Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'K') : Math.sign(number)*Math.abs(number)
  return formattedNumber;
  }