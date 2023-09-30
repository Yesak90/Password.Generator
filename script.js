const resultEl = document.querySelector(".result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value; // + sign converts string to number
  const hasLower = lowercaseEl.checked; // true or false
  const hasUpper = uppercaseEl.checked; // true or false
  const hasNumber = numbersEl.checked; // true or false
  const hasSymbol = symbolsEl.checked; // true or false

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol; // true = 1, false = 0
  // console.log('typesCount: ', typesCount);
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // console.log('typesArr: ', typesArr);
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0]; // lower, upper, number, symbol
      // console.log('funcName: ', funcName);
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 97 stands for 'a' in ASCII
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // 65 stands for 'A' in ASCII
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 48 stands for '0' in ASCII
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomSymbol(), getRandomNumber(), getRandomUpper(), getRandomLower());
