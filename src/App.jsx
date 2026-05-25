import { BrowserRouter } from "react-router-dom";
import { InitialLoadProvider } from "./context/InitialLoadContext";
import ScrollRestoration from "./components/layout/ScrollRestoration";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <InitialLoadProvider>
        <ScrollRestoration />
        <AppRoutes />
      </InitialLoadProvider>
    </BrowserRouter>
  );
}

export default App;
