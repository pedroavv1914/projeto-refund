// SELECIONA OS ELEMENTOS DO FORMULÁRIO.
const amount = document.getElementById("amount")

// CAPTURA O EVENTO DE IMPUT PARA FORMATAR O VALOR EM APENAS NUMEROS.
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")

    //TRANSFORMA O VALOR EM CENTAVOS.
    value = Number(value) / 100

    // ATUALIZA O VALOR DO INPUT.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){

    // FORMATA O VALOR NO PADRÃO BRL (REAL BRASILEIRO)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}