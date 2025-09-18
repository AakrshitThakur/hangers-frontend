interface AdminSignin {
  username: string;
  password: string;
}

const USERNAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]{2,}$/;

// (?=...) = positive lookahead
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function validateAdminSignin(input: AdminSignin) {
  // all validation errors
  const errors = {
    username: "",
    password: "",
    errorEncountered: false,
  };

  if (!USERNAME_REGEX.test(input.username)) {
    errors.username =
      "Username must be at least 3 characters long, start with a letter or underscore, and contain only letters, numbers, or underscores.";
    errors.errorEncountered = true;
  }
  if (!PASSWORD_REGEX.test(input.password)) {
    errors.password =
      "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).";
    errors.errorEncountered = true;
  }
  return errors;
}

export { validateAdminSignin };
