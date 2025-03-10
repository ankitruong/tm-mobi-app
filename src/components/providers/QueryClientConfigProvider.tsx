import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const QueryClientConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

QueryClientConfigProvider.displayName = "QueryClientConfigProvider";

export default QueryClientConfigProvider;
