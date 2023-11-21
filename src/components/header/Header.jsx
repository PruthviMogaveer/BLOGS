import { LogoutBtn, Container } from "../index";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { headerLogo } from "../../assets/images";
import { useEffect, useState } from "react";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [positionEnd, setPositionEnd] = useState(!authStatus);
  // const navigate = useNavigate();

  useEffect(() => setPositionEnd(!authStatus), [authStatus]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
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
                positionEnd
                  ? "items-end justify-end max-lg:absolute max-lg:right-[-5rem]"
                  : "justify-center items-center"
              } space-x-14 max-sm:space-x-5 w-full`}
            >
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      // onClick={() => navigate(item.slug)} if we use button we use this insted of to
                      className={({ isActive }) =>
                        isActive
                          ? "border-b-2 border-primary text-primary font-semibold text-lg max-lg:text-sm hover:border-b-2 hover:border-primary transition duration-300"
                          : "text-primary font-semibold text-lg max-lg:text-sm hover:border-b-2 hover:border-primary transition duration-300"
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="absolute w-full flex items-end justify-end max-lg:top-[-2px] max-lg:right-[-5rem] max-sm:right-[-6rem]">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
