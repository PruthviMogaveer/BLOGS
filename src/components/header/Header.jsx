import { LogoutBtn, Container } from "../index";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { headerLogo } from "../../assets/images";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [authenticated, setAuthenticated] = useState(authStatus);
  // const navigate = useNavigate();

  useEffect(() => setAuthenticated(authStatus), [authStatus]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove event listener when the component unmounts to avoid memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      name: "My Post",
      slug: "/my-post",
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
        <nav className="flex flex-wrap relative mx-20">
          <div className="mx-4 max-lg:mx-[-4rem] max-sm:mx-[-5.5rem]">
            <Link to="/">
              <img
                src={headerLogo}
                alt="headerLogo"
                className="h-14 w-32 max-lg:h-8 max-lg:w-20 "
              />
            </Link>
          </div>
          <div className="w-full absolute max-lg:top-0 top-3">
            <ul
              className={`flex  ${
                authenticated
                  ? `justify-center items-center max-sm:flex-col max-sm:space-x-0 ${
                      menuOpen && "max-sm:h-screen"
                    } `
                  : "items-end justify-end max-lg:absolute max-lg:right-[-5rem]"
              } space-x-14 max-sm:space-x-5 w-full`}
            >
              <div
                className={`flex space-x-14 max-sm:space-x-5 w-full ${
                  authenticated
                    ? `justify-center items-center max-sm:justify-start max-sm:fixed ${
                        menuOpen
                          ? "max-sm:right-0 transition-all duration-1000"
                          : "max-sm:-right-[13rem] transition-all duration-1000"
                      } max-sm:z-20 max-sm:w-[13rem] max-sm:top-0 max-sm:space-y-5 max-sm:pt-7 max-sm:flex-col max-sm:space-x-0 max-sm:bg-white max-sm:h-screen`
                    : "items-end justify-end "
                }`}
              >
                <div
                  className="relative -left-16"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon fontSize="large" />
                </div>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        // onClick={() => navigate(item.slug)} if we use button we use this insted of to
                        className={({ isActive }) =>
                          isActive
                            ? `${
                                authenticated && "max-sm:text-lg"
                              } border-b-2 border-primary text-primary font-semibold text-lg max-lg:text-sm hover:border-b-2 hover:border-primary transition duration-300`
                            : `${
                                authenticated && "max-sm:text-lg"
                              } text-primary font-semibold text-lg max-lg:text-sm hover:border-b-2 hover:border-primary transition duration-300`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null
                )}
              </div>
              {authStatus && (
                <li className="absolute right-0 flex items-end max-sm:space-x-3 max-sm:-top-1 justify-end max-lg:top-[-2px] max-lg:right-[-5rem] max-sm:right-[-6rem]">
                  <LogoutBtn />
                  {windowWidth < 640 && (
                    <div
                      className="relative top-1"
                      onClick={() => setMenuOpen(true)}
                    >
                      <MenuIcon fontSize="large" />
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
          <div></div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
