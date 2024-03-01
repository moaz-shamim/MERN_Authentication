import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Auth App
        </h1>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className=" hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <li className=" hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
