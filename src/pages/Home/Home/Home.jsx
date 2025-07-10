import Banner from "../HeroSlider/HeroSlider";
import { Suspense, use } from "react";
import FeaturedPackages from "../FeaturedPackages/FeaturedPackages";
import AuthContext from "../../../context/AuthContext/AuthContext";
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";
import Loading from "../../../components/Loading/Loading";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import HeroSlider from "../HeroSlider/HeroSlider";
import Benefits from "../Benefits/Benefits";

const featuredPackagesPromise = fetch(
  "https://b11a11-server-side-ashahab007.vercel.app/featured-packages"
  // "http://localhost:3000/featured-packages"
).then((res) => res.json());

const Home = () => {
  const { isLoading } = use(AuthContext);
  return (
    <>
      <HeroSlider></HeroSlider>
      <Suspense fallback={<Loading></Loading>}>
        <Benefits></Benefits>
      </Suspense>
      <GalleryCarousel></GalleryCarousel>
      {/* <WhyChooseUs></WhyChooseUs> */}
    </>
  );
};

export default Home;
