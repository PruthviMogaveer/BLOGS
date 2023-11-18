import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button className="font-montserrat text-primary font-semibold text-lg max-lg:text-sm border-primary border px-4 py-1 rounded-2xl bg-transparent transition-all duration-300 hover:bg-primary hover:text-yellow active:scale-90">
      Logout
    </button>
  );
};

export default LogoutBtn;
