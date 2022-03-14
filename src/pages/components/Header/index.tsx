import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <img
        alt="logo"
        src="/harry-potter-logo.png"
        className="w-36 h-36 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default Header;
