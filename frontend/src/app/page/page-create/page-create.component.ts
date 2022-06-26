import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DocumentService } from '../../shared/services/document.service';
import { validationConfig, formErrors, validationMessages } from './page-create.validations';
import Utils from '../../shared/helpers/utils';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  formErrors = formErrors;
  validationMessages = validationMessages;
  errors: string[] = [];

  documentId: string;

  constructor(private fb: FormBuilder,
              private service: DocumentService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      // @ts-ignore
      this.documentId = params.documentId;
    });
  }

  buildForm(): void {
    this.form = this.fb.group(validationConfig);
    this.form.valueChanges.subscribe(() => Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors));
    Utils.onFormValueChanged(this.form, this.validationMessages, this.formErrors);
  }

  onCreate(): void {
    this.service.createPage({
      documentId: this.documentId,
      text: this.form.getRawValue()
    }).subscribe({
      next: () => {
        this.router.navigateByUrl(`/document/${this.documentId}`);
      },
      complete: () => {
        console.log('Page has created');
      },
      error: (error) => {
        this.errors = error.errors;
        console.error('Page creation failed');
      }
    });
  }
}
