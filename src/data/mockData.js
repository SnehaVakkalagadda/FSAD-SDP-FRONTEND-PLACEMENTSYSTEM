export const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    type: 'full-time',
    salary: '₹8-12 LPA',
    description: 'We are looking for a talented Software Engineer to join our dynamic team. You will work on cutting-edge technologies and solve complex problems.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong knowledge of JavaScript, React, Node.js',
      'Experience with databases (SQL, MongoDB)',
      'Good problem-solving skills',
      'CGPA above 7.0'
    ],
    responsibilities: [
      'Design and develop scalable web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews'
    ],
    postedDate: '2026-02-15',
    deadline: '2026-03-15',
    employerId: 'emp1',
    applicantsCount: 24
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    company: 'Analytics Hub',
    location: 'Mumbai, India',
    type: 'internship',
    salary: '₹25,000/month',
    description: 'Join our analytics team as an intern and gain hands-on experience with real-world data projects.',
    requirements: [
      'Pursuing Bachelor\'s or Master\'s in relevant field',
      'Knowledge of Python, SQL',
      'Familiarity with data visualization tools',
      'Strong analytical skills'
    ],
    responsibilities: [
      'Analyze large datasets',
      'Create data visualizations and reports',
      'Support senior analysts in projects',
      'Present findings to stakeholders'
    ],
    postedDate: '2026-02-20',
    deadline: '2026-03-20',
    employerId: 'emp2',
    applicantsCount: 18
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Digital Innovations Inc',
    location: 'Hyderabad, India',
    type: 'full-time',
    salary: '₹6-10 LPA',
    description: 'We need a creative Frontend Developer who can bring designs to life with modern web technologies.',
    requirements: [
      'Strong proficiency in React, TypeScript',
      'Experience with CSS frameworks (Tailwind, Material-UI)',
      'Understanding of responsive design',
      'Portfolio of previous work'
    ],
    responsibilities: [
      'Build user-facing features',
      'Optimize applications for speed',
      'Collaborate with designers',
      'Ensure cross-browser compatibility'
    ],
    postedDate: '2026-02-18',
    deadline: '2026-03-18',
    employerId: 'emp1',
    applicantsCount: 31
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'StartupX',
    location: 'Remote',
    type: 'full-time',
    salary: '₹12-18 LPA',
    description: 'Looking for a Product Manager to drive product strategy and execution.',
    requirements: [
      'MBA or relevant experience',
      'Strong leadership skills',
      'Experience in agile methodologies',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Define product roadmap',
      'Work with engineering and design teams',
      'Conduct market research',
      'Manage product launches'
    ],
    postedDate: '2026-02-22',
    deadline: '2026-03-25',
    employerId: 'emp3',
    applicantsCount: 12
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech Systems',
    location: 'Pune, India',
    type: 'full-time',
    salary: '₹10-15 LPA',
    description: 'Join our infrastructure team to build and maintain scalable cloud solutions.',
    requirements: [
      'Experience with AWS/Azure/GCP',
      'Knowledge of Docker, Kubernetes',
      'CI/CD pipeline experience',
      'Scripting skills (Python, Bash)'
    ],
    responsibilities: [
      'Manage cloud infrastructure',
      'Implement automation tools',
      'Monitor system performance',
      'Ensure security best practices'
    ],
    postedDate: '2026-02-19',
    deadline: '2026-03-19',
    employerId: 'emp2',
    applicantsCount: 15
  },
  {
    id: '6',
    title: 'UI/UX Designer',
    company: 'Design Studio Co',
    location: 'Delhi, India',
    type: 'full-time',
    salary: '₹7-11 LPA',
    description: 'Creative UI/UX Designer needed to create beautiful and intuitive user experiences.',
    requirements: [
      'Proficiency in Figma, Adobe XD',
      'Strong portfolio',
      'Understanding of design principles',
      'Knowledge of HTML/CSS is a plus'
    ],
    responsibilities: [
      'Create wireframes and prototypes',
      'Design user interfaces',
      'Conduct user research',
      'Collaborate with developers'
    ],
    postedDate: '2026-02-21',
    deadline: '2026-03-21',
    employerId: 'emp3',
    applicantsCount: 20
  }
];

