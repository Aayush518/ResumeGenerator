import React from 'react';
import { motion } from 'framer-motion';

const FormSection = ({ title, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {title}
        </h3>
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default FormSection;