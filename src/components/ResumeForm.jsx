import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import FormSection from './FormSection';
import DynamicFieldArray from './DynamicFieldArray';
import { InputField, TextAreaField } from './FormFields';

const ResumeForm = () => {
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      summary: '',
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      skills: ''
    }
  });

  const educationArray = useFieldArray({ control, name: "education" });
  const experienceArray = useFieldArray({ control, name: "experience" });
  const projectsArray = useFieldArray({ control, name: "projects" });
  const certificationsArray = useFieldArray({ control, name: "certifications" });

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
      className="space-y-8"
    >
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            register={register}
            name="fullName"
          />
          <InputField
            label="Email"
            register={register}
            name="email"
            type="email"
          />
          <InputField
            label="Phone"
            register={register}
            name="phone"
          />
          <InputField
            label="LinkedIn"
            register={register}
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <TextAreaField
          label="Professional Summary"
          register={register}
          name="summary"
          rows={4}
          className="mt-4"
        />
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

      <FormSection title="Certifications">
        <DynamicFieldArray
          fields={certificationsArray.fields}
          append={certificationsArray.append}
          remove={certificationsArray.remove}
          register={register}
          title="Certification"
          basePath="certifications"
        />
      </FormSection>

      <FormSection title="Projects">
        <DynamicFieldArray
          fields={projectsArray.fields}
          append={projectsArray.append}
          remove={projectsArray.remove}
          register={register}
          title="Project"
          basePath="projects"
        />
      </FormSection>

      <FormSection title="Skills">
        <TextAreaField
          label="Skills"
          register={register}
          name="skills"
          rows={3}
          placeholder="Enter your skills (comma separated)"
        />
      </FormSection>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Generate Resume
        </button>
      </div>
    </motion.form>
  );
};

export default ResumeForm;