import { type FC, type ReactElement } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import { useFormik } from "formik";
import { Field, Input, Stack, Button } from "@chakra-ui/react";
import { useCookies } from 'react-cookie'

import {
    PasswordInput,
    PasswordStrengthMeter
} from "@/components/ui/password-input";
import {
    registrationFormValidationSchema,
    getPasswordStrength
} from "./validation/registration.validation";
import {
    type RegistrationInput,
    type RegistrationResponse
} from "../../utils/types";
import { toaster } from "@/components/ui/toaster";
import { register } from "../../utils/api";

export const RegistrationForm: FC = (): ReactElement => {
    const [_, setCookie] = useCookies(['session'], {
        doNotUpdate: true
    });

    const navigate: NavigateFunction = useNavigate();
    const formik = useFormik<RegistrationInput>({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: ""
        },
        onSubmit: async (values: RegistrationInput): Promise<void> => {
            try {
                const response: RegistrationResponse = await register(values);
                toaster.create({
                    title: response.message,
                    type: "success"
                });
                setCookie("session", true)
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } catch (err) {
                toaster.create({
                    title: "Something went wrong",
                    type: "error"
                });
            }
        },
        validationSchema: registrationFormValidationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack gap={2}>
                <Field.Root
                    required
                    invalid={
                        formik.touched.username && formik.errors.username
                            ? true
                            : false
                    }
                >
                    <Field.Label>
                        Username <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        size={"xs"}
                        variant={"outline"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name={"username"}
                        id={"username"}
                        placeholder={"Username"}
                    />
                    <Field.ErrorText>{formik.errors.username}</Field.ErrorText>
                </Field.Root>
                <Field.Root
                    required
                    invalid={
                        formik.touched.email && formik.errors.email
                            ? true
                            : false
                    }
                >
                    <Field.Label>
                        Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        size={"xs"}
                        variant={"outline"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Email"}
                    />
                    <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
                </Field.Root>
                <Field.Root
                    invalid={
                        formik.touched.email && formik.errors.fullName
                            ? true
                            : false
                    }
                >
                    <Field.Label>
                        Full Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        size={"xs"}
                        variant={"outline"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name={"fullName"}
                        id={"fullName"}
                        placeholder={"Full Name"}
                    />
                    <Field.ErrorText>{formik.errors.fullName}</Field.ErrorText>
                </Field.Root>
                <Field.Root
                    required
                    invalid={
                        formik.touched.password && formik.errors.password
                            ? true
                            : false
                    }
                >
                    <Field.Label>
                        Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                        size={"xs"}
                        variant={"outline"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name={"password"}
                        type={"password"}
                        id={"password"}
                        placeholder={"Password"}
                    />
                    <PasswordStrengthMeter
                        w={"full"}
                        mt={1}
                        value={getPasswordStrength(formik.values.password)}
                    />
                    <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
                </Field.Root>
                <Field.Root
                    required
                    invalid={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                            ? true
                            : false
                    }
                >
                    <Field.Label>
                        Confirm Password <Field.RequiredIndicator />
                    </Field.Label>
                    <PasswordInput
                        size={"xs"}
                        variant={"outline"}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name={"confirmPassword"}
                        type={"confirmPassword"}
                        id={"confirmPassword"}
                        placeholder={"Confirm Password"}
                    />
                    <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
                </Field.Root>
                <Stack gap={2} mt={2}>
                    <Button
                        w={"full"}
                        type={"submit"}
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Register
                    </Button>
                    <span>
                        Already have an account?{" "}
                        <Link to={"/auth/login"} viewTransition>
                            Login
                        </Link>
                    </span>
                </Stack>
            </Stack>
        </form>
    );
};
