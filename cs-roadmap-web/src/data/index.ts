export const STATIC_NODES: AppNode[] = [
  // Root Nodes
  {
    id: "01",
    name: "Computer Science Core",
    description: "Foundational knowledge for all tech fields.",
    nextNodeIds: ["08", "40", "47"],
  },

  // Tech Root
  {
    id: "08",
    name: "Tech",
    description: "Comprehensive tech domains including development, AI, and data science.",
    nextNodeIds: ["09", "15", "22", "29", "34"],
  },

  // Front-End Development
  {
    id: "09",
    name: "Front-End Development",
    description: "Client-side development technologies.",
    nextNodeIds: ["10", "11", "12"],
  },
  {
    id: "10",
    name: "Web Development",
    description: "Building web interfaces and experiences.",
    nextNodeIds: ["13", "14"],
  },
  {
    id: "11",
    name: "Mobile Development",
    description: "Development for mobile platforms.",
    nextNodeIds: ["16", "17", "18"],
  },
  {
    id: "12",
    name: "Desktop Development",
    description: "Building desktop applications.",
    nextNodeIds: ["19"],
  },
  {
    id: "13",
    name: "HTML, CSS, JavaScript",
    description: "Core technologies for web development.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/frontend"],
  },
  {
    id: "14",
    name: "Frameworks and Tools",
    description: "Technologies like React, Angular, and Webpack.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/react", "https://roadmap.sh/angular"],
  },

  // Mobile Development
  {
    id: "16",
    name: "Android Development",
    description: "Development using Kotlin and Java.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/android"],
  },
  {
    id: "17",
    name: "iOS Development",
    description: "Development using Swift and Objective-C.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/ios"],
  },
  {
    id: "18",
    name: "Cross-Platform Development",
    description: "Tools like Flutter and React Native.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/react-native", "https://roadmap.sh/flutter"],
  },
  {
    id: "19",
    name: "Desktop Development Frameworks",
    description: "Technologies like Electron and .NET.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/aspnet-core"],
  },

  // Back-End Development
  {
    id: "15",
    name: "Back-End Development",
    description: "Server-side development technologies.",
    nextNodeIds: ["20", "21"],
  },
  {
    id: "20",
    name: "Languages and Frameworks",
    description: "Technologies like Node.js, Django, and Spring Boot.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/nodejs"],
  },
  {
    id: "21",
    name: "Databases and APIs",
    description: "Tools like PostgreSQL, MongoDB, REST, and GraphQL.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/mongodb"],
  },

  // Full-Stack Development
  {
    id: "22",
    name: "Full-Stack Development",
    description: "Combining front-end and back-end skills.",
    nextNodeIds: ["23", "24"],
  },
  {
    id: "23",
    name: "MERN and MEVN Stacks",
    description: "MongoDB, Express, React/Vue, Node.js.",
    nextNodeIds: [],
  },
  {
    id: "24",
    name: "JAMStack",
    description: "JavaScript, APIs, and Markup.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/javascript"],
  },

  // Game Development
  {
    id: "29",
    name: "Game Development",
    description: "Development of games using specialized tools.",
    nextNodeIds: ["30", "31", "32"],
  },
  {
    id: "30",
    name: "Game Engines",
    description: "Unity, Unreal Engine, and Godot.",
    nextNodeIds: [],
  },
  {
    id: "31",
    name: "Game Programming",
    description: "Languages like C# and C++.",
    nextNodeIds: [],
    link: ["https://roadmap.sh/cpp"],
  },
  {
    id: "32",
    name: "Asset Creation and Deployment",
    description: "Tools like Blender and Steam deployment.",
    nextNodeIds: [],
  },

  // AI and Machine Learning
  {
    id: "34",
    name: "AI and Machine Learning",
    description: "Technologies for intelligent systems.",
    nextNodeIds: ["35", "36", "37"],
  },
  {
    id: "35",
    name: "Foundations",
    description: "Linear Algebra, Calculus, and Probability.",
    nextNodeIds: [],
  },
  {
    id: "36",
    name: "Specializations",
    description: "NLP, Computer Vision, Generative AI.",
    nextNodeIds: [],
  },
  {
    id: "37",
    name: "Tools and Deployment",
    description: "Jupyter, Colab, MLFlow, Docker.",
    nextNodeIds: [],
  },

  // Partial Tech
  {
    id: "40",
    name: "Partial Tech",
    description: "DevOps, MLOps, and Cyber Security domains.",
    nextNodeIds: ["41", "42", "43"],
  },
  {
    id: "41",
    name: "DevOps",
    description: "Technologies like CI/CD, Docker, and Kubernetes.",
    nextNodeIds: [],
  },
  {
    id: "42",
    name: "MLOps",
    description: "Tools for machine learning pipelines and tracking.",
    nextNodeIds: [],
  },
  {
    id: "43",
    name: "Cyber Security",
    description: "Ethical hacking, cryptography, and forensics.",
    nextNodeIds: [],
  },

  // Non-Tech
  {
    id: "47",
    name: "Non-Tech",
    description: "Quality assurance, design, and project management.",
    nextNodeIds: ["48", "49", "50", "51"],
  },
  {
    id: "48",
    name: "Quality Assurance",
    description: "Testing and performance tools.",
    nextNodeIds: [],
  },
  {
    id: "49",
    name: "UI/UX Design",
    description: "Tools for prototyping and user research.",
    nextNodeIds: [],
  },
  {
    id: "50",
    name: "Project Management",
    description: "Agile methodologies and tools like Jira.",
    nextNodeIds: [],
  },
  {
    id: "51",
    name: "Digital Marketing",
    description: "SEO, social media, and content creation.",
    nextNodeIds: [],
  },
];
