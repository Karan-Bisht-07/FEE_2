export const INITIAL_USER = {
  id: "STD-2026-8841",
  name: "Rohan Sharma",
  rollNo: "CS2026094",
  email: "rohan.sharma@campushub.edu",
  department: "Computer Science & Engineering",
  year: "3rd Year (6th Semester)",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  hostel: "Block B - Room 304",
  bloodGroup: "O+",
  phone: "+91 98765 43210",
  cgpa: "8.92",
  role: "student", // "student" | "admin" | "faculty"
  achievements: [
    "1st Place - Inter-College Hackathon 2025",
    "Dean's Honor List - Fall 2025",
    "Lead Coordinator - CodeCraft Club"
  ]
};

export const INITIAL_EVENTS = [
  {
    id: "EVT-101",
    title: "InnovateX Annual Tech Symposium 2026",
    category: "Technical",
    date: "2026-08-15",
    time: "09:30 AM",
    venue: "Main Auditorium & Lawn",
    organizer: "Department of CSE & IEEE Student Branch",
    description: "A 2-day extravaganza featuring paper presentations, AI hackathons, robotics challenges, and keynote speeches by industry leaders from Google, Microsoft, and NVIDIA.",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    seatsLeft: 42,
    totalSeats: 300,
    price: "Free",
    registered: true
  },
  {
    id: "EVT-102",
    title: "Euphoria Night - Cultural Music Festival",
    category: "Cultural",
    date: "2026-08-22",
    time: "06:00 PM",
    venue: "Open Air Theatre (OAT)",
    organizer: "Student Cultural Council",
    description: "Get ready for an electrifying night of live indie bands, EDM DJ sets, dance performances, and food stalls across the campus grounds.",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    seatsLeft: 120,
    totalSeats: 1500,
    price: "Free",
    registered: false
  },
  {
    id: "EVT-103",
    title: "Inter-Department Cricket & Football League",
    category: "Sports",
    date: "2026-08-28",
    time: "04:00 PM",
    venue: "Campus Sports Complex",
    organizer: "Department of Physical Education",
    description: "Cheer for your department team as they compete for the coveted Chancellor's Trophy. Fixtures released for CSE vs ECE, ME vs Civil.",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
    seatsLeft: 18,
    totalSeats: 50,
    price: "Free",
    registered: false
  },
  {
    id: "EVT-104",
    title: "AI & Fullstack Development Bootcamp",
    category: "Workshops",
    date: "2026-09-05",
    time: "10:00 AM",
    venue: "Lab 4, Tech Block",
    organizer: "Campus Hub Dev Club",
    description: "Hands-on masterclass building LLM-powered web applications using React, Python, and cloud APIs. Certificate provided upon completion.",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    seatsLeft: 5,
    totalSeats: 60,
    price: "Free",
    registered: true
  }
];

export const INITIAL_TASKS = [
  {
    id: "TSK-01",
    title: "Submit Distributed Systems Lab Report 4",
    subject: "Distributed Computing",
    dueDate: "2026-08-04",
    priority: "High",
    status: "Pending",
    notes: "Implement Ricart-Agrawala mutual exclusion algorithm in Python and submit PDF to Portal."
  },
  {
    id: "TSK-02",
    title: "Prepare Slide Deck for Software Engineering Seminar",
    subject: "Software Engg",
    dueDate: "2026-08-07",
    priority: "Medium",
    status: "In Progress",
    notes: "Focus on Microservices vs Monolith trade-offs and CI/CD pipelines."
  },
  {
    id: "TSK-03",
    title: "Complete Compiler Design Problem Set #3",
    subject: "Compiler Construction",
    dueDate: "2026-08-10",
    priority: "Low",
    status: "Pending",
    notes: "LALR parser derivation and syntax directed translation tables."
  },
  {
    id: "TSK-04",
    title: "LeetCode Daily Challenge & Tree DP Practice",
    subject: "Placement Prep",
    dueDate: "2026-08-02",
    priority: "High",
    status: "Completed",
    notes: "Solved Binary Tree Maximum Path Sum and Lowest Common Ancestor."
  }
];

