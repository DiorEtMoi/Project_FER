import { createContext, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRouter, publicRoute } from "./components/routers/route";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loading from "./components/loading/Loading";
export const UserStore = createContext();
function App() {
  const [role, setRole] = useState(null);
  const cache = useRef({});
  const auth = useSelector((state) => state?.auth);
  return (
    <BrowserRouter>
      <UserStore.Provider value={{ role, setRole, cache }}>
        <div className="App">
          <Routes>
            {publicRoute?.map((item, index) => {
              const Page = item?.element;
              return item?.layout ? (
                <Route
                  path={item?.path}
                  key={index + "route"}
                  element={
                    <item.layout>
                      <Page />
                    </item.layout>
                  }
                />
              ) : (
                <Route
                  path={item?.path}
                  key={index + "route"}
                  element={<Page />}
                />
              );
            })}
            {role?.role === "role_admin" &&
              privateRouter?.map((item, index) => {
                const Page = item?.element;
                return item?.layout ? (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={
                      <item.layout>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={<Page />}
                  />
                );
              })}
          </Routes>
          {auth.loading && <Loading />}
          <ToastContainer />
        </div>
      </UserStore.Provider>
    </BrowserRouter>
  );
}

export default App;
