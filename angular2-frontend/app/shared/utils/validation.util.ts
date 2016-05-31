export class ValidationService {
  static getValidatorErrorMessage(code:string) {
    let config = {
      'required': 'This field is required'
    }
    return config[code];
  }
}