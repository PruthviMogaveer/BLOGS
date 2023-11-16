import { socialMedia } from "../../constants";
import { footerLogo } from "../../assets/images";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-container pt-6 bg-black min-w-full" id="footer">
      <div className="flex justify-around items-start  flex-wrap max-lg:flex-col max-lg:justify-center max-lg:items-center">
        <div className="flex flex-col items-start mx-10">
          <Link to="/" className="flex justify-center items-center ">
            <img src={footerLogo} alt="Footer logo" className="h-15 w-40" />
          </Link>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            <span className="font-bold text-xl text-yellow">Blogs</span> offer a
            user-friendly interface that allows bloggers to easily create and
            manage their posts.
          </p>
        </div>
        <div className="mr-10">
          <div className="flex items-center gap-5 mt-16 ">
            {socialMedia.map((icon) => (
              <div
                className="flex justify-center items-center w-8 h-8 bg-white rounded-full cursor-pointer hover:bg-yellow"
                key={icon.alt}
              >
                <Link to="#footer">
                  <img src={icon.src} alt={icon.alt} height={20} width={20} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            <p>+91 11234567890</p>
            <p>#123 XYZ, ABC</p>
          </div>
        </div>
      </div>

      <div className="flex text-white-400 mt-10  pb-5 flex-col justify-center items-center max-lg:mr-10  ">
        <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer hover:text-slate-gray">
          <CopyrightIcon />
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className="font-montserrat cursor-pointer hover:text-slate-gray">
          {" "}
          Terms & Conditions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
