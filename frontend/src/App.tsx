import { Toaster } from "react-hot-toast";
import { useRoute } from "./utils/useRoute";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./public_pages/ProtectedRoute";
import SessionSync from "./components/SessionSync";

function App() {
  const route = useRoute();

  return (
    <>
      <SessionSync />
      <Routes>
        {route.map(({ link, element: Element, isProtected }, index) => {
          if (isProtected) {
            return (
              <Route
                path={link}
                element={
                  <ProtectedRoute>
                    <Element />
                  </ProtectedRoute>
                }
                key={index}
              />
            );
          }
          return <Route path={link} element={<Element />} key={index} />;
        })}
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
