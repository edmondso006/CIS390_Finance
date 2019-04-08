const form = document.querySelector('form');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const monthlyIncome = document.getElementById('income');
const savingsGoal = document.getElementById('savings_goal');

let savedProfile = JSON.parse(localStorage.getItem('profile'));

if (savedProfile) {
  console.log('loaded saved profile');
  console.log(savedProfile);
  firstName.value = savedProfile.firstName;
  lastName.value = savedProfile.lastName;
  monthlyIncome.value = savedProfile.monthlyIncome;
  savingsGoal.value = savedProfile.savingsGoal;
}

form.addEventListener('submit', function (e) {

  e.preventDefault();

  let profile = {
    firstName: firstName.value,
    lastName: lastName.value,
    monthlyIncome: monthlyIncome.value,
    savingsGoal: savingsGoal.value
  }
  localStorage.setItem('profile', JSON.stringify(profile));

});