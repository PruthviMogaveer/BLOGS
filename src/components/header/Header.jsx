import { LogoutBtn, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { headerLogo } from "../../assets/images";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: false },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="p-2">
      <Container>
        <nav className="flex flex-wrap relative mx-20 ">
          <div className="mx-4 max-lg:mx-[-4rem]">
            <Link to="/">
              <img
                src={headerLogo}
                alt="headerLogo"
                className="h-14 w-32 max-lg:h-8 max-lg:w-20 "
              />
            </Link>
          </div>
          <ul
            className={`flex justify-center items-center space-x-14 absolute ${
              authStatus ? "left-96 max-lg:left-[0rem]" : "right-6"
            } top-3 max-lg:right-[-4rem] max-lg:top-[0.15rem]`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-primary font-semibold text-lg max-lg:text-sm hover:border-b-2 hover:border-primary transition duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="absolute right-[-22rem] max-lg:right-[-2rem] max-lg:top-[-2px]">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
