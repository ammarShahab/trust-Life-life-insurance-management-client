import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";

const PopularPolicies = () => {
  const axiosInstance = useAxios();
  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["popular-policies"],
    queryFn: async () => {
      const res = await axiosInstance.get("/popular-policies");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <section className="bg-[#e9f0e9] ">
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h2
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(45, 140, 85, 1) 0%, rgba(82, 122, 66, 1) 60%, rgba(140, 150, 130, 1) 100%)",
          }}
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mt-10 bg-clip-text text-transparent"
        >
          🌟 Most Popular Policies
        </h2>
        <p className="text-center mb-12 mt-3">
          Discover our most chosen insurance policies, selected by thousands of
          satisfied customers. These plans reflect a strong track record of
          trust, reliability, and value. With high purchase volumes and proven
          customer satisfaction
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all  flex flex-col  hover:scale-[1.02] duration-300"
            >
              <img
                src={policy.image}
                alt={policy.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Duration:</strong> {policy.duration}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Popularity:</strong>{" "}
                    <span className="text-green-600 font-medium">
                      {policy.purchasedCount ?? 0} purchased
                    </span>
                  </p>
                </div>
                <Link
                  to={`/policy/${policy._id}`}
                  className="inline-block mt-4 bg-[#baa53a] hover:bg-[#fcd547] transition text-white px-4 py-2 rounded-lg text-sm  text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPolicies;