export const INITIAL_ATTENDANCE = [
  {
    code: "CS301",
    subject: "Distributed Operating Systems",
    faculty: "Dr. A. K. Verma",
    conducted: 36,
    attended: 31,
    requiredMin: 75
  },
  {
    code: "CS302",
    subject: "Compiler Construction & Design",
    faculty: "Prof. S. R. Nambiar",
    conducted: 40,
    attended: 35,
    requiredMin: 75
  },
  {
    code: "CS303",
    subject: "Machine Learning & Neural Nets",
    faculty: "Dr. Meera Deshmukh",
    conducted: 32,
    attended: 28,
    requiredMin: 75
  },
  {
    code: "CS304",
    subject: "Computer Networks & Security",
    faculty: "Prof. Rajesh Kumar",
    conducted: 38,
    attended: 27,
    requiredMin: 75
  },
  {
    code: "CS305",
    subject: "Software Engineering & Agile Labs",
    faculty: "Dr. Sunita Rao",
    conducted: 24,
    attended: 22,
    requiredMin: 75
  }
];

export const INITIAL_PLACEMENTS = [
  {
    id: "PLC-01",
    company: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=150",
    role: "Software Engineer (SDE-1)",
    ctc: "₹34 LPA",
    eligibility: "CGPA > 8.0, CSE/ECE/EE",
    deadline: "2026-08-12",
    status: "Open",
    rounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Googley & Leadership"]
  },
  {
    id: "PLC-02",
    company: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642132652806-382944b03698?auto=format&fit=crop&q=80&w=150",
    role: "Software Development Engineer",
    ctc: "₹28 LPA",
    eligibility: "CGPA > 7.5, All B.Tech",
    deadline: "2026-08-18",
    status: "Open",
    rounds: ["Codility Test", "System Design Round", "Problem Solving Round", "HR Round"]
  },
  {
    id: "PLC-03",
    company: "Atlassian",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150",
    role: "Backend Engineer - Graduate",
    ctc: "₹32 LPA",
    eligibility: "CGPA > 8.0, CSE/IT",
    deadline: "2026-08-25",
    status: "Upcoming",
    rounds: ["HackerRank Coding", "Values & Culture Fit", "System Design", "Managerial"]
  }
];

export const INITIAL_HOSTEL_COMPLAINTS = [
  {
    id: "CMP-881",
    category: "Electrical",
    title: "Ceiling Fan Speed Regulator Broken",
    location: "Block B - Room 304",
    status: "In Progress",
    assignedTo: "Ramesh Electrician",
    dateSubmitted: "2026-07-29",
    priority: "Medium",
    description: "The fan operates only at maximum speed. Regulator knob turns loosely."
  },
  {
    id: "CMP-874",
    category: "Plumbing",
    title: "Bathroom Water Tap Leakage",
    location: "Block B - 3rd Floor Washroom",
    status: "Resolved",
    assignedTo: "Suresh Plumber",
    dateSubmitted: "2026-07-22",
    priority: "High",
    description: "Tap #3 leaking water continuously resulting in wastage."
  },
  {
    id: "CMP-865",
    category: "Wi-Fi & Network",
    title: "Hostel Wi-Fi Access Point Dropping Connections",
    location: "Block B - East Wing",
    status: "Pending",
    assignedTo: "IT Support Cell",
    dateSubmitted: "2026-07-31",
    priority: "High",
    description: "Frequent disconnection on SSID 'CampusHub_Hostel_5G' between 8 PM and 11 PM."
  }
];

export const INITIAL_LOST_FOUND = [
  {
    id: "LF-301",
    type: "Lost",
    title: "Blue Boat Rockerz Bluetooth Headphones",
    category: "Electronics",
    location: "Central Library 2nd Floor Reading Room",
    date: "2026-07-30",
    contact: "98765 43210 (Rohan)",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    status: "Open",
    description: "Left near desk #42 around 5 PM. Has a small yellow scratch on left ear cup."
  },
  {
    id: "LF-302",
    type: "Found",
    title: "Titan Black Leather Wallet with Student ID",
    category: "Personal Items",
    location: "Main Canteen Area near Juice Bar",
    date: "2026-07-31",
    contact: "Canteen Supervisor Desk",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400",
    status: "Open",
    description: "Contains cash and a student identity card belonging to Mechanical Engineering."
  },
  {
    id: "LF-303",
    type: "Found",
    title: "Scientific Calculator Casio fx-991EX",
    category: "Stationery",
    location: "Lecture Hall 102",
    date: "2026-07-28",
    contact: "LH-102 Security Desk",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400",
    status: "Claimed",
    description: "Has sticker 'Ketan - ECE' on the back."
  }
];

