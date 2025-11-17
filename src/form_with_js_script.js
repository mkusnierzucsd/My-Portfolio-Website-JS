const form_errors= [];
function storeError(fieldId, message, value) {
    form_errors.push({
        field: fieldId,
        message: message,
        value_entered: value
    });
}


const nameInput = document.getElementById("name");
const allowedName = /^[A-Za-z\s'\-]+$/;
const emailInput = document.getElementById("email");
const allowedEmail = /^[A-Za-z0-9\.@\-]+$/;

function showError(input, message) {
    const errorOutput = document.getElementById(input.id + "-error");
    errorOutput.textContent = message;
    errorOutput.classList.remove("hidden");
    input.classList.add("flash");


    setTimeout(() => {
        errorOutput.classList.add("hidden");
        input.classList.remove("flash");
    }, 2000);
}

function enforceNameRules(event) {
    if (!allowedName.test(event.target.value)) {
        const msg = "Invalid character entered.";
        showError(event.target, msg);
        event.target.value = event.target.value.replace(/[^A-Za-z\s'\-]/g, "");
        storeError("name",msg,nameInput.value);
        nameInput.setCustomValidity("");
    }
    nameInput.setCustomValidity("");
}

function enforceEmailRules(event) {
    if (!allowedEmail.test(event.target.value)) {
        const msg = "Invalid character entered.";
        showError(event.target, msg);
        event.target.value = event.target.value.replace(/[^A-Za-z0-9\.@\-]/g, "");
        storeError("email",msg,emailInput.value);
        emailInput.setCustomValidity("");
    }
    emailInput.setCustomValidity("");
}

nameInput.addEventListener("input", enforceNameRules);


nameInput.addEventListener("input", (event) => {
    if(!nameInput.checkValidity()) {
        nameInput.setCustomValidity("Please enter at least 3 characters. Please do not enter numbers or special characters");
    } else {
        nameInput.setCustomValidity("");
    }
});

emailInput.addEventListener("input", enforceEmailRules);

emailInput.addEventListener("input", (event) => {
    if (!emailInput.checkValidity()) {
        emailInput.setCustomValidity("Must be a valid email address");
    } else {
        emailInput.setCustomValidity("");
    }
});

const message = document.getElementById("message");
const messageError = document.getElementById("message-error");
const messageInfo = document.getElementById("message-info");

message.addEventListener("input", (event) => {
const length = message.value.length;
const maxLength = message.maxLength;

messageInfo.textContent = `${length}/${maxLength} characters.`; 

if(length < maxLength) {
    messageError.classList.add("hidden");
}


if(length >= 0.75 * maxLength && length < maxLength) {
    message.style.outline = "2px solid orange";
    message.style.borderColor = "orange";
}

if(length >= maxLength) {
    message.style.outline = "2px solid red";
    message.style.borderColor = "red";
    const msg = "You have reached the character limit.";
    messageError.textContent = msg; 
    messageError.classList.remove("hidden");
    storeError("message",msg,message.value);
}

if(!message.checkValidity()) {
    message.setCustomValidity("Your message should be anywhere between 1 and 500 characters");
} else {
    message.setCustomValidity("");
}
});

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    const encoded = JSON.stringify(form_errors);
    document.getElementById("form-errors").value = encoded;
});