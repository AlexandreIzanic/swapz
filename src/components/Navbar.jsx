import { Link } from "react-router-dom";
import userStore from "../store/user";

const Navbar = () => {
  const user = userStore((state) => state.user);

  return (
    <nav className="">
      <div className="flex justify-between px-10 py-5 h-full">
        <Link to="/" className="font-black text-3xl">
          SWAPZ
        </Link>

        <Link
          to="/profile"
          className="bg-green-200 rounded-lg w-11 text-black font-bold flex justify-center items-center"
        >
          {user?.username[0]}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
