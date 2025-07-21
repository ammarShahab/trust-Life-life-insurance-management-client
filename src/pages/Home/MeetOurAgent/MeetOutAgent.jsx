import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";

const MeetOurAgent = () => {
  const axiosInstance = useAxios();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["limited-agents"],
    queryFn: async () => {
      const res = await axiosInstance.get("/limited-agents");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-r from-[#e0f7fa] via-[#f0fdfa] to-[#e0f7fa]">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-transparent bg-clip-text">
          Meet Our Trusted Agents
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mt-4 max-w-xl mx-auto">
          At Trust Life, our agents ensure personalized service and expert
          guidance. Discover a few of our most dedicated team members below.
        </p>
      </div>

      <Marquee pauseOnHover speed={30} gradient={false}>
        <div className="flex justify-center gap-6 max-w-7xl mx-auto">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="w-72 sm:w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-green-500"
            >
              <div className="mt-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-300 shadow-md bg-green-100 mx-auto flex items-center justify-center text-green-700 text-2xl font-bold">
                  <img
                    src={agent.photoURL}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-green-800">
                  {agent.customerName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{agent.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default MeetOurAgent;
