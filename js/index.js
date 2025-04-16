/* quebrar o problema em problemas menores */

/* funcionalidades:
    apertar botões
    mostrar o conteudo no visor
    fazer operações
    mostrar o resultado no visor
    salvar o resultado no historico
    dar reset na calculadora(inclui limpar o historico)
    dar clear na calculadora(zerar os valores sem limpar o historico)
    dar backspace no numero digitado
    dar enter na calculadora
    inserir o ponto flutuante
*/

/* operações:
    soma
    subtração
    multiplicação
    divisão
    potência
    Radiciação
    porcentagem
*/

/* funções js:
    *captura do proposito do botão
    *atualizar visor digitado
    *adiciona um digito ao que foi digitado no visor
    *armazena o operador para quando for fazer a operacao
    *inverte o sinal do número
    *inserir ponto flutuante
    *calcular
    *atualizar visor resultado
    *armazenar resultado no historico
    *identificar e exibir erro
    *limpar o histórico
    *zerar valores do visor digitado
    *backspace no valor digitado

    *aplicar tema
    *salvar na memoria
    *recuperar tema salvo na memoria
*/

applyTheme(getSavedTheme()) 

const btnActions = document.querySelectorAll('.btn-action');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnNumbers = document.querySelectorAll('.btn-number');
const btnFloat = document.getElementById('float');
const btnInvert = document.getElementById('invert');

let calculatorState = {
    firstOperand: null,
    secondOperand: null,
    operator: null,
};

const typed = document.getElementById('typed');
const result = document.getElementById('result');

btnActions.forEach(button => {
    button.addEventListener('click', () => {
        const pressedAction = storePressedButton(button, 'action');
        console.log(`A ação tomada é ${pressedAction}`);

        calculatorState = makeAction(typed, result, pressedAction, calculatorState);
        console.log("Estado após ação:", calculatorState);
    });
});


btnOperators.forEach(button => {
    button.addEventListener('click', () => {
        const currentOperator = storePressedButton(button, 'operator');
        let currentOperand = null; 

        
        if (typed.innerText !== '') {
            currentOperand = storeOperand(typed);
            /* if the input is not valid, show error and stop the action of this click */
            if (isNaN(currentOperand)) {
                showErrorMessage(result);
                clearElement(typed); 
                return; 
            }
        }

        /* case 1: chained operations (5+3-1)  */
        /* need a firstOperand stored, a pending operator, and a new number typed (currentOperand)*/
        if (calculatorState.operator && calculatorState.firstOperand !== null && currentOperand !== null) {
            console.log(`Encadeando: Calculando ${calculatorState.firstOperand} ${calculatorState.operator} ${currentOperand}`);
            const intermediateResult = calculate(calculatorState.firstOperand, currentOperand, calculatorState.operator);

            if (!isFinite(intermediateResult) || isNaN(intermediateResult)) {
                showErrorMessage(result, 'o resultado da operação é inválido.');
                calculatorState = { firstOperand: null, secondOperand: null, operator: null };
                clearElement(typed);
                clearElement(result);
                return; 
            } else {
                /* script when the operation is valid, prepares to make the new operation */
                updateDisplay(intermediateResult, result); 
                calculatorState.firstOperand = intermediateResult; 
                calculatorState.operator = currentOperator; 
                clearElement(typed); 
                console.log(`Resultado intermediário: ${calculatorState.firstOperand}, Próximo operador: ${calculatorState.operator}`);
            }
        }

        /* Case 2: first operator pressed, or change in the operator after first operand */ 
        /* requires a valid number*/
        else if (currentOperand !== null) {
            calculatorState.firstOperand = currentOperand;
            calculatorState.operator = currentOperator;
            clearElement(typed); 
            updateDisplay(calculatorState.firstOperand, result);
            console.log(`Primeiro operando armazenado: ${calculatorState.firstOperand}, Operador definido: ${calculatorState.operator}`);
        }

        /* Case 3: operator pressed after another operator  */
        /* requires a valid firstOperand */
        else if (calculatorState.firstOperand !== null) {
             calculatorState.operator = currentOperator; 
             console.log(`Operador alterado para: ${calculatorState.operator}`);
             
             updateDisplay(calculatorState.firstOperand, result);
        }
        
        /* last case:  operator pressed with no firstOperand */
        else {
            console.log("Operador pressionado sem um número precedente válido.");
            showErrorMessage(result, 'digite um número antes de selecionar um operador');
        }

        console.log("Estado após operador:", calculatorState);
    });
});


btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        const pressedNumber = storePressedButton(button, 'number');
        appendPressedButtonToTyped(pressedNumber);
        console.log(`o nuúmero selecionado é ${pressedNumber}`);
    });
});

btnFloat.addEventListener('click', () => {
    insertFloatingPoint(typed);
});

btnInvert.addEventListener('click', () => {
    if(typed.innerText !== ''){
        const currentNumber = storeOperand(typed);
        const invertedNumber = numberSignalInverter(currentNumber);
        updateDisplay(invertedNumber, typed);
    }
});     /* TODO ajeitar logica da raiz e da inversão para funcionar assim que o botão é apertado, sem precisar de um segundo operando */




