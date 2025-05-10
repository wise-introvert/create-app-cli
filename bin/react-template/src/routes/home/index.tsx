import { type FC, type ReactElement } from "react";
import { Spinner, Container, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";

import { me } from "../../utils/api";

export const HomePage: FC = (): ReactElement<any> => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["me"],
        queryFn: me,
        retry: false
    });

    return (
        <Container h={"100vh"}>
            <Center h={"full"}>
                {isLoading ? (
                    <Spinner size={"xl"} />
                ) : error ? (
                    <Navigate to={"/auth"} />
                ) : data ? (
                    <Navigate to={"/dashboard"} />
                ) : (
                    <Spinner />
                )}
            </Center>
        </Container>
    );
};
