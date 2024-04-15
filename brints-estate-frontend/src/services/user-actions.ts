export default class UserActions {
  static togglePasswordVisibility(): void {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const passwordVisibility = document.getElementById("password-visibility") as HTMLInputElement;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordVisibility.classList.remove("fa-eye-slash");
      passwordVisibility.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      passwordVisibility.classList.remove("fa-eye");
      passwordVisibility.classList.add("fa-eye-slash");
    }
  }

  static generateStrongPassword(): string {
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;
    let password = "";

    for (let i = 0; i < 12; i++) {
      const character = allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
      password += character;
    }

    return password;
  }
}
