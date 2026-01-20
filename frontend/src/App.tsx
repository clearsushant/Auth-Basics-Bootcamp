import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./components/Routes";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppHeader />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
