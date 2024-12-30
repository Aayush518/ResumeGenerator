import React from 'react';

export const InputField = ({ label, register, name, type = "text", placeholder = "", className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
    />
  </div>
);

export const TextAreaField = ({ label, register, name, rows = 3, placeholder = "", className = "" }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...register(name)}
      rows={rows}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
    />
  </div>
);