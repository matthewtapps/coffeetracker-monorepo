import { router } from "./router";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
