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
    description:
      "Generate precise quotes instantly with our streamlined calculator, saving you time and effort.",
    icon: <FaCalculator className="text-4xl text-green-800" />,
    gradient: "from-[#8dd95d] to-green-400",
  },
  {
    title: "Expert Agent Support",
    description:
      "Connect with our expert agents anytime for personalized guidance and support.",
    icon: <FaHeadset className="text-4xl text-blue-800" />,
    gradient: "from-[#93c8ed] to-blue-400",
  },
  {
    title: "100% Online Application",
    description:
      "Apply entirely online with a simple, paperless process designed for convenience.",
    icon: <FaLaptopCode className="text-4xl text-yellow-700" />,
    gradient: "from-[#b9a447] to-yellow-400",
  },
  {
    title: "Secure Online Payments",
    description:
      "Pay securely with our encrypted online payment system, ensuring your data is protected.",
    icon: <FaLock className="text-4xl text-green-900" />,
    gradient: "from-[#8cda5d] to-green-500",
  },
  {
    title: "Real-Time Claim Tracking",
    description:
      "Track your claims in real-time with clear, up-to-date progress reports.",
    icon: <FaChartLine className="text-4xl text-blue-900" />,
    gradient: "from-[#93c8ed] to-blue-500",
  },
  {
    title: "Personalized Dashboard Access",
    description:
      "Manage your account and preferences through a tailored, user-friendly dashboard.",
    icon: <FaUserCircle className="text-4xl text-yellow-800" />,
    gradient: "from-[#b9a447] to-yellow-500",
  },
];

const Benefits = () => {
  return (
    <section className="bg-[#deecf6] dark:bg-gray-900 py-16 px-4 mx-auto">
      <div className="mx-auto text-center mb-12 mt-10">
        <h2
          className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(#74b5f1, #c6a84e,#70d778,  #c6a84e, #74b5f1)",
          }}
        >
          Benefits of Trust Life
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Discover how Trust Life simplifies your insurance journey — from
          instant quotes to real-time claim tracking and more.
        </p>
      </div>

      <div className="max-w-7xl px-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.gradient} rounded-lg shadow-lg p-6 text-white transition-transform hover:scale-[1.02] duration-300 text-center`}
          >
            <div className="flex flex-col justify-center items-center gap-2 mb-4">
              {feature.icon}
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm text-white">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
