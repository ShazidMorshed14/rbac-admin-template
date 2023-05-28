import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./auth/AuthWrapper";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AuthWrapper />
        </MantineProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
