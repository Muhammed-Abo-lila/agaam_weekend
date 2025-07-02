"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const ReactQueryContext = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
export default ReactQueryContext;
