const Modal = {
    open(){ 
      // Open modal
      // Add the class active to modal
      document
        .querySelector('.modal-overlay')
        .classList
        .add('active');
    },
    close(){
      // Close the modal
      // Remove the class active from modal 
      document
        .querySelector('.modal-overlay')
        .classList
        .remove('active');
    }
  }
   /*const transaction = {
    all: [
      { 
        description: 'Luz',
        amount: -50005,
        date: '23/01/2021', 
      }, 
      { 
        description: 'Website',
        amount: 500000,
        date: '23/01/2021', 
      },
      {
        description: 'Intenet',
        amount: -20017,
        date: '23/01/2021', 
      },
      { 
          description: 'App', 
          amount: 200000,
          date: '23/01/2021',
      },
    ], */
  
    const Storage = {
      get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
      },
  
      set(transactions){
        localStorage.setItem("dev.finances:transactions",JSON.stringify(transactions))
    },
  }
    const Transaction = {
    all: Storage.get(),
  
    add(transaction){
      Transaction.all.push(transaction)

      App.reload()
    },

    remove(index){
      Transaction.all.splice(index, 1)

      App.reload()
    },

    incomes(){
        let income = 0;
        // pegar todas as transaçoes de
        // para cada transação
        Transaction.all.forEach(transaction => {
          // se ela for maior que zero
          if( transaction.amount > 0) {
            // somar a uma variavel e retornar a variavel
            income += transaction.amount;
          }
        }) 

        return income;

    },

    expenses(){
      let expense = 0;
      // pegar todas as transaçoes
      // para cada transação
      Transaction.all.forEach(transaction => {
        // se ela for menor que zero
        if( transaction.amount < 0) {
          // somar a uma variavel e retornar a variavel
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

      addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
      },
      innerHTMLTransaction(transaction, index){
          const CSSclass = transaction.amount > 0 ? "income" : "expense"

          const amount = utils.formatCurrency(transaction.amount)

          const html = `
                <td class="description">${transaction.description}</td>
                <td class=${CSSclass}>${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"/>
                </td>
                `

            return html
      },

      updateBalance(){
        document
          .getElementById('incomeDisplay')
          .innerHTML = utils.formatCurrency(Transaction.incomes())
        document
          .getElementById('expenseDisplay')
          .innerHTML = utils.formatCurrency(Transaction.expenses())
        document
          .getElementById('totalDisplay')
          .innerHTML = utils.formatCurrency(Transaction.total())
      },

      clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
      }

  }

  const utils = {
    formatAmount(value) {
      value = value * 100
      
      return Math.round(value)
    },

    FormatDate(date){
      const splittedDate = date.split("-")
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) <0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        return signal + value
    }
  }

  const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
      return {
      description: Form.description.value, 
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

    validateFields() {
      const {description, amount, date} = Form.getValues()
      
      if(
        description.trim() === "" ||
        amount.trim() === "" ||
        date.trim() === "") {
          throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
      let {description, amount, date} = Form.getValues()

      amount = utils.formatAmount(amount)

      date = utils.FormatDate(date)
      
      return{
        description,
        amount,
        date
      }
    },

    saveTransaction(transaction) {
      Transaction.add(transaction)
    },

    clearFields(){
      Form.description.value = ""
      Form.amount.value = ""
      Form.date.value = ""
    },

    submit(event) {
      event.preventDefault()

      try {
        // verificar se todas as infomaçoes foram preeencidas
      Form.validateFields()
      // formatar os dados para salvar
      const transaction = Form.formatValues()
      // salvar
      Form.saveTransaction(transaction)
      //apagar os dados do formularios
      Form.clearFields()
      // modal close
      Modal.close()

      } catch (error) {
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
      reload() {
        DOM.clearTransactions()
        App.init()
      }
    }

  App.init()