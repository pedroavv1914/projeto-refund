// SELECIONA OS ELEMENTOS DO FORMULÁRIO.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// SELECIONA OS ELEMENTOS DA LISTA
const expenseList = document.querySelector("ul")

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

// CAPTURA O EVENTO DE SUBMIT DO FORMULÁRIO PARA OBTER OS VALORES.
form.onsubmit = () => {
    event.preventDefault()

    // CRIA UM OBJETO COM OS DETALHES NA NOVA DESPESA
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }    

    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {

        //CRIA O ELEMENTO PARA ADICIONAR O ITEM (LI) NA LISTA (UL).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // CRIA O ÍCONE DA CATEGORIA.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // ADICIONA AS INFORMAÇÕES DO ITEM.
        expenseItem.append(expenseIcon)
        expenseList.append(expenseItem)

    }catch (error){
        alert("Não foi possível atualizar a lista de despesas!")
        console.log(error)
    }
}