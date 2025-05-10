import * as Yup from "yup";

import { type RegistrationInput } from "../../../utils/types";

export const registrationFormValidationSchema = Yup.object<RegistrationInput>({
    username: Yup.string()
        .required()
        .min(2, "Username should be at least 2 characters long.")
        .max(24, "Username should not be more than 24 characters long.")
        .matches(
            /[a-z0-9_]/,
            "Username should only contain lowercase alphabets, numbers and/or underscore"
        ),
    password: Yup.string()
        .min(8, "Must Contain 8 Characters")
        .required()
        .matches(
            /^(?=.*[a-z])/,
            "Password must Contain One Lowercase Character"
        )
        .matches(
            /^(?=.*[A-Z])/,
            " Password must Contain One Uppercase Character"
        )
        .matches(/^(?=.*[0-9])/, " Password must Contain One Number Character")
        .matches(
            /^(?=.*[!@#\$%\^&\*])/,
            " Password must Contain  One Special Case Character"
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
    ),
    email: Yup.string().email().required(),
    fullName: Yup.string().optional()
});

export const getPasswordStrength = (password: string): number => {
    let strength = 0;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);

    // Count how many criteria are met
    strength =
        Number(password.length >= 2) +
        Number(hasLowercase && hasUppercase) +
        Number(hasDigit) +
        Number(hasSpecialChar);

    return strength;
};
