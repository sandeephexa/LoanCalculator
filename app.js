// listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    // hide results
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,2000);
    e.preventDefault();
});

// calculate loan

function calculateResults(){


//UI vars

const amount = document.getElementById('amount');
const years = document.getElementById('years');
const interest = document.getElementById('interest');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;

console.log(amount.value+" "+calculatedInterest);
// compute monthly payments

const x = Math.pow(1 + calculatedInterest,calculatedPayments);
const monthly = (principal * x * calculatedInterest) / (x - 1);

if(isFinite(monthly))
{
     monthlyPayment.value = monthly.toFixed(2);
     totalPayment.value = (monthly * calculatedPayments).toFixed(2);
     totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

     // unhide results
     document.getElementById('results').style.display = 'block';
     // hide loader
     document.getElementById('loading').style.display = 'none';
}
else{
   showError('check your numbers');
}
  
}

function showError(error)
{
    
     // unhide results
     document.getElementById('results').style.display = 'none';
     // hide loader
     document.getElementById('loading').style.display = 'none';
    // create div
    const errorDiv = document.createElement('div');
    // add class
    errorDiv.className = 'alert alert-danger';
    // append child
    errorDiv.appendChild(document.createTextNode(error));
    // get card
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // insert above heading
    card.insertBefore(errorDiv,heading);

    setTimeout(removeError,3000);

}

// remove alert msg

function removeError(){
    document.querySelector('.alert').remove();
}

