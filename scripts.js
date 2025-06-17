// SELECIONA OS ELEMENTOS DO FORMULÁRIO.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// SELECIONA OS ELEMENTOS DA LISTA
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// CAPTURA O EVENTO DE IMPUT PARA FORMATAR O VALOR EM APENAS NUMEROS.
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    value = Number(value) / 100
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

// CAPTURA O EVENTO DE SUBMIT DO FORMULÁRIO PARA OBTER OS VALORES.
form.onsubmit = () => {
    event.preventDefault()

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

// ADICIONA UM NOVO ITEM A LISTA
function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
        expenseItem.dataset.id = newExpense.id

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        expenseList.append(expenseItem)

        formClear()
        updateTotals()
        saveExpenses()

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

// ATUALIZA OS TOTAIS
function updateTotals() {
    try {
        const items = expenseList.children

        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`

        let total = 0

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
            value = parseFloat(value)

            if (isNaN(value)) {
                return alert("Não foi possível calcular o total. O valor não parece ser um número.")
            }

            total += Number(value)
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        expensesTotal.innerHTML = ""
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
    }
}

// EVENTO QUE CAPTURA O CLIQUE NOS ITENS DA LISTA
expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-icon")) {
        const item = event.target.closest(".expense")
        item.remove()
        updateTotals()
        saveExpenses()
    }
})

// LIMPA O FORMULÁRIO
function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}

// SALVAR NO LOCAL STORAGE
function saveExpenses() {
    const items = []

    const listItems = expenseList.children
    for (let item = 0; item < listItems.length; item++) {
        const expenseName = listItems[item].querySelector("strong").textContent
        const expenseCategory = listItems[item].querySelector(".expense-info span").textContent
        const categoryIcon = listItems[item].querySelector("img").getAttribute("src").replace("img/", "").replace(".svg", "")
        const amount = listItems[item].querySelector(".expense-amount").textContent.trim()

        items.push({
            id: listItems[item].dataset.id,
            expense: expenseName,
            category_id: categoryIcon,
            category_name: expenseCategory,
            amount: amount,
            created_at: new Date()
        })
    }

    localStorage.setItem("expenses", JSON.stringify(items))
}

// CARREGAR DO LOCAL STORAGE AO ABRIR A PÁGINA
window.onload = () => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || []

    savedExpenses.forEach(expense => {
        expenseAdd(expense)
    })
}
