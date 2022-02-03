import MD5 from "crypto-js/md5";

// Formats string into a proper title
export const parseString = (string) => {
  let parsedField = (string + '').charAt(0).toUpperCase() + string.slice(1) // Capitalize first letter
  return parsedField = parsedField.split(/(?=[A-Z])/).join(' ') // Split string at capitals
}

// formats phone number strings to (xxx) yyy-zzzz
export const formatPhone = (string) => {
  if(string){
    let newString = string.replace(/[. ]+/g, " ").trim();
    let formattedPhone = `(${newString.slice(0,3)}) ${newString.slice(3,7)} -${newString.slice(7)}`;
    return formattedPhone;
  }
  
}

// For Gravatar
export const hashString = (string) => {
  return MD5(string.trim().toLowerCase()).toString()
}