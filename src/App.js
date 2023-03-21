import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRouter, publicRoute } from "./components/routers/route";
export const UserStore = createContext();
function App() {
  const [role, setRole] = useState("role_Admin");
  return (
    <BrowserRouter>
      <UserStore.Provider value={role}>
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
            {role === "role_Admin" &&
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
        </div>
      </UserStore.Provider>
    </BrowserRouter>
  );
}

export default App;
