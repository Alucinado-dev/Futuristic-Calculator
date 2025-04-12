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

const btnActions = document.getElementsByClassName('actions');
const btnOperators = document.getElementsByClassName('operators');
const btnNumbers = document.getElementsByClassName('numbers');
let operator;

const typed = document.getElementById('typed');
const display = document.getElementById('display');

btnActions.forEach(button => {
    button.addEventListener('click', () => {
        let pressedButton = storePressedButton(button, 'action');
        console.log(pressedButton);
    });
});

btnOperators.forEach(button => {
    button.addEventListener('click', () => {
        let pressedButton = storePressedButton(button, 'operator');
        operator = pressedButton;
        console.log(pressedButton);
    });
});

btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        let pressedButton = storePressedButton(button, 'number');
        console.log(pressedButton);
    });
});