export const mockApplications = [
  {
    id: 'app1',
    jobId: '1',
    studentId: 'stu1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@university.edu',
    studentDepartment: 'Computer Science',
    studentCGPA: 8.5,
    resume: 'resume_rahul_sharma.pdf',
    coverLetter: 'I am very interested in this position...',
    status: 'shortlisted',
    appliedDate: '2026-02-16',
    lastUpdated: '2026-02-24'
  },
  {
    id: 'app2',
    jobId: '2',
    studentId: 'stu1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@university.edu',
    studentDepartment: 'Computer Science',
    studentCGPA: 8.5,
    resume: 'resume_rahul_sharma.pdf',
    coverLetter: 'Looking forward to learning from this opportunity...',
    status: 'reviewing',
    appliedDate: '2026-02-21',
    lastUpdated: '2026-02-23'
  },
  {
    id: 'app3',
    jobId: '3',
    studentId: 'stu2',
    studentName: 'Priya Patel',
    studentEmail: 'priya.patel@university.edu',
    studentDepartment: 'Information Technology',
    studentCGPA: 9.1,
    resume: 'resume_priya_patel.pdf',
    coverLetter: 'My experience with React makes me a great fit...',
    status: 'accepted',
    appliedDate: '2026-02-19',
    lastUpdated: '2026-02-25'
  },
  {
    id: 'app4',
    jobId: '1',
    studentId: 'stu3',
    studentName: 'Amit Kumar',
    studentEmail: 'amit.kumar@university.edu',
    studentDepartment: 'Computer Science',
    studentCGPA: 7.8,
    resume: 'resume_amit_kumar.pdf',
    coverLetter: 'Passionate about software development...',
    status: 'pending',
    appliedDate: '2026-02-25',
    lastUpdated: '2026-02-25'
  },
  {
    id: 'app5',
    jobId: '5',
    studentId: 'stu1',
    studentName: 'Rahul Sharma',
    studentEmail: 'rahul.sharma@university.edu',
    studentDepartment: 'Computer Science',
    studentCGPA: 8.5,
    resume: 'resume_rahul_sharma.pdf',
    coverLetter: 'My cloud computing project experience...',
    status: 'rejected',
    appliedDate: '2026-02-20',
    lastUpdated: '2026-02-22'
  }
];

export const mockStudents = [
  {
    id: 'stu1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@university.edu',
    role: 'student',
    department: 'Computer Science',
    graduationYear: 2026,
    cgpa: 8.5,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
  },
  {
    id: 'stu2',
    name: 'Priya Patel',
    email: 'priya.patel@university.edu',
    role: 'student',
    department: 'Information Technology',
    graduationYear: 2026,
    cgpa: 9.1,
    skills: ['React', 'TypeScript', 'UI/UX', 'Figma']
  },
  {
    id: 'stu3',
    name: 'Amit Kumar',
    email: 'amit.kumar@university.edu',
    role: 'student',
    department: 'Computer Science',
    graduationYear: 2027,
    cgpa: 7.8,
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker']
  }
];

export const mockEmployers = [
  {
    id: 'emp1',
    name: 'John Anderson',
    email: 'john@techcorp.com',
    role: 'employer',
    company: 'TechCorp Solutions',
    designation: 'HR Manager',
    industry: 'Information Technology'
  },
  {
    id: 'emp2',
    name: 'Sarah Johnson',
    email: 'sarah@analyticshub.com',
    role: 'employer',
    company: 'Analytics Hub',
    designation: 'Recruitment Lead',
    industry: 'Data Analytics'
  },
  {
    id: 'emp3',
    name: 'Michael Chen',
    email: 'michael@startupx.com',
    role: 'employer',
    company: 'StartupX',
    designation: 'CEO',
    industry: 'Technology'
  }
];

export const mockStats = {
  totalStudents: 450,
  placedStudents: 287,
  totalJobs: 156,
  activeJobs: 42,
  totalApplications: 1834,
  companiesRegistered: 89
};

// Helper function to get current user based on role
export const getCurrentUser = (role) => {
  if (role === 'student') return mockStudents[0];
  if (role === 'employer') return mockEmployers[0];
  return {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@university.edu',
    role
  };
};
