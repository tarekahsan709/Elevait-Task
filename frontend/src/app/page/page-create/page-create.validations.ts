import { Validators } from '@angular/forms';

export const validationMessages = {
  text: {
    required: 'is required.',
    minlength: 'at least 1 characters long.',
    maxlength: 'Cannot be more than 2000 characters long.'
  }
};

export const formErrors = {
  text: ''
};

export const validationConfig = {
  text: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]]
};
