export const generateLatex = (data) => {
  return `\\documentclass[a4paper,11pt]{article}

\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{graphicx}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\begin{document}

%----------HEADING----------
\\begin{center}
\\textbf{\\Huge \\scshape ${data.fullName}} \\ \\vspace{1pt}
\\small ${data.phone} $|$ \\href{mailto:${data.email}}{\\underline{${data.email}}} $|$
\\href{${data.linkedin}}{\\underline{${data.linkedin}}}
\\end{center}

%-----------SUMMARY-----------
\\section{Summary}
${data.summary}

%-----------EDUCATION-----------
\\section{Education}
\\begin{tabular*}{1.0\\textwidth}{l@{\\extracolsep{\\fill}}r}
\\textbf{${data.education?.institution}} & \\textbf{\\small ${data.education?.degree}}
\\end{tabular*}

%-----------EXPERIENCE-----------
\\section{Experience}
\\begin{tabular*}{1.0\\textwidth}{l@{\\extracolsep{\\fill}}r}
\\textbf{${data.experience?.company}} & \\textbf{\\small ${data.experience?.position}}
\\end{tabular*}
${data.experience?.description}

%-----------SKILLS-----------
\\section{Skills}
${data.skills}

\\end{document}`;
};