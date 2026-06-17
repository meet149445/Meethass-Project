import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;