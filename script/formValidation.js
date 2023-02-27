const contactForm = document.querySelector('.contact-form');
const requiredFields = contactForm.querySelectorAll('.contact-form-required');
const contactFormBtn = document.querySelector('.contact-form-btn');

contactFormBtn.addEventListener('click', () => {
    for (let field of requiredFields) {
        removeInvalidStyle(field);
    }
    contactFormBtn.focus();
});

for (let field of requiredFields) {
    if (field.type === 'email') {
        field.addEventListener( 'invalid', () => emailValidation(field) );
    } else {
        field.addEventListener( 'invalid', () => invalidFieldsHandler(field) );
    }
}

function invalidFieldsHandler(invalidField) {
    invalidField.classList.remove('valid-form-field');
    invalidField.classList.add('invalid-form-field');
    invalidField.after( createErrorMessage(`This field can't be empty`) );
    invalidField.addEventListener( 'change', () => removeInvalidStyle(invalidField) );
}

function emailValidation(emailField) {
    if (emailField.value === '') {
        emailField.after( createErrorMessage(`This field can't be empty`) )
    } else if ( !emailField.value.includes('@') || emailField.value.endsWith('@') ) {
        emailField.after( createErrorMessage(`Enter valid email address`) )
    }
    emailField.classList.remove('valid-form-field');
    emailField.classList.add('invalid-form-field');
    emailField.addEventListener( 'change', () => removeInvalidStyle(emailField) );
}

function createErrorMessage(messageText) {
    const errorMessageEl = document.createElement('p');
    errorMessageEl.textContent = messageText;
    errorMessageEl.classList.add('basic-text', 'invalid-field-message');
    return errorMessageEl;
}

function removeInvalidStyle(focusedField) {
    focusedField.classList.remove('invalid-form-field');
    focusedField.classList.add('valid-form-field');
    if (focusedField.nextElementSibling.classList.contains('invalid-field-message')) {
        focusedField.nextElementSibling.remove();
    }
}

