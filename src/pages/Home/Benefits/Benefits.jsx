import {
  FaCalculator,
  FaHeadset,
  FaLaptopCode,
  FaLock,
  FaChartLine,
  FaUserCircle,
} from "react-icons/fa";

const features = [
  {
    title: "Instant Quote Calculation",
    subtitle: "Fast and Accurate Pricing",
    description:
      "Generate precise quotes instantly with our streamlined calculator, saving you time and effort.",
    icon: <FaCalculator className="text-3xl mr-3" />,
    gradient: "from-[#8dd95d] to-green-400",
  },
  {
    title: "Expert Agent Support",
    subtitle: "Round-the-Clock Assistance",
    description:
      "Connect with our expert agents anytime for personalized guidance and support.",
    icon: <FaHeadset className="text-3xl mr-3" />,
    gradient: "from-[#93c8ed] to-blue-400",
  },
  {
    title: "100% Online Application",
    subtitle: "Effortless Digital Process",
    description:
      "Apply entirely online with a simple, paperless process designed for convenience.",
    icon: <FaLaptopCode className="text-3xl mr-3" />,
    gradient: "from-[#b9a447] to-yellow-400",
  },
  {
    title: "Secure Online Payments",
    subtitle: "Safe Transactions Guaranteed",
    description:
      "Pay securely with our encrypted online payment system, ensuring your data is protected.",
    icon: <FaLock className="text-3xl mr-3" />,
    gradient: "from-[#8cda5d] to-green-500",
  },
  {
    title: "Real-Time Claim Tracking",
    subtitle: "Live Status Updates",
    description:
      "Track your claims in real-time with clear, up-to-date progress reports.",
    icon: <FaChartLine className="text-3xl mr-3" />,
    gradient: "from-[#93c8ed] to-blue-500",
  },
  {
    title: "Personalized Dashboard Access",
    subtitle: "Your Custom Hub",
    description:
      "Manage your account and preferences through a tailored, user-friendly dashboard.",
    icon: <FaUserCircle className="text-3xl mr-3" />,
    gradient: "from-[#b9a447] to-yellow-500",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#deecf6] dark:bg-gray-900 py-16 px-4 mx-auto">
      <div className=" mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#baa53a] to-[#fcd547] bg-clip-text text-transparent">
          Benefits of Trust Life
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Discover how Trust Life simplifies your insurance journey — from
          instant quotes to real-time claim tracking and more.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.gradient} rounded-lg shadow-lg p-6 text-white transition-transform hover:scale-[1.02] duration-300 text-center`}
          >
            <div className="flex flex-col justify-center items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>
            <p className="text-sm mb-2 font-semibold">{feature.subtitle}</p>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
