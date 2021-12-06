import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ValidatorType} from '../../interfaces/types/validator-type';
import {ValidatorConfigElementType, VALIDATORS_TYPE_CONFIG, ValidatorsTypeConfig} from '../../core/constans/validators-type-config';

@Component({
  selector: 'app-strings-form-array',
  templateUrl: './strings-form-array.component.html',
  styleUrls: ['./strings-form-array.component.css']
})
export class StringsFormArrayComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() placeholder: string;
  @Input() validator: ValidatorType = 'none';
  validatorsConfig: ValidatorsTypeConfig = VALIDATORS_TYPE_CONFIG;
  currentValidators: ValidatorConfigElementType[] = [];

  constructor() { }

  ngOnInit(): void {
    this.currentValidators = this.validatorsConfig[this.validator];
  }

  add(): void {
    const validators: ValidatorFn[] = this.getValidators();
    console.log(validators);
    (this.formArray as FormArray).push(new FormControl('', validators));
  }

  removeElement(index: number): void {
    (this.formArray as FormArray).removeAt(index);
  }

  getValidators(): ValidatorFn[] {
    const validators: Array<ValidatorFn | null> = this.currentValidators.map(vt => {
      if (vt instanceof RegExp) {
        return Validators.pattern(vt);
      }else{
        switch (vt) {
          case 'required':
            return Validators.required;
            break;
          default:
            return null;
            break;
        }
      }
    });
    return validators.filter(v => v);
  }

}
