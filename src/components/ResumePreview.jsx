import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateLatex } from '../utils/latexGenerator';
import { generatePDF } from '../utils/pdfGenerator';

const ResumePreview = () => {
  const [data, setData] = useState(null);
  const [latexCode, setLatexCode] = useState('');

  useEffect(() => {
    const handleResumeDataUpdate = (event) => {
      const newData = event.detail;
      setData(newData);
      setLatexCode(generateLatex(newData));
    };

    window.addEventListener('resumeDataUpdate', handleResumeDataUpdate);
    return () =>
      window.removeEventListener('resumeDataUpdate', handleResumeDataUpdate);
  }, []);

  if (!data?.fullName) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-xl shadow-lg h-full flex items-center justify-center text-gray-500"
      >
        Start filling the form to see your resume preview here
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(latexCode);
                alert('LaTeX code copied to clipboard!');
              }}
              className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Copy LaTeX
            </button>
            <button
              onClick={() => {
                const doc = generatePDF(data);
                doc.save('resume.pdf');
              }}
              className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="prose max-w-none">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            {data.fullName}
          </h1>
          <div className="text-center text-sm text-gray-600 space-x-2">
            <span>{data.email}</span>
            {data.phone && (
              <>
                <span>•</span>
                <span>{data.phone}</span>
              </>
            )}
            {data.linkedin && (
              <>
                <span>•</span>
                <span>{data.linkedin}</span>
              </>
            )}
          </div>

          {data.summary && (
            <>
              <h2 className="text-xl font-semibold mt-6">Summary</h2>
              <p className="text-gray-700">{data.summary}</p>
            </>
          )}

          {data.education?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  <p className="text-gray-600">{edu.year}</p>
                </div>
              ))}
            </>
          )}

          {data.experience?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="font-medium">{exp.position}</p>
                  <p className="text-gray-600">{exp.duration}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </>
          )}

          {data.projects?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-600">{project.technologies}</p>
                  <p className="text-gray-700">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </>
          )}

          {data.skills && (
            <>
              <h2 className="text-xl font-semibold mt-6">Skills</h2>
              <p className="text-gray-700">{data.skills}</p>
            </>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">LaTeX Code</h3>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
            <code>{latexCode}</code>
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePreview;
