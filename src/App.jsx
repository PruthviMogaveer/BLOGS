import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import PostForm from "./components/Post-Form/PostForm";

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

  return !loading ? (
    <div className=" flex-col">
      <div className="flex flex-wrap relative z-0">
        <div className="absolute top-[-9rem] left-[-9rem] w-[55rem] h-[30rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:left-[-30px] max-lg:w-[75rem]"></div>
        <div className="absolute top-[-9rem] right-[-10rem] w-[38rem] h-[40rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:hidden"></div>
      </div>
      <div className=" relative z-10">
        <Header />
      </div>
      <div className="min-h-screen relative z-10">
        <PostForm />
      
        <Outlet />
      </div>

      <div className="relative mt-auto z-10 min-w-full">
        <Footer></Footer>
      </div>
    </div>
  ) : (
    <div className=" flex-col">
      <div className="flex flex-wrap relative z-0">
        <div className="absolute top-[-9rem] left-[-9rem] w-[55rem] h-[30rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:left-[-30px] max-lg:w-[75rem]"></div>
        <div className="absolute top-[-9rem] right-[-10rem] w-[38rem] h-[40rem] rounded-[80px] rotate-[10deg] bg-yellow z-0 max-lg:hidden"></div>
      </div>
    </div>
  );
}

export default App;
