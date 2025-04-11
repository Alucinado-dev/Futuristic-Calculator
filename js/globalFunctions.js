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

function updateDisplay(value){
    const display = document.getElementById('display');
    display.innerText = value;
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

    return result;
}

