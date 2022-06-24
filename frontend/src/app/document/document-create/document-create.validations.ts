import { Validators } from '@angular/forms';

export const validationMessages = {
  title: {
    required: 'is required.',
    minlength: 'at least 1 characters long.',
    maxlength: 'Cannot be more than 100 characters long.'
  },
  author: {
    required: 'is required.',
    minlength: 'at least 1 characters long.',
    maxlength: 'Cannot be more than 100 characters long.'
  }
};

export const formErrors = {
  title: '',
  author: ''
};

export const validationConfig = {
  title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
  author: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
};
