import { Suspense, use } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";
import HeroSlider from "../HeroSlider/HeroSlider";
import Loading from "../../../components/Loading/Loading";
import Benefits from "../Benefits/Benefits";
import PopularPolicies from "../PopularPolicies/PopularPolicies";

const Home = () => {
  const { isLoading } = use(AuthContext);
  return (
    <>
      <HeroSlider></HeroSlider>
      <Suspense fallback={<Loading></Loading>}>
        <Benefits></Benefits>
      </Suspense>
      <PopularPolicies></PopularPolicies>
      <GalleryCarousel></GalleryCarousel>
      {/* <WhyChooseUs></WhyChooseUs> */}
    </>
  );
};

export default Home;
