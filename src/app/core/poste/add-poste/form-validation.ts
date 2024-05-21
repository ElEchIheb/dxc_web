import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === '') {
      return null; 
    }
    const isValid = /^[0-9]+(?:\.[0-9]+)?$/.test(value);
    return isValid ? null : { numeric: true };
  };
}
