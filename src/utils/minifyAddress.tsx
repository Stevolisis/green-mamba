
export const minifyAddress = (address:string): string => {
  const firstFive = address.slice(0,4);
  const lastFive = address.slice(address.length - 5, address.length);
  
  return `${firstFive}...${lastFive}`
}
