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
    captura do proposito do botão
    atualizar visor digitado
    adiciona um digito ao que foi digitado no visor
    armazena o operador para quando for fazer a operacao
    operacoes
    inverte o sinal do número
    inserir ponto flutuante
    garantir que só seja feita uma operação por cada vez exceto na comparação 
    calcular
    atualizar visor resultado
    armazenar resultado no historico
    preparar para novo calculo
    converter para porcentagem
    identificar e exibir erro
    limpar o histórico
    zerar valores do visor digitado
    backspace no valor digitado

    aplicar tema
    salvar na memoria
    recuperar tema salvo na memoria
*/

const btnActions = document.getElementsByClassName('actions');
const btnOperators = document.getElementsByClassName('operators');
const btnNumbers = document.getElementsByClassName('numbers');
let operator;



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