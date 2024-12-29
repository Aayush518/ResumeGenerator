import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import FormSection from './FormSection';
import DynamicFieldArray from './DynamicFieldArray';

const ResumeForm = () => {
  const { register, control, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      education: [{ institution: '', degree: '', year: '' }],
      experience: [{ company: '', position: '', description: '', duration: '' }],
      projects: [{ name: '', technologies: '', description: '', link: '' }]
    }
  });

  const educationArray = useFieldArray({ control, name: "education" });
  const experienceArray = useFieldArray({ control, name: "experience" });
  const projectsArray = useFieldArray({ control, name: "projects" });

  // Watch for changes to update preview in real-time
  const formData = watch();
  React.useEffect(() => {
    const event = new CustomEvent('resumeDataUpdate', { detail: formData });
    window.dispatchEvent(event);
  }, [formData]);

  const onSubmit = (data) => {
    const event = new CustomEvent('resumeDataUpdate', { detail: data });
    window.dispatchEvent(event);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-white p-8 rounded-xl shadow-lg"
    >
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              {...register("fullName", { required: "Name is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              {...register("phone")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              {...register("linkedin")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            {...register("summary")}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </FormSection>

      <FormSection title="Education">
        <DynamicFieldArray
          fields={educationArray.fields}
          append={educationArray.append}
          remove={educationArray.remove}
          register={register}
          title="Education"
          basePath="education"
        />
      </FormSection>

      <FormSection title="Experience">
        <DynamicFieldArray
          fields={experienceArray.fields}
          append={experienceArray.append}
          remove={experienceArray.remove}
          register={register}
          title="Experience"
          basePath="experience"
        />
      </FormSection>

      <FormSection title="Projects">
        <DynamicFieldArray
          fields={projectsArray.fields}
          append={projectsArray.append}
          remove={projectsArray.remove}
          register={register}
          title="Projects"
          basePath="projects"
        />
      </FormSection>

      <FormSection title="Skills">
        <div>
          <textarea
            {...register("skills")}
            placeholder="Enter your skills (comma separated)"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </FormSection>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Generate Resume
        </button>
      </div>
    </motion.form>
  );
};

export default ResumeForm;