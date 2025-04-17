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

function storeOperand(display){
    let operand;

    const textValue = display.innerText.replace(',', '.');
    try {
        if (textValue === '') {
            operand = null; 
        } else {
            operand = parseFloat(textValue);
        }

        if (isNaN(operand)) {
           console.error(`Falha no parsing da entrada: "${textValue}"`);
           return NaN;
        }
    } catch (error) {
        console.log(`Erro ao fazer parsing do operando: ${error}`);
        return NaN; 
    }
    
    console.log(`o operando armazenado (string: "${display.innerText}", parsed: ${operand})`);
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

    return Number(result).toFixed(4);
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
        if(!typed.innerText.includes('.')){

            if(typed.innerText === '') {
                typed.innerText = '0.';
            } else {
                typed.innerText += '.';
            }
        }

        updateDisplay(typed.innerText, typed);
    } catch (error) {
        console.log(error);
    }
}

function createUnityForHistory(first, op, second, resultValue){
    const unity = document.createElement('p');
    const opSymbol = {
        plus: '+', minus: '-', times: '*', divide: '/',
        power: '^', sqrt: '√', percent: '%'
    }
    unity.innerText = `${first.innerText} ${opSymbol[op]} ${second} = ${resultValue}`;
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

function showErrorMessage (display, errorMessage = 'Ocorreu um erro desconecido'){
    display.innerText = `Erro: ${errorMessage}`;

    setTimeout(() => {
        display.innerText = '';
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

function makeAction(typed, result, action, currentState) {
    let state = { ...currentState }; /* Cria uma cópia para evitar mutação direta do objeto original */ 
    
    try {
        if(action === 'clear'){
            clearElement(typed);
            clearElement(result);
            const history = document.getElementById('history-list');
            clearElement(history);
  
            state.firstOperand = null;
            state.operator = null;
            state.secondOperand = null; 
            console.log(`Estado resetado pelo Clear: ${state}`);
        }
    
        if(action === 'reset'){ 
            clearElement(typed);
        }
    
        if(action === 'backspace'){
            backspace(typed); 
        }
    
        if(action === 'enter'){

            if (state.firstOperand !== null && state.operator !== null && typed.innerText !== '') {
                const secondOperandText = typed.innerText; /* stores the second operand in string type to the history */
                state.secondOperand = storeOperand(typed); 
    
                if (isNaN(state.secondOperand)) {
                    showErrorMessage(result);
                    return currentState; 
                }
    
                console.log(`Calculando: ${state.firstOperand} ${state.operator} ${state.secondOperand}`);
                const calculationResult = calculate(state.firstOperand, state.secondOperand, state.operator);
    
                if (!isFinite(calculationResult) || isNaN(calculationResult)) {
                     showErrorMessage(result);
                        state = { firstOperand: null, operator: null, secondOperand: null };
                        clearElement(typed);
                } else {
                    updateDisplay(calculationResult, result);
                    createUnityForHistory(state.firstOperand, state.operator, secondOperandText, calculationResult);
                    
                    /* prepares for the next operation */
                    state.firstOperand = calculationResult;
                    clearElement(typed); 
                    state.operator = null; 
                    state.secondOperand = null; 
                    console.log("Estado após Enter:", state);
                }
            } else {
                console.log("Enter pressionado sem operação completa pronta.");
            }
        }
    } catch (error) {
        console.log("Erro em makeAction:", error);
        showErrorMessage(result);
        state = { firstOperand: null, operator: null, secondOperand: null };
        clearElement(typed);
        clearElement(result);
    }
    return state; 
}