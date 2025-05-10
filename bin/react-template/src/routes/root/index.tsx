import { Fragment, type FC, type ReactElement } from "react";
import { Outlet, Link, Navigate } from "react-router";
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ColorModeButton } from "@/components/ui/color-mode";
import { me } from '../../utils/api'

export const Root: FC = (): ReactElement<any> => {
    const [_, setCookie] = useCookies(['session'], {
        doNotUpdate: true
    });

    const { isLoading, error } = useQuery({
        queryKey: ["me"],
        queryFn: me,
        retry: false
    });

    if(!isLoading && error) {
        setCookie("session", false)
        return <Navigate to={"/auth"}/>
    }

    return (
        <Fragment>
            <header>
                <nav>
                    <ul
                        style={{
                            textDecoration: "none",
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            alignItems: "center",
                            justifyContent: "flex-end"
                        }}
                    >
                        <li>
                            <Link to={"/"} viewTransition>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={"/auth"} viewTransition>
                                Auth
                            </Link>
                        </li>
                        <li>
                            <Link to={"/dashboard"} viewTransition>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <ColorModeButton />
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
};
