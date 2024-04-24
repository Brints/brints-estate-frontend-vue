// Email Validation class
export class EmailValidation {
  static validEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  //   static emptyEmail(email: string): boolean {
  //     return email === "";
  //   }
}

// Field Validation
export class Validation {
  static emptyField(field: string): boolean {
    return field === "";
  }
}

// Password Validation class
