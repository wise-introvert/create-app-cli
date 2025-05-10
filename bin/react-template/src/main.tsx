import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

import { Provider } from "@/components/ui/provider";
import { Routes } from "./routes";

const client: QueryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CookiesProvider>
            <Provider>
                <QueryClientProvider client={client}>
                    <Routes />
                </QueryClientProvider>
            </Provider>
        </CookiesProvider>
    </StrictMode>
);
