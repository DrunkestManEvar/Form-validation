class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateEntry();
    this.validateSubmit();
    this.validFields = 0;
    this.submitBtn = document.querySelector('.btn');
  }

  validateSubmit() {
    const self = this;
    this.form.addEventListener('submit', function (e) {
      e.preventDefault();

      self.fields.forEach(field => {
        const inputFieldToValidate = document.querySelector(`#${field}`);

        self.validateField(inputFieldToValidate);
      });
    });
  }

  validateEntry() {
    const self = this;
    this.fields.forEach(field => {
      document
        .querySelector(`#${field}`)
        .addEventListener('input', function (e) {
          self.validateField(this);
        });
    });
  }

  validateField(input) {
    const inputLabel = input.previousElementSibling.textContent.slice(0, -1);
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (input.value.trim() === '') {
      this.setStatus(input, `${inputLabel} cannot be blank!`, 'error');
    } else if (input.type === 'email' && !re.test(input.value)) {
      this.setStatus(input, 'Invalid email format!', 'error');
    } else if (input.id === 'password-confirm') {
      const firstPasswordField = this.form.querySelector('#password');

      firstPasswordField.value !== input.value
        ? this.setStatus(input, 'Passwords do not match!', 'error')
        : this.setStatus(input, null, 'success');
    } else {
      this.setStatus(input, null, 'success');
    }
  }

  setStatus(input, message, status) {
    const iconError = input.parentElement.querySelector('.icon-error');
    const iconSuccess = input.parentElement.querySelector('.icon-success');
    const errorMsg = input.nextElementSibling;

    if (status === 'error') {
      input.classList.remove('input-success');
      input.classList.add('input-error');
      iconSuccess.classList.add('hidden');
      iconError.classList.remove('hidden');
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = message;
      this.submitBtn.classList.remove('btn-success');
      this.submitBtn.classList.add('btn-error');
    }

    if (status === 'success') {
      input.classList.remove('input-error');
      input.classList.add('input-success');
      iconError.classList.add('hidden');
      iconSuccess.classList.remove('hidden');
      errorMsg.classList.add('hidden');
      errorMsg.textContent = '';
      this.validFields++;
      if (this.validFields === this.fields.length) {
        this.submitBtn.classList.remove('btn-error');
        this.submitBtn.classList.add('btn-success');

        const pseudo = window.getComputedStyle(
          document.querySelector('.form-heading', ':after')
        );
        console.log(pseudo);
      }
    }
  }
}

const fieldIDs = ['username', 'email', 'password', 'password-confirm'];
const registerForm = document.querySelector('.form');

const registerFormValidator = new FormValidator(registerForm, fieldIDs);
