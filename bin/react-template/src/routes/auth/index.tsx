import { type FC, type ReactElement } from "react";
import { Outlet } from "react-router";
import { Card, Container, Center } from "@chakra-ui/react";

import { Toaster } from "@/components/ui/toaster";

export const AuthPage: FC = (): ReactElement => {
    return (
        <Container h={"dvh"} w={"dvw"}>
            <Center h={"full"} w={"full"}>
                <Card.Root variant={"outline"}>
                    <Card.Header>
                        <Card.Title>Authentication</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Outlet />
                    </Card.Body>
                </Card.Root>
            </Center>
            <Toaster />
        </Container>
    );
};
