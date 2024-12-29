import React from 'react';
import { motion } from 'framer-motion';

const FormSection = ({ title, children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <div className="h-8 w-1 bg-indigo-600 rounded-full mr-3"></div>
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

export default FormSection;