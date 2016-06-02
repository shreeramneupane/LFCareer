export class ValidationService {
  static getValidatorErrorMessage(code:string) {
    let config = {
      'required'             : 'This field is required',
      'invalidPositiveNumber': 'Please enter positive number greater than 0',
      'invalidFullName'      : 'Please enter your valid name',
      'invalidEmail'         : 'Please enter valid email address',
      'invalidPhoneNumber'   : 'Please enter valid phone number'
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

  static fullNameValidator(control) {
    if (control.value && control.value.match('[0-9]')) {
      return {'invalidFullName': true};
    } else {
      return null;
    }
  }

  static emailValidator(control) {
    if (control.value && control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      return null;
    } else {
      return {'invalidEmail': true};
    }
  }

  static phoneNumberValidator(control) {
    if (control.value && control.value.match(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i)) {
      return null;
    } else {
      return {'invalidPhoneNumber': true};
    }
  }
}