export const INITIAL_BLOOD_DONORS = [
  {
    id: "BLD-101",
    name: "Arjun Verma",
    bloodGroup: "O+",
    phone: "+91 98123 45678",
    hostel: "Hostel A - Room 102",
    department: "CSE",
    lastDonated: "2026-04-12",
    available: true
  },
  {
    id: "BLD-102",
    name: "Priya Nair",
    bloodGroup: "A-",
    phone: "+91 97234 56789",
    hostel: "Girls Hostel 2 - Room 405",
    department: "Biotech",
    lastDonated: "2025-11-20",
    available: true
  },
  {
    id: "BLD-103",
    name: "Karan Patel",
    bloodGroup: "B+",
    phone: "+91 96345 67890",
    hostel: "Block C - Room 210",
    department: "Mechanical",
    lastDonated: "2026-06-01",
    available: true
  }
];

export const INITIAL_BLOOD_REQUESTS = [
  {
    id: "REQ-01",
    patientName: "Relative of Staff Member",
    bloodGroup: "O-",
    units: 2,
    hospital: "City Civil Hospital, Medical College Road",
    urgency: "Immediate (Within 4 Hours)",
    contactPerson: "Dr. S. K. Roy",
    contactNumber: "+91 98989 12345",
    datePosted: "2026-07-31",
    status: "Urgent"
  },
  {
    id: "REQ-02",
    patientName: "Student Emergency Ward",
    bloodGroup: "AB+",
    units: 1,
    hospital: "Campus Health Centre",
    urgency: "Today",
    contactPerson: "Health Centre Officer",
    contactNumber: "+91 98765 00000",
    datePosted: "2026-07-30",
    status: "Fulfilled"
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: "FDB-10",
    category: "Infrastructure & Labs",
    subject: "Air Conditioning in Computer Lab 3",
    rating: 4,
    comments: "Lab machines are top notch, but AC #2 leaks water during afternoon sessions.",
    isAnonymous: false,
    author: "Rohan Sharma",
    date: "2026-07-28",
    adminResponse: "Thank you for bringing this up. AC technician scheduled for inspection."
  },
  {
    id: "FDB-11",
    category: "Canteen & Food",
    subject: "Quality and Options in Night Canteen",
    rating: 3,
    comments: "Healthy food choices and juices should be kept available till 1:00 AM during exams.",
    isAnonymous: true,
    author: "Anonymous Student",
    date: "2026-07-29",
    adminResponse: "We have issued guidelines to canteen vendor to extend juice bar hours during end-terms."
  }
];

export const INITIAL_BLOG_POSTS = [
  {
    id: "BLG-01",
    title: "Mastering System Design & DSA for Campus Placements 2026",
    author: "Rohan Sharma",
    authorRole: "3rd Year CSE",
    date: "2026-07-25",
    category: "Career & Tech",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    excerpt: "A comprehensive roadmap covering key graph algorithms, DP patterns, system design fundamentals, and mock interview tips that helped our seniors crack Tier-1 product offers.",
    content: `Securing a product software engineering role requires a balanced preparation strategy combining Algorithmic Problem Solving (DSA), System Design, Core CS Fundamentals, and Behavioral readiness.

### 1. Master Core Data Structures & Patterns
Don't solve 1000 random problems. Focus on underlying patterns:
- Two Pointers & Sliding Window
- BFS/DFS Graph Traversals
- Dynamic Programming (Knapsack, Interval DP, Tree DP)
- Monotonic Stacks & Heaps

### 2. System Design Basics
Understand how real-world distributed applications handle scale:
- Load Balancing & Consistent Hashing
- Caching strategies (Redis/Memcached, LRU eviction)
- Database Sharding vs Replication
- Message Queues (Kafka/RabbitMQ) for async decoupling.

Keep building real projects on GitHub and practicing mock interviews with peers on CampusHub!`,
    likes: 48,
    commentsCount: 12
  },
  {
    id: "BLG-02",
    title: "Life at CampusHub: Navigating Clubs, Academics & Mental Health",
    author: "Sneha Mukherjee",
    authorRole: "4th Year Biotech",
    date: "2026-07-28",
    category: "Campus Life",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    excerpt: "Balancing high CGPA expectations with active student club leadership isn't easy. Here are 5 mental clarity habits every junior should adopt early on.",
    content: "College life is a high-speed sprint filled with assignments, hackathons, sports leagues, and career anxiety. Staying grounded and maintaining a healthy sleep schedule is crucial...",
    likes: 64,
    commentsCount: 19
  }
];

