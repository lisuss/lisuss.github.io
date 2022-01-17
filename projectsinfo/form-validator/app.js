document.getElementById('name').addEventListener('blur', 
validateName);
document.getElementById('lastname').addEventListener('blur', 
validateLastname);
document.getElementById('zip').addEventListener('blur', 
validateZipcode);
document.getElementById('email').addEventListener('blur', 
validateEmail);
document.getElementById('phone').addEventListener('blur', 
validatePhone);

function validateName() {
    const name = document.getElementById('name');
    const re = /^[A-Z][a-z]{1,19}$/;

    if(!re.test(name.value)) {
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }
}

function validateLastname() {
    const lastname = document.getElementById('lastname');
    const re = /^[A-Z][a-z]{1,19}$/;

    if(!re.test(lastname.value)) {
        lastname.classList.add('is-invalid');
    } else {
        lastname.classList.remove('is-invalid');
    }
}

function validateZipcode() {
    const zip = document.getElementById('zip');
    const re = /^[0-9]{2}-[0-9]{3}$/;

    if(!re.test(zip.value)) {
        zip.classList.add('is-invalid');
    } else {
        zip.classList.remove('is-invalid');
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    const re = /^[0-9a-zA-Z]{1,}@[0-9a-zA-Z]{1,}.[a-z]{2,}$/;

    if(!re.test(email.value)) {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }
}

function validatePhone() {
    const phone = document.getElementById('phone');
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{3}[-. ]?$/;

    if(!re.test(phone.value)) {
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }
}