import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { JsonFormResponse } from './models';
import { JsonFormControls } from './models/json-form-control.model';

@Component({
  selector: 'json2form',
  templateUrl: 'ngx-json2form.component.html',
  styleUrls: ['ngx-json2form.component.scss']
})
export class NgxJson2formComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Output() formGroupChange = new EventEmitter<FormGroup>();

  @Input() JSON!: string | JsonFormResponse;

  @Input() initialized: boolean = false;
  @Output() initilizedChange = new EventEmitter<boolean>();

  @Input() formId: string = (Math.random() + 1).toString(36).substring(7);

  @Output() ngSubmit = new EventEmitter<void>();

  public source: JsonFormResponse | null = null;


  constructor() {

  }

  ngOnInit(): void {
    if (!this.JSON) {
      return;
    }
    try {
      this.source = JSON.parse(this.JSON as string);
    } catch (e) {
      this.source = this.JSON as JsonFormResponse;
    }

    if (this.source) {
      this.source.controls = this.source.controls
        .sort((a, b) => a.sortOrder - b.sortOrder);

      this.source.controls
        .forEach(control => {
          this.formGroup.setControl(control.name, new FormControl(control.value ?? ''))
          this.formGroup.controls[control.name].setValidators(this.MapConfigValidatorsToFormValidators(control) ?? null);
        });

      this.initialized = true;
    }
  }

  public handleNgSubmit(): void {
    this.ngSubmit.emit();
  }

  private MapConfigValidatorsToFormValidators(config: JsonFormControls): ValidatorFn {
    return [config.validators.type.email ? Validators.email : null,
    config.validators.type.max ? Validators.max(config.validators.type.max) : null,
    config.validators.type.maxLength ? Validators.maxLength(config.validators.type.maxLength) : null,
    config.validators.type.min ? Validators.min(config.validators.type.min) : null,
    config.validators.type.minLength ? Validators.minLength(config.validators.type.minLength) : null,
    config.validators.type.nullValidator ? Validators.nullValidator : null,
    config.validators.type.pattern ? Validators.pattern(config.validators.type.pattern) : null,
    config.validators.type.required ? Validators.required : null,
    config.validators.type.requiredTrue ? Validators.requiredTrue : null
    ].filter(x => x != null) as any
  }

}
