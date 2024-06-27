// export class UserDataValidators {
//   emailValidator = {
//     $validator: (value: string) => {
//       if (!value) return 0;
//       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 1 : 2;
//     },
//     $message: ["Email is required", "Must be a valid email address"],
//   };

//   passwordValidator = {
//     $validator: (value: string) => {
//       if (!value) return 0;
//       return value.length >= 6 ? 1 : 2;
//     },
//     $message: ["Password is required", "Password must be at least 6 characters"],
//   };

//   fullNameValidator = {
//     $validator: (value: string) => {
//       if (!value) return 0;
//       return value.length >= 3 ? 1 : 2;
//     },
//     $message: ["Full name is required", "Full name must be at least 3 characters"],
//   };
// }

export const fullNameValidator = {
  $validator: (value: string) => {
    // if (!value) return 0;
    // return value.length >= 3 ? 1 : 2;
    if (typeof value === "undefined" || value === null || value === "") {
      return true;
    }
    return value.length >= 3 ? false : true;
  },
  $message: ["Full name is required", "Full name must be at least 3 characters"],
};

export const emailValidator = {
  $validator: (value: string) => {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : false;
  },
  // $message: ["Email is required", "This field must be a valid email address"],
  $message: "Invalid email address",
};

export const passwordValidator = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  return regex.test(password);
};

export const maxSize = (size: number) => {
  return (file) => !file || file.size <= size;
};
