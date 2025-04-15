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
    comparação booleana
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

    aplicar tema
    salvar na memoria
    recuperar tema salvo na memoria
*/

applyTheme(getSavedTheme()) 

const btnActions = document.querySelectorAll('.btn-action');
const btnOperators = document.querySelectorAll('.btn-operator');
const btnNumbers = document.querySelectorAll('.btn-number');
let firstOperand, secondOperand,operator, pressedButton = null;

const typed = document.getElementById('typed');
const result = document.getElementById('result');

btnActions.forEach(button => {
    button.addEventListener('click', () => {
        pressedButton = storePressedButton(button, 'action');
        console.log(`a ação tomada é ${pressedButton}`);
        makeAction(typed, result, pressedButton);
    });
});


btnOperators.forEach(button => {
    button.addEventListener('click', () => {
        const currentOperator = storePressedButton(button, 'operator');
        const currentOperand = storeOperand(typed);
/* 
        if(isNaN(currentOperand) && typed.innerText.length > 0) {
             console.error("Entrada inválida no visor:", typed.innerText);
             showErrorMessage(result);
             return; 
        }
         */
        if(operator && firstOperand) {
            console.log(`Calculando: ${firstOperand} ${operator} ${currentOperand}`);
            clearElement(typed); 
            /* when another operator is clicked, the calculation gets done */
            secondOperand = currentOperand; 
            const intermediateResult = calculate(firstOperand, secondOperand, operator);
            result.innerText = intermediateResult; 
            /* then, the result turns into the new first operand */
            firstOperand = intermediateResult; 
            operator = currentOperator; 
            console.log(`Resultado intermediário: ${firstOperand}, Próximo operador: ${operator}`);

        } else {
            firstOperand = currentOperand;
            operator = currentOperator; 
            clearElement(typed);
            updateDisplay(firstOperand + operator, result);
            console.log(`Primeiro operando armazenado: ${firstOperand}, Operador definido: ${operator}`);
        }
    });
});


btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        pressedButton = storePressedButton(button, 'number');
        appendPressedButtonToTyped(pressedButton);
        console.log(`o nuúmero selecionado é ${pressedButton}`);
    });
});




