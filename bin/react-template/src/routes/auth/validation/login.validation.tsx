import * as Yup from "yup";
import { type LoginInput } from "../../../utils/types";

export const loginFormValidationSchema = Yup.object<LoginInput>({
    username: Yup.string().required().min(2, "Username cannot be empty"),
    password: Yup.string().required().min(2, "Password cannot be empty")
});
