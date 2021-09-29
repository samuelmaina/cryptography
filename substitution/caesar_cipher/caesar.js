//ascii character codes ranges.
const upperlimit = 126;
const lowerlimit = 32;

exports.encryptString = (string, interval) => {
  ensureAreParamsValid(string, interval);
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

exports.decryptString = (cipherText, interval) => {
  ensureAreParamsValid(cipherText, interval);
  const len = cipherText.length;
  let result = "";
  let charCode;
  for (let i = 0; i < len; i++) {
    charCode = cipherText.charCodeAt(i);
    const decrypted = decryptChar(charCode, interval);
    result += String.fromCharCode(decrypted);
  }
  return result;
};

function encryptChar(charCode, interval) {
  let remainder = (charCode + interval) % upperlimit;
  return sanitizer(remainder);
}

function decryptChar(charCode, interval) {
  let remainder = (charCode - interval) % upperlimit;
  if (remainder < lowerlimit) {
    return upperlimit - (lowerlimit - (1 + remainder));
  }
  return remainder;
}

function sanitizer(remainder) {
  if (remainder < lowerlimit) return remainder + lowerlimit - 1;
  return remainder;
}

function ensureAreParamsValid(string, interval) {
  if (
    !(
      typeof string === "string" &&
      string.length > 0 &&
      Number.isInteger(interval) &&
      interval > 1
    )
  ) {
    throw new Error(
      "Must be supplied with a string as text to encrypt and a numeric interval."
    );
  }
}