export const INITIAL_FAQS = [
  {
    id: "faq-1",
    category: "GENERAL & ACADEMICS",
    question: "HOW DO I ACCESS MY DIGITAL CAMPUS ID & SEMESTER RESULTS?",
    answer: "You can view your verified Digital Campus ID Card under the Profile module. Semester SGPA/CGPA breakdown is automatically updated under Academic Records upon official Dean declaration."
  },
  {
    id: "faq-2",
    category: "ATTENDANCE & LEAVES",
    question: "WHAT IS THE MANDATORY ATTENDANCE THRESHOLD?",
    answer: "CampusHub enforces a minimum 75% attendance criteria per course. You can use our built-in 'Bunk & Attendance Calculator' to simulate how many upcoming lectures you can safely miss or must attend."
  },
  {
    id: "faq-3",
    category: "PLACEMENTS & INTERNSHIPS",
    question: "WHO CAN APPLY FOR ON-CAMPUS RECRUITMENT DRIVES?",
    answer: "Eligibility criteria (CGPA cutoff, allowed backlogs, eligible departments) are defined per company in the Placement Preparation section. Once verified, click 'Apply Now' to submit your resume directly to TPO."
  },
  {
    id: "faq-4",
    category: "HOSTEL & MAINTENANCE",
    question: "HOW FAST ARE HOSTEL COMPLAINTS RESOLVED?",
    answer: "High-priority electrical and plumbing complaints are dispatched within 4 to 12 hours. You can track real-time technician assignment and status directly from the Hostel Complaint Tracker."
  },
  {
    id: "faq-5",
    category: "LOST & FOUND",
    question: "WHAT IS THE PROCEDURE TO CLAIM A FOUND ITEM?",
    answer: "Select the item from the Lost & Found visual directory, click 'Claim Item', and provide proof of ownership (e.g. serial number, description of unique mark, or student ID verification)."
  }
];

// ============================================================================
// EVALUATION 2 ADDITIONS: PRODUCTS, PORTFOLIO & DASHBOARD MOCK DATA
// ============================================================================

export const INITIAL_PRODUCTS = [
  {
    id: "PRD-01",
    name: "Campus Official Pullover Hoodie",
    category: "Merchandise",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 64,
    inStock: true,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400",
    desc: "Heavyweight 320 GSM brushed fleece with embroidered college crest on the chest."
  },
  {
    id: "PRD-02",
    name: "Engineering Mechanics & Dynamics (6th Ed)",
    category: "Textbooks",
    price: 549,
    originalPrice: 750,
    rating: 4.6,
    reviews: 42,
    inStock: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    desc: "Standard course textbook covering statics, kinetics, and energy methods with solved problem sets."
  },
  {
    id: "PRD-03",
    name: "Casio fx-991CW Scientific Calculator",
    category: "Electronics",
    price: 1399,
    originalPrice: 1695,
    rating: 4.9,
    reviews: 128,
    inStock: true,
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=400",
    desc: "540+ functions, matrix operations, numerical calculus integration, exam certified."
  },
  {
    id: "PRD-04",
    name: "Cotton Chemistry & Physics Lab Coat",
    category: "Lab Equipment",
    price: 449,
    originalPrice: 650,
    rating: 4.5,
    reviews: 35,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=400",
    desc: "100% breathable anti-acid spill cotton coat with dual reinforced front pockets."
  },
  {
    id: "PRD-05",
    name: "Ergonomic Silent Wireless Mouse",
    category: "Electronics",
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviews: 91,
    inStock: true,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400",
    desc: "2.4GHz dual mode Bluetooth + USB dongle, rechargeable battery, silent click switches."
  },
  {
    id: "PRD-06",
    name: "CampusHub Steel Insulated Bottle (750ml)",
    category: "Merchandise",
    price: 399,
    originalPrice: 599,
    rating: 4.8,
    reviews: 50,
    inStock: true,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400",
    desc: "Double-walled vacuum insulation keeping beverages cold for 24h or hot for 12h."
  }
];

