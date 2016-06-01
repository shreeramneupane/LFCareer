export class ValidationService {
  static getValidatorErrorMessage(code:string) {
    let config = {
      'required'             : 'This field is required',
      'invalidPositiveNumber': 'Please enter positive number greater than 0'
    }
    return config[code];
  }

  static positiveNumberValidator(control) {
    if (control.value && String(control.value).match('^[1-9][0-9]*$')) {
      return null;
    } else {
      return {'invalidPositiveNumber': true};
    }
  }
}