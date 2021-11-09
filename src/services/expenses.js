const expenses = localStorage.getItem("expenses") || '{}'
export function createRecord(data) {
    const oldExpenses = JSON.parse(expenses).data || []
    const newExpenses = [...oldExpenses, data]
    localStorage.setItem("expenses", JSON.stringify({data: newExpenses}))
    console.log(newExpenses)
    return newExpenses
}

export function getRecords() {
    const data = JSON.parse(expenses)
    return data?.data || []
}

export function updateRecord(data) {
    const expensesInstorage = JSON.parse(expenses).data || []
    const oldItem = expensesInstorage.find(i => i.id === data.id)
    oldItem.date = data.date
    oldItem.description = data.description
    oldItem.invoiceNo = data.invoiceNo
    oldItem.amount = data.amount
    localStorage.setItem("expenses", JSON.stringify({data: expensesInstorage}))
    return expensesInstorage
}
export function deleteRecord(id) {
    const oldExpenses = JSON.parse(expenses).data || []
    const newExpenses = oldExpenses.filter(item => item.id !== id)
    localStorage.setItem("expenses", JSON.stringify({data: newExpenses}))
    return newExpenses
}