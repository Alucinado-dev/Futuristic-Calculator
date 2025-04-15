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
    updateDisplay(typed.innerText, typed);
}

function calculate(firstOperand, secondOperand, operator){
    let result = null;

    if(operator === 'plus'){
        result = firstOperand + secondOperand;
    }

    if(operator === 'minus'){
        result = firstOperand - secondOperand;
    }

    if(operator === 'times'){
        result = firstOperand * secondOperand;
    }

    if(operator === 'divide'){
        result = firstOperand / secondOperand;
    }

    if(operator === 'power'){
        result = Math.pow(firstOperand, secondOperand);
    }

    if(operator === 'sqrt'){
        result = Math.sqrt(firstOperand);
    }

    if(operator === 'percent'){
        result = (firstOperand / 100) * secondOperand;
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

function clearElement(element){
    element.innerText = '';
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

function makeAction(typed, result, action){
    try {
        if(action){
            if(action === 'clear'){
                clearElement(typed);
                clearElement(result);
                const history = document.getElementById('history-list');
                clearElement(history);
            }
    
            if(action === 'reset'){
                clearElement(typed);
            }
    
            if(action === 'backspace'){
                backspace(typed);
            }
    
            if(action === 'enter'){
                secondOperand = storeOperand(typed);
                console.log(`Calculando: ${firstOperand} ${operator} ${secondOperand}`);
                result.innerText = calculate(firstOperand, secondOperand, operator);
                createUnityForHistory(typed, result);
                firstOperand = storeOperand(result);
                clearElement(typed);
            }

            updateDisplay(typed.innerText, typed);
        }
    } catch (error) {
        console.log(error);
        showErrorMessage(result);
    }
}