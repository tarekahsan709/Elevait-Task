import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DocumentService } from '../../shared/services/document.service';
import { validationConfig, formErrors, validationMessages } from './document-create.validations';
import Utils from '../../shared/helpers/utils';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.css']
})
export class DocumentCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  formErrors = formErrors;
  validationMessages = validationMessages;
  errors: string[] = [];

  constructor(private fb: FormBuilder,
              private service: DocumentService,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  buildForm(): void {
    this.form = this.fb.group(validationConfig);
    this.form.valueChanges.subscribe(() => Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors));
    Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors);
  }

  onCreate(): void {
    this.service.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigateByUrl('/document');
      },
      complete: () => {
        console.log('Documents has created');
      },
      error: (error) => {
        this.errors = error.errors;
        console.error('Documents creation failed');
      }
    });
  }
}
