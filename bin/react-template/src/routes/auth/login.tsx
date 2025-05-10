import { type FC, type ReactElement, useState } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router";
import { useFormik } from "formik";
import { Field, Input, Stack, Button, Text } from "@chakra-ui/react";
import { useCookies } from 'react-cookie'

import { PasswordInput } from "@/components/ui/password-input";
import { loginFormValidationSchema } from "./validation/login.validation";
import { type LoginInput } from "../../utils/types";
import { login } from "../../utils/api";
import { toaster } from "@/components/ui/toaster";

export const LoginForm: FC = (): ReactElement => {
    const [_, setCookie] = useCookies(['session'], {
        doNotUpdate: true
    })

    const navigate: NavigateFunction = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const formik = useFormik<LoginInput>({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values: LoginInput): Promise<void> => {
            setError(null);
            try {
                await login(values);
                toaster.create({
                    title: "Login success",
                    type: "success"
                });
                setCookie('session', true)
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } catch (err) {
                const error: Error = err as Error;
                setError(error.message);
                toaster.create({
                    title: "Oops",
                    description: error.message,
                    type: "error"
                });
            }
        },
        validationSchema: loginFormValidationSchema
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack gap={4}>
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
                    <Field.ErrorText>{formik.errors.password}</Field.ErrorText>
                </Field.Root>
                {error && (
                    <Text mt={2} textStyle={"xs"} color={"red"}>
                        {error}
                    </Text>
                )}
                <Stack gap={2} mt={error ? 0 : 2}>
                    <Button
                        w={"full"}
                        type={"submit"}
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Login
                    </Button>
                    <span>
                        Don't have an account?{" "}
                        <Link to={"/auth/register"} viewTransition>
                            Register
                        </Link>
                    </span>
                </Stack>
            </Stack>
        </form>
    );
};
