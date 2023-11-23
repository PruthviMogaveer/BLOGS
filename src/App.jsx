import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className=" flex-col min-h-screen">
      <div className="flex flex-wrap relative z-0">
        <div className="absolute top-[-9rem] left-[-9rem] w-[55rem] h-[30rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:left-[-30px] max-lg:w-[75rem]"></div>
        <div className="absolute top-[-9rem] right-[-10rem] w-[38rem] h-[40rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:hidden"></div>
      </div>
      {!loading ? (
        <>
          <div className=" relative z-20">
            <Header />
          </div>
          <main className="min-h-screen relative z-10">
            <Outlet />
          </main>
          <div className="relative mt-auto z-10 min-w-full">
            <Footer></Footer>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen bg-white opacity-40 relative z-10"></div>
        </>
      )}
    </div>
  );
}

export default App;
