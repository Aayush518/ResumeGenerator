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
    return () => window.removeEventListener('resumeDataUpdate', handleResumeDataUpdate);
  }, []);

  const renderPreviewContent = () => {
    if (!data) return null;

    return (
      <div className="space-y-6 text-gray-800">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold">{data.fullName}</h2>
          <div className="text-sm space-x-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.linkedin && <span>• {data.linkedin}</span>}
          </div>
        </div>

        {data.summary && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>{data.summary}</p>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="font-medium">{edu.institution}</div>
                <div>{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.year}</div>
              </div>
            ))}
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="font-medium">{exp.company}</div>
                <div className="text-gray-700">{exp.position}</div>
                <div className="text-sm text-gray-600">{exp.duration}</div>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-gray-600">{project.technologies}</div>
                <p className="mt-1">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-indigo-600 hover:text-indigo-800 text-sm">
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {data.certifications?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Certifications</h3>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <div className="font-medium">{cert.name}</div>
                <div className="text-sm">
                  {cert.issuer} • {cert.date}
                </div>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" 
                     className="text-indigo-600 hover:text-indigo-800 text-sm">
                    View Certificate →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {data.skills && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <p>{data.skills}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Resume Preview
        </h2>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigator.clipboard.writeText(latexCode);
              alert('LaTeX code copied to clipboard!');
            }}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow transition-all duration-200"
          >
            Copy LaTeX
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const doc = generatePDF(data);
              doc.save('resume.pdf');
            }}
            className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Download PDF
          </motion.button>
        </div>
      </div>

      {renderPreviewContent()}
    </motion.div>
  );
};

export default ResumePreview;