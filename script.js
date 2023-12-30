const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = '';
let passwordLength = 10;
let checkCount = 1;

handleSlider();

// set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

function generateRandomLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 122));
}

function generateRandomUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 90));
}

function generateSymbol() {
    return symbols.charAt(getRandomInteger(0, symbols.length - 1));
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNum = true;
    }
    if (symbolsCheck.checked) {
        hasSym = true;
    }

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => copyMsg.classList.remove('active'), 3000);
}

inputSlider.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

generateBtn.addEventListener('click', () => {
    // remove old password
    password = '';

    let arr = [];

    if (uppercaseCheck.checked) {
        arr.push(1);
    }
    if (lowercaseCheck.checked) {
        arr.push(2);
    }
    if (numbersCheck.checked) {
        arr.push(3);
    }
    if (symbolsCheck.checked) {
        arr.push(4);
    }

    if (arr.length === 0) {
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomNum = getRandomInteger(0, arr.length - 1);
        switch (arr[randomNum]) {
            case 1:
                password += generateRandomUpperCase();
                break;
            case 2:
                password += generateRandomLowerCase();
                break;
            case 3:
                password += generateRandomNumber();
                break;
            case 4:
                password += generateSymbol();
                break;

            default:
                break;
        }
    }


    passwordDisplay.value = password;
    calcStrength();

});
