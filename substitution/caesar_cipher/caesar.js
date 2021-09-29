//ascii character codes ranges.
const upperlimit = 126;
const lowerlimit = 32;

exports.encryptString = (string, interval) => {
  const len = string.length;
  let result = "";
  let charCode;
  for (let i = 0; i < len; i++) {
    charCode = string.charCodeAt(i);
    const encyptedChar = encryptChar(charCode, interval);
    result += String.fromCharCode(encyptedChar);
  }
  return result;
};

function encryptChar(charCode, interval) {
  let remainder = (charCode + interval) % upperlimit;
  if (remainder < lowerlimit) return remainder + lowerlimit;
  return remainder;
}
