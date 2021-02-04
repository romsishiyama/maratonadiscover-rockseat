const Modal = {
    open(){
        //Abrir Modal
        //Adicionar a class active ao modal
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')


    };
    close(){
        //fechar o Modal
        //remover a class active do modal
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const Stonage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    };
    setInterval(transactions) {
        localStonage.selfItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)
        ApplicationCache.reload()

    };
    remove(index){
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes(){
        let income =0;
        Transaction.all.forEach(transaction =>{
            if(transaction.amount > 0 {
                income += transaction.amount;
            }
            })
            return income
        
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total(){
        return Transaction.incomes() + Transaction.expenses();

    }


}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

    DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formaCurrency(transaction.amount)

        const html=`
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">{amount}</td>
        <td class="date">${transaction.date}</td>
        </td>
        `
        return html
    },

    updateBalance(){
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total))
    },
    cleanTransactionContainer.innerHTML = ""
}

const Utils = {
formatAmount(value){
value = Number(value.replace(/\,\./)) * 100

return value
},
formatDate(date){
    const splittedDate = date.split("-")
    return `$ {splitteDate[2]}/${splitteDate[1]}${splitteDate[0]}`
},
formatCurrency(value){
    const signal = Number(value) < 0 ? ":""
    value = String(value).replace(/\D/g, "")
    value = Number(value) /100

    value = value.toLocalString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    return signal + value
}
}

const Form ={
    description: document.querySelector('input#description'),
    amount: document.querySelectot('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amont: Form.amount.value,
            date: Form.date.value
        }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return{
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value - ""

    },

    submit(event){
        event.preventDefaut()

        try{
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Form.ClearFields()
            Modal.close()
        } catch (error){
            alert(error.message)
        }
        }
    }
const App = {

    init() {
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

        Storage.set(Transaction.all)
    },
    reload(){
        DOM.clearTransactions()
        App.init()
    },
}

App.init()