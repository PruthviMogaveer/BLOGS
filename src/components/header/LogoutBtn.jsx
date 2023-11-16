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
    <button className="text-primary font-semibold text-lg max-lg:text-sm border-primary border px-4 py-1 rounded-2xl bg-transparent transition duration-300 hover:bg-primary hover:text-yellow">
      Logout
    </button>
  );
};

export default LogoutBtn;
