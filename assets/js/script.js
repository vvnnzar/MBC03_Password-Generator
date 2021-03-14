//Identify HTLM id elements. Create as global scope variables. 
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');


//Connect password length slider and number fields for alignment of data entered by user
const slider = document.getElementById('range')
const number = document.getElementById('length')

slider.addEventListener('input', syncPasswordLength)
number.addEventListener('input', syncPasswordLength)

function syncPasswordLength(e) {
    const value = e.target.value
    slider.value = value
    number.value = value
}


/*Create functions to generate random sequence based on user check of items to include in password generation
Uses string from char character codes reference: https://petefreitag.com/cheatsheets/ascii-codes/
Use Math.floor to round down value:*/

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Reference for below listed symbols (https://www.owasp.org/index.php/Password_special_characters) 
function getRandomSymbol() {
    const symbols = '!"#$%&()*+,-./:;<=>?@[\]^_`{|}~'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//Create an object to group password input functions: 
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


//Add event listener to user input fields 
generate.addEventListener('click', function () {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


//Create function to generate password based on user selection
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);


    // Generate alert if user has not checked at least one of the 'include' character options
    if (typesCount === 0) {
        alert('You must select at least one option to include in password generation');
        return "";
    }


    // Create a for loop to generate random password based on user inputs
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    //Slice additional character to align with user defined length
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}
