import React from "react";
import { motion } from "framer-motion"; // Fix: `motion/react` is incorrect, use `framer-motion`

const TextAnimationGallery = () => {
  return (
    <motion.h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6"
      animate={{
        color: [
          "#ebf0f6", // light from the background
          "#98ccd3", // middle tone
          "#ffffff", // high contrast white
          "#ffecd1", // warm contrast
          "#ffe156", // punch of gold
          "#ffffff", // back to white
        ],
      }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      Our Customers Speak For Us
    </motion.h2>
  );
};

export default TextAnimationGallery;
