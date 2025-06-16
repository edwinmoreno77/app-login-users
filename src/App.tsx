import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AppLayout } from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
}

export default App;
