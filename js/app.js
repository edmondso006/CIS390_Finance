document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, null);
});

//Connecting JS to the DOM
let expenseDate = document.getElementById('expense_date');
let expenseName = document.getElementById('expense_name');
let expenseCost = document.getElementById('expense_cost');
let savingsPlansEl = document.querySelector('select');
let form = document.querySelector('form');
let expensesTable = document.getElementById('expense_table');
let expensesTableBody = document.getElementById('expense_table_body');
let totalEl = document.getElementById('total');
let savingsPlans = JSON.parse(localStorage.getItem('savingsPlans'));
let expenses = [];
let currentPlan = {};
let totalVal = 0;

//Populates the dropdown with all the expense plans created by user
function getSavingsPlans() {
  console.log(savingsPlans);
  savingsPlans.forEach((plan) => {
    let option = document.createElement('option');
    let text = document.createTextNode(plan.name);
    option.appendChild(text);
    savingsPlansEl.appendChild(option)
  })
}

//Retrieves all the expenses that are associated with a particular savings plan
//and then displays them
function getExpenses(index) {
  if (index == 0) {
    expensesTable.innerHTML = '';
  } else {
    expensesTable.innerHTML = '';
    currentPlan = savingsPlans[index - 1];
    console.log(currentPlan);
    expenses = currentPlan.expenses;
    console.log(expenses);
    expenses.forEach((expense) => {
      let row = expensesTable.insertRow(0);
      let date = row.insertCell(0);
      let name = row.insertCell(1);
      let cost = row.insertCell(2);

      totalVal += Number(expense.expenseCost);


      date.innerHTML = expense.expenseDate;
      name.innerHTML = expense.expenseName;
      cost.innerHTML = expense.expenseCost;
    });
  }

  total.innerHTML = totalVal;
}

//Even listener for submitting a new expense
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if(!savingsPlans[savingsPlans.indexOf(currentPlan)]){
    alert('please select a savings plan');
    return;
  } 
  let newExpense = {
    expenseDate: expenseDate.value,
    expenseName: expenseName.value,
    expenseCost: expenseCost.value
  }

  let savingPlan = savingsPlans[savingsPlans.indexOf(currentPlan)];
  savingPlan.expenses.push(newExpense);
  localStorage.setItem('savingsPlans', JSON.stringify(savingsPlans));
  getExpenses(savingsPlans.indexOf(currentPlan) + 1);
  
  //Reset form
  expenseDate.value = '';
  expenseName.value = '';
  expenseCost.value = '';
  
});


function generateReport(){
  var doc = new jsPDF();
  console.log(currentPlan.name);
  doc.text(currentPlan.name, 10, 10);
  doc.autoTable({html: '#expense_table'});
  doc.text("Total Spent: ", 70, 200);
  doc.text(totalVal.toString(), 100, 200);
  doc.save('expenses.pdf')
}

getSavingsPlans();