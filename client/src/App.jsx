import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//Context
import { UserProvider } from "./context/UserContext";

//Pages
import RootLayout from "./pages/RootLayout";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ScorePage from "./pages/ScorePage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./pages/PrivateRoute";
import { SoundProvider } from "./context/SoundContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserProvider />}>
        <Route element={<SoundProvider />}>
          <Route element={<RootLayout />}>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/score" element={<ScorePage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
