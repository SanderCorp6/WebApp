import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                border: "1px solid #101828",
                padding: "13px",
                fontSize: "13px",
                fontWeight: "400",
                color: "#101828",
              },
              iconTheme: {
                primary: "#101828",
                secondary: "#FFFAEE",
              },
              duration: 4000,
            }}
          />
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
