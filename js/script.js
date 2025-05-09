let billInput = document.getElementById("bill");
let tipPercent = document.body.querySelectorAll(".btn");
let peopleInput = document.getElementById("people");
let tipAmount = document.getElementById("tip-amount");
let customBtn = document.getElementById("customBtn");
let customInput = document.getElementById("customInput");
let total= document.getElementById("total");
let errorMsg = document.getElementById("no-zero")

let selectedTipPercent = 0;

//Change button to input when clicked
customBtn.addEventListener("click", function () {
  customBtn.style.display = "none";
  customInput.focus();
});

customInput.addEventListener("input", function () {
  selectedTipPercent = parseFloat(customInput.value);
  calculateTip();
});

for (var i = 0; i < tipPercent.length; i++) {
  tipPercent[i].addEventListener("click", function () {
    //remove selected class on clicked button
    for (var i = 0; i < tipPercent.length; i++) {
      tipPercent[i].classList.remove("selected");
      console.log(tipPercent[i]);
      }

    //add selected class on clicked button
    this.classList.add("selected");

    calculateTip();
  });
}

billInput.addEventListener("change", calculateTip);
peopleInput.addEventListener("change", calculateTip);

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (bill || people || tipPercent) {
    let tip = bill * (selectedTipPercent / 100);

    //Tip per person
    let tipPerPerson = tip / people;
    tipAmount.textContent = `$ ${tipPerPerson.toFixed(2)};`;
    console.log("tipPerPerson2", tipPerPerson);

    //Total per person
    totalPerPerson = (bill + tip) / people;
    total.textContent = `$ ${totalPerPerson.toFixed(2)};`;
  }
  if (people === 0) {
    peopleInput.classList.add("error"); 
    peopleInput.style.border = "1.5px solid red";
    errorMsg.textContent = "Can't add zero"
  } 
}
