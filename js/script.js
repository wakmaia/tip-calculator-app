let billInput = document.getElementById("bill");
let tipPercent = document.body.querySelectorAll(".btn");
let peopleInput = document.getElementById("people");
let tipAmount = document.getElementById("tip-amount");
let customBtn = document.getElementById("customBtn");
let customInput = document.getElementById("customInput");
let total= document.getElementById("total");
let errorMsg = document.getElementById("no-zero")
let form = document.querySelector("form");

let selectedTipPercent = 0;

//Change button to input when clicked
customBtn.addEventListener("click", function () {
  customBtn.style.display = "none";
  customInput.style.display = "inline-block"; 
  customInput.focus();
});

//Show custon button when clicked reset
form.addEventListener("reset", function () {
  customBtn.style.display = "inline-block";
  customInput.style.display = "none";
 })

customInput.addEventListener("input", function () {
  selectedTipPercent = parseFloat(customInput.value);
  calculateTip();
});

 //Reset the tip and total
form.addEventListener("reset", function () {
  customBtn.style.display = "inline-block";
  customInput.style.display = "none";

  tipAmount.textContent = "$0.00";
  total.textContent = "$0.00";
  errorMsg.textContent = "";

  selectedTipPercent = 0;

  tipPercent.forEach(btn => btn.classList.remove("selected"));
});

//Select % tip
for (var i = 0; i < tipPercent.length; i++) {
  tipPercent[i].addEventListener("click", function () {
    //remove selected class on clicked button
    for (var i = 0; i < tipPercent.length; i++) {
      tipPercent[i].classList.remove("selected");
      console.log(tipPercent[i]);
      }


    //add selected class on clicked button
    this.classList.add("selected");

    selectedTipPercent = parseFloat(this.textContent.replace('%', ''));

    calculateTip();
  });
}

billInput.addEventListener("change", calculateTip);
peopleInput.addEventListener("change", calculateTip);

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (isNaN(bill) || isNaN(people) || people === 0 || isNaN(selectedTipPercent)) {
  
    if (people === 0) {
      peopleInput.classList.add("error"); 
      peopleInput.style.border = "1.5px solid red";
      errorMsg.textContent = "Can't add zero"
    } else {
      errorMsg.textContent = "";
      peopleInput.style.border = "";
      peopleInput.classList.remove("error");
    }
    return;
  }
    // tip %
    let tip = bill * (selectedTipPercent / 100);

    //Tip per person
    let tipPerPerson = tip / people;
    if(tipPerPerson!= 0){
        tipAmount.textContent = `$ ${tipPerPerson.toFixed(2)}`;
    }

    //Total per person
    totalPerPerson = (bill + tip) / people;
    if(totalPerPerson != 0){
       total.textContent = `$ ${totalPerPerson.toFixed(2)}`;
    }
  }

