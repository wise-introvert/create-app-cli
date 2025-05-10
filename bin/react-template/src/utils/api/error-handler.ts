import { isAxiosError, type AxiosError } from "axios";
import { get } from 'lodash'

export const parseError = (error: unknown): Error => {
    if (isAxiosError(error)) {
        const axiosError: AxiosError = error as AxiosError;
        const { response, status } = axiosError;
        console.log(`status: ${status}`)
        const data: any = response?.data;
        const message: string = get(data, "message", "Something went wrong!")

        /*
        if(status == 401 || status == 403) {
            document.cookie = "session=false;"
            window.location.href = "/"
            return new Error(message)
        }
        */

        return new Error(message);
    } else {
        return new Error("Something went wrong.");
    }
};
