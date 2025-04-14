function storePressedButton(button, buttonClass){
    let stored;

    if(buttonClass === 'action' || buttonClass === 'operator'){
        stored = button.id;
    }
    
    if(buttonClass === 'number'){
        stored = button.innerText;
    }

    return stored;
}

function storeOperand(typed){
    let operand;

    try {
        operand = parseFloat(typed.innerText);
    } catch (error) {
        console.log(error);
        operand = 0;
    }

    return operand;
}

function updateDisplay(value, whichDisplay){
    whichDisplay.innerText = value;
}

function appendPressedButtonToTyped(buttonContent){
    const typed = document.getElementById('typed');
    typed.innerText += buttonContent;
    updateDisplay(typed.innerText);
}

function calculate(firstOperand, secondOperand, operator){
    let result;

    if(operator === '+'){
        result = firstOperand + secondOperand;
    }

    if(operator === '-'){
        result = firstOperand - secondOperand;
    }

    if(operator === '*'){
        result = firstOperand * secondOperand;
    }

    if(operator === '/'){
        result = firstOperand / secondOperand;
    }

    if(operator === '^'){
        result = Math.pow(firstOperand, secondOperand);
    }

    if(operator === '√'){
        result = Math.sqrt(firstOperand);
    }

    if(operator === '%'){
        result = (firstOperand / 100) * secondOperand;
    }
    
    if(operator === '='){
        if(firstOperand === secondOperand){
            result = 'true';
        } else {
            result = 'false';
        }
    }

    return result;
}

function numberSignalInverter(number){
    if(number > 0){
        return -number;
    } else {
        return Math.abs(number);
    }
}

function insertFloatingPoint (typed) {

    try {
        if(!typed.innerText.includes(',')){
            typed.innerText += ',';
        }
        updateDisplay(typed.innerText);
    } catch (error) {
        console.log(error);
    }
}

function isCalculationValid(typed, display){

    if(typed.innerText.length > 0){
        return true;
    } else {
        display.innerText = 'Erro';
        return false;
    }
}


function createUnityForHistory(typed, display){
    const unity =document.createElement('p');
    unity.innerText = `${typed.innerText} = ${display.innerText}`;
    appendUnityToHistory(unity);
}

function appendUnityToHistory(unity){
    const history = document.getElementById('history-list');
    const newLi = document.createElement('li');

    history.appendChild(newLi);
    newLi.appendChild(unity);
}

function clearHistory(){
    const history = document.getElementById('history-list');
    history.innerHTML = '';
}

function clearTyped(){
    const typed = document.getElementById('typed');
    typed.innerText = '';
}

function clearDisplay(){
    const display = document.getElementById('display');
    display.innerText = '';
}

function backspace(typed){
    typed.innerText = typed.innerText.slice(0, -1);
    updateDisplay(typed.innerText, typed);
}

function showErrorMessage (dsplay){
    dsplay.innerText = 'Erro';

    setTimeout(() => {
        dsplay.innerText = '';
    }, 2000);
}

function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
}

function saveTheme(theme){
    localStorage.setItem('theme', theme);
}

function getSavedTheme(){
    return localStorage.getItem('theme');
}