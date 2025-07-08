import Banner from "../Banner/Banner";
import { Suspense, use } from "react";
import FeaturedPackages from "../FeaturedPackages/FeaturedPackages";
import AuthContext from "../../../context/AuthContext/AuthContext";
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";
import Loading from "../../../components/Loading/Loading";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const featuredPackagesPromise = fetch(
  "https://b11a11-server-side-ashahab007.vercel.app/featured-packages"
  // "http://localhost:3000/featured-packages"
).then((res) => res.json());

const Home = () => {
  const { isLoading } = use(AuthContext);
  return (
    <>
      <Banner></Banner>
      <Suspense fallback={<Loading></Loading>}>
        <FeaturedPackages
          featuredPackagesPromise={featuredPackagesPromise}
        ></FeaturedPackages>
      </Suspense>
      <GalleryCarousel></GalleryCarousel>
      <WhyChooseUs></WhyChooseUs>
    </>
  );
};

export default Home;