export const INITIAL_PORTFOLIO = {
  about: {
    headline: "Full-Stack Web Developer & Distributed Systems Enthusiast",
    bio: "Undergraduate CSE student at State Technical University with a passion for high-performance React architectures, clean UI design, and scalable RESTful APIs. Solved 450+ LeetCode problems and winner of Inter-College Hackathon 2025.",
    socials: {
      github: "https://github.com/rohansharma",
      linkedin: "https://linkedin.com/in/rohansharma",
      email: "rohan.sharma@campushub.edu"
    }
  },
  skills: [
    { name: "React.js / Next.js", level: "Advanced", category: "Frontend" },
    { name: "JavaScript (ES6+) & DOM", level: "Advanced", category: "Frontend" },
    { name: "HTML5 / CSS3 / Glassmorphism", level: "Advanced", category: "Frontend" },
    { name: "Node.js & Express", level: "Intermediate", category: "Backend" },
    { name: "REST APIs & JSON", level: "Advanced", category: "Backend" },
    { name: "MongoDB & PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "Git, GitHub & CI/CD", level: "Advanced", category: "DevOps" },
    { name: "Data Structures & Algorithms", level: "Advanced", category: "Core CS" }
  ],
  projects: [
    {
      id: "PRJ-01",
      title: "CampusHub — Centralized Student Portal",
      category: "Full Stack React SPA",
      tech: ["React.js", "Context API", "CSS Modules", "Zustand Pattern"],
      desc: "An integrated college management application unifying 10 student modules with dark-mode glassmorphism and client-side SPA routing.",
      github: "https://github.com/rohansharma/campushub",
      demo: "home",
      metrics: "Used by 12,500+ campus students"
    },
    {
      id: "PRJ-02",
      title: "Algorithmic Market Order Book Engine",
      category: "Systems & DSA",
      tech: ["C++20", "Lock-free Queues", "Multithreading"],
      desc: "High-throughput limit order matching engine processing 250,000 orders/sec with under 15 microsecond latency.",
      github: "https://github.com/rohansharma/order-book",
      demo: "#",
      metrics: "15μs P99 latency"
    },
    {
      id: "PRJ-03",
      title: "Real-time Distributed Collaborative Editor",
      category: "WebSockets & WebRTC",
      tech: ["Node.js", "Operational Transformation", "Redis"],
      desc: "Google Docs-style live rich text editor supporting real-time concurrent typing and conflict-free cursor tracking.",
      github: "https://github.com/rohansharma/collab-doc",
      demo: "#",
      metrics: "Zero conflict replication"
    }
  ],
  certifications: [
    { title: "Meta Certified Front-End Developer", issuer: "Coursera / Meta", year: "2025" },
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
    { title: "Problem Solving (Advanced) Certificate", issuer: "HackerRank", year: "2024" }
  ]
};

export const INITIAL_DASHBOARD_METRICS = {
  kpis: {
    cgpa: "8.92",
    attendanceOverall: "84.1%",
    tasksCompleted: "12 / 16",
    campusStoreCredits: "₹ 1,250"
  },
  gpaHistory: [
    { sem: "Sem 1", gpa: 8.75 },
    { sem: "Sem 2", gpa: 8.90 },
    { sem: "Sem 3", gpa: 9.12 },
    { sem: "Sem 4", gpa: 8.85 },
    { sem: "Sem 5", gpa: 9.00 }
  ],
  attendanceTrajectory: [
    { code: "CS301", name: "Distributed OS", attended: 31, total: 36, pct: 86.1 },
    { code: "CS302", name: "Compiler Design", attended: 35, total: 40, pct: 87.5 },
    { code: "CS303", name: "Machine Learning", attended: 28, total: 32, pct: 87.5 },
    { code: "CS304", name: "Computer Networks", attended: 27, total: 38, pct: 71.0 },
    { code: "CS305", name: "Software Engg", attended: 22, total: 24, pct: 91.6 }
  ],
  recentActivities: [
    { time: "10 mins ago", title: "Assignment Submitted", desc: "Distributed Systems Lab Report 4 uploaded to portal." },
    { time: "2 hours ago", title: "Item Added to Cart", desc: "Casio fx-991CW Calculator added to Campus Store cart." },
    { time: "1 day ago", title: "Event RSVP Confirmed", desc: "Pass generated for InnovateX Annual Tech Symposium 2026." },
    { time: "2 days ago", title: "Hostel Ticket Dispatched", desc: "Electrical fan regulator complaint assigned to Ramesh Electrician." }
  ]
};
