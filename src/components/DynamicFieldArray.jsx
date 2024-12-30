import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { InputField, TextAreaField } from './FormFields';

const DynamicFieldArray = ({ fields, append, remove, register, title, basePath }) => {
  const getFieldTemplate = () => {
    switch (basePath) {
      case 'education':
        return { institution: '', degree: '', year: '' };
      case 'experience':
        return { company: '', position: '', duration: '', description: '' };
      case 'projects':
        return { name: '', technologies: '', description: '', link: '' };
      case 'certifications':
        return { name: '', issuer: '', date: '', credentialId: '', url: '' };
      default:
        return {};
    }
  };

  const renderFields = (field, index) => {
    switch (basePath) {
      case 'education':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Institution"
                register={register}
                name={`${basePath}.${index}.institution`}
              />
              <InputField
                label="Year"
                register={register}
                name={`${basePath}.${index}.year`}
              />
            </div>
            <InputField
              label="Degree"
              register={register}
              name={`${basePath}.${index}.degree`}
            />
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Company"
                register={register}
                name={`${basePath}.${index}.company`}
              />
              <InputField
                label="Duration"
                register={register}
                name={`${basePath}.${index}.duration`}
                placeholder="e.g., 2020 - Present"
              />
            </div>
            <InputField
              label="Position"
              register={register}
              name={`${basePath}.${index}.position`}
            />
            <TextAreaField
              label="Description"
              register={register}
              name={`${basePath}.${index}.description`}
              rows={3}
            />
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Project Name"
                register={register}
                name={`${basePath}.${index}.name`}
              />
              <InputField
                label="Technologies"
                register={register}
                name={`${basePath}.${index}.technologies`}
                placeholder="e.g., React, Node.js, MongoDB"
              />
            </div>
            <TextAreaField
              label="Description"
              register={register}
              name={`${basePath}.${index}.description`}
              rows={3}
            />
            <InputField
              label="Project Link"
              register={register}
              name={`${basePath}.${index}.link`}
              placeholder="https://"
            />
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Certification Name"
                register={register}
                name={`${basePath}.${index}.name`}
              />
              <InputField
                label="Issuing Organization"
                register={register}
                name={`${basePath}.${index}.issuer`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Date"
                register={register}
                name={`${basePath}.${index}.date`}
                placeholder="MM/YYYY"
              />
              <InputField
                label="Credential ID"
                register={register}
                name={`${basePath}.${index}.credentialId`}
              />
            </div>
            <InputField
              label="Credential URL"
              register={register}
              name={`${basePath}.${index}.url`}
              placeholder="https://"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          type="button"
          onClick={() => append(getFieldTemplate())}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-1.5" />
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
            className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            {renderFields(field, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default DynamicFieldArray;