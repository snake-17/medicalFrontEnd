import CardWelcome from "../sections/home/CardWelcome";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import QuickActions from "../sections/home/QuickActions";

function HomePage() {
  return (
    <>
      <Navbar />
      <CardWelcome />
      <QuickActions />
      <Footer />
    </>
  );
}
export default HomePage;
