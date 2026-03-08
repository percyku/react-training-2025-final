import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FrontendLayout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
