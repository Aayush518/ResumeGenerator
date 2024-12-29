import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const DynamicFieldArray = ({ fields, append, remove, register, title, basePath }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          type="button"
          onClick={() => append({})}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add {title}
        </button>
      </div>
      <AnimatePresence>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative bg-gray-50 p-4 rounded-lg"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            {Object.keys(field).filter(key => key !== 'id').map(key => (
              <div key={key} className="mt-3">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  {...register(`${basePath}.${index}.${key}`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DynamicFieldArray;