import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedInIcon } from './Icons';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 border-t border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://github.com/Aayush518"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/aayush518"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-gray-500">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/Aayush518"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Aayush518
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;