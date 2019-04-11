document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, null);
});

const form = document.querySelector('form');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const monthlyIncome = document.getElementById('income');
const savingsGoal = document.getElementById('savings_goal');
let savingsPlansEl = document.getElementById('savingsPlans');
let savedProfile = JSON.parse(localStorage.getItem('profile'));
let savingsPlanName = document.getElementById('savings_plan_name');

if (savedProfile) {
  console.log('loaded saved profile');
  console.log(savedProfile);
  firstName.value = savedProfile.firstName;
  lastName.value = savedProfile.lastName;
  monthlyIncome.value = savedProfile.monthlyIncome;
  savingsGoal.value = savedProfile.savingsGoal;
}

console.log(savedProfile);
form.addEventListener('submit', function (e) {
  let profile = {
    firstName: firstName.value,
    lastName: lastName.value,
    monthlyIncome: monthlyIncome.value,
    savingsGoal: savingsGoal.value
  }
  localStorage.setItem('profile', JSON.stringify(profile));
  console.log(profile);
  e.preventDefault();
  console.log(firstName.value, lastName.value, monthlyIncome.value, savingsGoal.value);
});

function createSavingsPlan(){
  let savingsPlans = JSON.parse( localStorage.getItem('savingsPlans') ) || [];
  let newSavingsPlan = {
    date: Date.now(),
    name: savingsPlanName.value,
    expenses: []
  }
  
  savingsPlans.push(newSavingsPlan);
  localStorage.setItem('savingsPlans', JSON.stringify(savingsPlans));
  getSavingsPlans();
  savingsPlanName.value = '';
}

function getSavingsPlans(){
  savingsPlansEl.innerHTML = '';
  let savingsPlans = JSON.parse(localStorage.getItem('savingsPlans'));
  console.log(savingsPlans);
  savingsPlans.forEach((plan) => {
    let li = document.createElement('li');
    let text = document.createTextNode(plan.name);
    li.appendChild(text);
    savingsPlansEl.appendChild(li)
  });
}

//Call right away to see savings plans
getSavingsPlans();