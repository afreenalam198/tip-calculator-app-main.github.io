
const billInput = document.getElementById('bill');
const tipBtns = document.querySelectorAll('.form-control-btn');
const customTipInput = document.querySelector('.form-control-custom-btn');
const peopleInput = document.getElementById('people');
const errMsg = document.getElementById('error-msg-label');
const peopleInputBox = document.getElementById('people');
const tipOutput = document.getElementById('tip-amount-output');
const totalAmountOutput = document.getElementById('total-amount-output');
const resetBtn = document.querySelector('.reset-btn');


let bill = 0, people = 1, tip = 0;

/* Get bill input */

billInput.addEventListener('input', () => {
    
    bill = parseFloat(billInput.value);
     
    if (bill >= 0 || Number.isNaN(bill)) {
        
        if (Number.isNaN(bill)) {       /* set the bill to 0 when user uses backspace to erase numbers leaving the input box blank */
            bill = 0;
        } 
        
        outputCalculator();
        reset();
    }
    

});

/* Get input from tip buttons */

tipBtns.forEach(btn => {
    
    btn.addEventListener('click', () => {
        
        if (btn.classList.contains('selected')) {
            
            btn.classList.remove('selected');
            btn.classList.add('hover-effect');
            tip = 0;


        } else {

            tipBtns.forEach(allBtns => {
                allBtns.classList.remove('selected');
            })

            tip = parseInt(btn.value);
            btn.classList.remove('hover-effect');
            btn.classList.add('selected');
            
        }

        outputCalculator();

    })

})

/* Get input from custom tip button */

customTipInput.addEventListener('input', () => {
                
    tip = parseInt(customTipInput.value);

    if (tip >= 0 || Number.isNaN(tip)) {
        
        if (Number.isNaN(tip)) {       /* set the custom input to 0 when user uses backspace to erase numbers leaving the input box blank */
            tip = 0;
            
        } 
        
        outputCalculator();
    }
    
    
})


/* Get number of people input */

peopleInput.addEventListener('input', () => {

    people = parseInt(peopleInput.value);

    /* Invalid or error when number of people input is 0 or less */

    if (people <= 0) {
        errMsg.style.display = 'block';
        peopleInputBox.style.border = '2px solid rgb(252, 57, 57)';
        
    } else {
        errMsg.style.display = 'none';
        peopleInputBox.style.border = '';  /* empty string removes the added border styling and returns state of the input box back to the value set in stylesheet */
        
        if (Number.isNaN(people)) {     /* set the number of people to 1 when user uses backspace to erase numbers leaving the input box blank */
            people = 1;
        }

        outputCalculator();
    }
    

});

/* Function to calculate total amount and tip */

function outputCalculator() {

    const totalTip = bill * (tip / 100);
    const tipAmount = totalTip / people;
    const totalAmount = (bill + totalTip) / people;

    tipOutput.innerHTML = "$" + tipAmount.toFixed(2);
    totalAmountOutput.innerHTML = "$" + totalAmount.toFixed(2);

}

/* Function when reset button is enabled */

function reset() {

    resetBtn.disabled = false;
    resetBtn.classList.add('selected');
    resetBtn.classList.add('hover-effect');
    
    resetBtn.addEventListener('click', () => {

        billInput.value = '';
        peopleInput.value = '';

        tip = 0;
        bill = 0;
        people = 1;
        outputCalculator();
    
        resetBtn.disabled = true;
        resetBtn.classList.remove('selected');
        resetBtn.classList.remove('hover-effect');
        
        tipBtns.forEach(allBtns => {
            allBtns.classList.remove('selected');
        })

        customTipInput.value = '';

    })
}

