import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./helper/supabaseClient";
import userStore from "./store/user";
import Clients from "./pages/Clients";
import Sidebar from "./components/Sidebar";
import { Toaster } from "./components/ui/toaster";
import ProjectsPaided from "./pages/ProjectsPaided";
import Settings from "./pages/Settings";

function App() {
  const [session, setSession] = useState(null);
  const fetchUser = userStore((state) => state.fetchUser);
  const user = userStore((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session)
    return (
      <div className="bg-[#121412] flex justify-center items-center   h-screen w-full m-auto  ">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );

  return (
    <div className="bg-[#121412] flex flex-col h-screen text-white ">
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <div className="flex h-full">
          <Sidebar />

          <div className="bg-[#121412] w-full ">
            <Routes>
              <Route index path="/" element=<Home /> />
              <Route index path="/projects" element=<Projects /> />
              <Route index path="/projects-paided" element=<ProjectsPaided /> />
              <Route index path="/clients" element=<Clients /> />
              <Route index path="/profile" element=<Settings /> />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
