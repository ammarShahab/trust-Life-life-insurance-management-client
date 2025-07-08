import React from "react";
import { motion } from "motion/react";

const TextAnimationGallery = () => {
  return (
    <motion.h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 dark:text-white"
      animate={{
        color: ["#B2F1F0", "#3ED6B5", "#00B2A9", "#006769", "#114232"],
        transition: { duration: 5, repeat: Infinity },
      }}
    >
      Moments in Motion
    </motion.h2>
  );
};

export default TextAnimationGallery;
