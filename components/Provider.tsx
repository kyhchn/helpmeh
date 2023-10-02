"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
