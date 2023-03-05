import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projekt1 from './pages/Projekt1';
import Homepage from './pages/Homepage';
import Projekt2 from "./pages/Projekt2";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/projekt1",
    element: <Projekt1 />,
  },
  {
    path: "/projekt2",
    element: <Projekt2 />,
  },
]);

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
