const { generateTimeSlots } = require('../utils/slotHelper');

const mockExperts = [
  {
    _id: '1',
    name: 'Dr. Sarah Johnson',
    category: 'Healthcare',
    experience: 15,
    rating: 4.8,
    bio: 'Board-certified physician specializing in internal medicine with extensive experience in preventive care and chronic disease management.',
    email: 'sarah.johnson@expert.com',
    availableSlots: []
  },
  {
    _id: '2',
    name: 'Michael Chen',
    category: 'Technology',
    experience: 12,
    rating: 4.9,
    bio: 'Senior software architect with expertise in cloud computing, microservices, and scalable system design.',
    email: 'michael.chen@expert.com',
    availableSlots: []
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    category: 'Finance',
    experience: 10,
    rating: 4.7,
    bio: 'Certified Financial Planner specializing in investment strategies, retirement planning, and wealth management.',
    email: 'emily.rodriguez@expert.com',
    availableSlots: []
  },
  {
    _id: '4',
    name: 'Prof. James Wilson',
    category: 'Education',
    experience: 20,
    rating: 4.9,
    bio: 'PhD in Educational Psychology with expertise in learning strategies, curriculum development, and academic coaching.',
    email: 'james.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '5',
    name: 'Lisa Thompson',
    category: 'Business',
    experience: 18,
    rating: 4.6,
    bio: 'Executive coach and business strategist helping professionals and organizations achieve peak performance.',
    email: 'lisa.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '6',
    name: 'Dr. Robert Kim',
    category: 'Healthcare',
    experience: 8,
    rating: 4.5,
    bio: 'Mental health professional specializing in anxiety, depression, and stress management techniques.',
    email: 'robert.kim@expert.com',
    availableSlots: []
  },
  {
    _id: '7',
    name: 'Amanda Foster',
    category: 'Technology',
    experience: 6,
    rating: 4.4,
    bio: 'Full-stack developer with expertise in React, Node.js, and modern web development practices.',
    email: 'amanda.foster@expert.com',
    availableSlots: []
  },
  {
    _id: '8',
    name: 'David Martinez',
    category: 'Finance',
    experience: 14,
    rating: 4.8,
    bio: 'Tax specialist and financial advisor helping individuals and businesses optimize their financial strategies.',
    email: 'david.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '9',
    name: 'Dr. Jennifer Lee',
    category: 'Healthcare',
    experience: 12,
    rating: 4.9,
    bio: 'Cardiologist with expertise in preventive cardiology, heart disease management, and lifestyle medicine.',
    email: 'jennifer.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '10',
    name: 'Alex Turner',
    category: 'Technology',
    experience: 8,
    rating: 4.6,
    bio: 'DevOps engineer specializing in CI/CD pipelines, containerization, and cloud infrastructure automation.',
    email: 'alex.turner@expert.com',
    availableSlots: []
  },
  {
    _id: '11',
    name: 'Maria Garcia',
    category: 'Finance',
    experience: 11,
    rating: 4.5,
    bio: 'Investment advisor focusing on sustainable investing, ESG criteria, and socially responsible portfolios.',
    email: 'maria.garcia@expert.com',
    availableSlots: []
  },
  {
    _id: '12',
    name: 'Dr. William Brown',
    category: 'Education',
    experience: 25,
    rating: 4.8,
    bio: 'Professor of Mathematics with expertise in advanced calculus, statistics, and data science education.',
    email: 'william.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '13',
    name: 'Sophie Anderson',
    category: 'Business',
    experience: 9,
    rating: 4.7,
    bio: 'Marketing strategist specializing in digital marketing, brand development, and customer acquisition.',
    email: 'sophie.anderson@expert.com',
    availableSlots: []
  },
  {
    _id: '14',
    name: 'Dr. Richard White',
    category: 'Healthcare',
    experience: 16,
    rating: 4.6,
    bio: 'Orthopedic surgeon specializing in sports medicine, joint replacement, and rehabilitation.',
    email: 'richard.white@expert.com',
    availableSlots: []
  },
  {
    _id: '15',
    name: 'Kevin Zhang',
    category: 'Technology',
    experience: 10,
    rating: 4.8,
    bio: 'Machine learning engineer with expertise in deep learning, computer vision, and natural language processing.',
    email: 'kevin.zhang@expert.com',
    availableSlots: []
  },
  {
    _id: '16',
    name: 'Patricia Miller',
    category: 'Finance',
    experience: 13,
    rating: 4.9,
    bio: 'Wealth management expert specializing in portfolio diversification, risk assessment, and retirement planning.',
    email: 'patricia.miller@expert.com',
    availableSlots: []
  },
  {
    _id: '17',
    name: 'Dr. Susan Davis',
    category: 'Education',
    experience: 18,
    rating: 4.7,
    bio: 'Educational consultant specializing in curriculum design, teacher training, and educational technology integration.',
    email: 'susan.davis@expert.com',
    availableSlots: []
  },
  {
    _id: '18',
    name: 'James Wilson Jr',
    category: 'Business',
    experience: 7,
    rating: 4.4,
    bio: 'Startup advisor and business development expert helping early-stage companies scale and grow.',
    email: 'james.wilsonjr@expert.com',
    availableSlots: []
  },
  {
    _id: '19',
    name: 'Dr. Elizabeth Taylor',
    category: 'Healthcare',
    experience: 11,
    rating: 4.8,
    bio: 'Pediatrician specializing in child development, preventive care, and pediatric nutrition.',
    email: 'elizabeth.taylor@expert.com',
    availableSlots: []
  },
  {
    _id: '20',
    name: 'Ryan Johnson',
    category: 'Technology',
    experience: 5,
    rating: 4.3,
    bio: 'Frontend developer specializing in React, Vue.js, and modern JavaScript frameworks and libraries.',
    email: 'ryan.johnson@expert.com',
    availableSlots: []
  },
  {
    _id: '21',
    name: 'Nancy Chen',
    category: 'Finance',
    experience: 9,
    rating: 4.6,
    bio: 'Corporate finance expert specializing in mergers and acquisitions, financial modeling, and valuation.',
    email: 'nancy.chen@expert.com',
    availableSlots: []
  },
  {
    _id: '22',
    name: 'Dr. Mark Robinson',
    category: 'Education',
    experience: 22,
    rating: 4.9,
    bio: 'Educational psychologist specializing in learning disabilities, gifted education, and cognitive development.',
    email: 'mark.robinson@expert.com',
    availableSlots: []
  },
  {
    _id: '23',
    name: 'Jessica Martinez',
    category: 'Business',
    experience: 12,
    rating: 4.8,
    bio: 'HR consultant specializing in talent management, organizational development, and employee engagement.',
    email: 'jessica.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '24',
    name: 'Dr. Thomas Anderson',
    category: 'Other',
    experience: 15,
    rating: 4.7,
    bio: 'Life coach and motivational speaker helping individuals achieve personal and professional goals.',
    email: 'thomas.anderson@expert.com',
    availableSlots: []
  },
  {
    _id: '25',
    name: 'Michelle Lee',
    category: 'Other',
    experience: 8,
    rating: 4.5,
    bio: 'Career counselor specializing in resume writing, interview preparation, and career transition strategies.',
    email: 'michelle.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '26',
    name: 'Dr. Catherine Moore',
    category: 'Healthcare',
    experience: 14,
    rating: 4.8,
    bio: 'Neurologist specializing in brain disorders, epilepsy, and neurodegenerative diseases.',
    email: 'catherine.moore@expert.com',
    availableSlots: []
  },
  {
    _id: '27',
    name: 'Dr. James Harris',
    category: 'Healthcare',
    experience: 9,
    rating: 4.6,
    bio: 'Dermatologist specializing in skin conditions, cosmetic procedures, and skin cancer screening.',
    email: 'james.harris@expert.com',
    availableSlots: []
  },
  {
    _id: '28',
    name: 'Dr. Laura Wilson',
    category: 'Healthcare',
    experience: 11,
    rating: 4.7,
    bio: 'Gynecologist specializing in women\'s health, reproductive medicine, and preventive care.',
    email: 'laura.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '29',
    name: 'Dr. Michael Brown',
    category: 'Healthcare',
    experience: 13,
    rating: 4.9,
    bio: 'Anesthesiologist specializing in pain management, regional anesthesia, and critical care.',
    email: 'michael.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '30',
    name: 'Dr. Sarah Davis',
    category: 'Healthcare',
    experience: 7,
    rating: 4.5,
    bio: 'Family medicine physician providing comprehensive care for all ages and preventive health services.',
    email: 'sarah.davis@expert.com',
    availableSlots: []
  },
  {
    _id: '31',
    name: 'Dr. Robert Taylor',
    category: 'Healthcare',
    experience: 16,
    rating: 4.8,
    bio: 'Radiologist specializing in diagnostic imaging, interventional radiology, and cancer detection.',
    email: 'robert.taylor@expert.com',
    availableSlots: []
  },
  {
    _id: '32',
    name: 'Dr. Jennifer Martinez',
    category: 'Healthcare',
    experience: 10,
    rating: 4.7,
    bio: 'Endocrinologist specializing in diabetes, thyroid disorders, and hormonal imbalances.',
    email: 'jennifer.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '33',
    name: 'Dr. William Anderson',
    category: 'Healthcare',
    experience: 12,
    rating: 4.6,
    bio: 'Gastroenterologist specializing in digestive disorders, endoscopy, and liver diseases.',
    email: 'william.anderson@expert.com',
    availableSlots: []
  },
  {
    _id: '34',
    name: 'Dr. Elizabeth White',
    category: 'Healthcare',
    experience: 8,
    rating: 4.5,
    bio: 'Psychiatrist specializing in mental health, mood disorders, and psychiatric medication management.',
    email: 'elizabeth.white@expert.com',
    availableSlots: []
  },
  {
    _id: '35',
    name: 'Dr. David Chen',
    category: 'Technology',
    experience: 7,
    rating: 4.5,
    bio: 'Cybersecurity expert specializing in network security, ethical hacking, and data protection.',
    email: 'david.chen@expert.com',
    availableSlots: []
  },
  {
    _id: '36',
    name: 'Dr. Lisa Johnson',
    category: 'Technology',
    experience: 9,
    rating: 4.7,
    bio: 'Data scientist specializing in machine learning, statistical analysis, and predictive modeling.',
    email: 'lisa.johnson@expert.com',
    availableSlots: []
  },
  {
    _id: '37',
    name: 'Dr. Mark Thompson',
    category: 'Finance',
    experience: 11,
    rating: 4.8,
    bio: 'Investment banker specializing in mergers, acquisitions, and corporate finance advisory.',
    email: 'mark.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '38',
    name: 'Dr. Susan Garcia',
    category: 'Finance',
    experience: 8,
    rating: 4.6,
    bio: 'Risk management expert specializing in financial risk assessment, compliance, and internal controls.',
    email: 'susan.garcia@expert.com',
    availableSlots: []
  },
  {
    _id: '39',
    name: 'Dr. James Wilson III',
    category: 'Education',
    experience: 15,
    rating: 4.7,
    bio: 'STEM education specialist focusing on science, technology, engineering, and mathematics curriculum development.',
    email: 'james.wilson3@expert.com',
    availableSlots: []
  },
  {
    _id: '40',
    name: 'Dr. Patricia Brown',
    category: 'Education',
    experience: 19,
    rating: 4.8,
    bio: 'Special education expert specializing in learning disabilities, IEP development, and inclusive education.',
    email: 'patricia.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '41',
    name: 'Dr. Robert Davis',
    category: 'Business',
    experience: 14,
    rating: 4.7,
    bio: 'Management consultant specializing in organizational strategy, process optimization, and change management.',
    email: 'robert.davis@expert.com',
    availableSlots: []
  },
  {
    _id: '42',
    name: 'Dr. Michelle Martinez',
    category: 'Business',
    experience: 10,
    rating: 4.6,
    bio: 'Sales strategist specializing in B2B sales, customer relationship management, and revenue growth.',
    email: 'michelle.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '43',
    name: 'Dr. Kevin Lee',
    category: 'Other',
    experience: 12,
    rating: 4.8,
    bio: 'Executive coach specializing in leadership development, team building, and performance optimization.',
    email: 'kevin.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '44',
    name: 'Dr. Amanda Wilson',
    category: 'Other',
    experience: 9,
    rating: 4.5,
    bio: 'Wellness coach specializing in work-life balance, stress management, and holistic health approaches.',
    email: 'amanda.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '45',
    name: 'Dr. Thomas Brown',
    category: 'Other',
    experience: 11,
    rating: 4.6,
    bio: 'Communication specialist specializing in public speaking, presentation skills, and interpersonal communication.',
    email: 'thomas.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '46',
    name: 'Dr. Rachel Green',
    category: 'Technology',
    experience: 8,
    rating: 4.7,
    bio: 'Cloud architect specializing in AWS, Azure, and multi-cloud infrastructure design.',
    email: 'rachel.green@expert.com',
    availableSlots: []
  },
  {
    _id: '47',
    name: 'Dr. Daniel Kim',
    category: 'Technology',
    experience: 11,
    rating: 4.8,
    bio: 'Blockchain developer specializing in smart contracts, DeFi, and cryptocurrency solutions.',
    email: 'daniel.kim@expert.com',
    availableSlots: []
  },
  {
    _id: '48',
    name: 'Dr. Olivia Martinez',
    category: 'Technology',
    experience: 6,
    rating: 4.5,
    bio: 'Mobile app developer specializing in iOS, Android, and cross-platform development.',
    email: 'olivia.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '49',
    name: 'Dr. James Wilson IV',
    category: 'Technology',
    experience: 9,
    rating: 4.6,
    bio: 'Game developer specializing in Unity, Unreal Engine, and interactive entertainment.',
    email: 'james.wilson4@expert.com',
    availableSlots: []
  },
  {
    _id: '50',
    name: 'Dr. Sophia Lee',
    category: 'Technology',
    experience: 7,
    rating: 4.4,
    bio: 'UI/UX designer specializing in user research, interface design, and user experience optimization.',
    email: 'sophia.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '51',
    name: 'Dr. Matthew Brown',
    category: 'Finance',
    experience: 12,
    rating: 4.7,
    bio: 'Estate planning attorney specializing in wills, trusts, and wealth preservation strategies.',
    email: 'matthew.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '52',
    name: 'Dr. Emma Davis',
    category: 'Finance',
    experience: 9,
    rating: 4.5,
    bio: 'Insurance advisor specializing in life insurance, health insurance, and risk management.',
    email: 'emma.davis@expert.com',
    availableSlots: []
  },
  {
    _id: '53',
    name: 'Dr. William Johnson',
    category: 'Finance',
    experience: 14,
    rating: 4.8,
    bio: 'Real estate investment expert specializing in property analysis, REITs, and real estate portfolio management.',
    email: 'william.johnson@expert.com',
    availableSlots: []
  },
  {
    _id: '54',
    name: 'Dr. Ava Thompson',
    category: 'Finance',
    experience: 8,
    rating: 4.6,
    bio: 'Cryptocurrency analyst specializing in digital assets, blockchain investments, and crypto trading strategies.',
    email: 'ava.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '55',
    name: 'Dr. Christopher Lee',
    category: 'Finance',
    experience: 11,
    rating: 4.7,
    bio: 'International finance expert specializing in foreign exchange, global markets, and cross-border transactions.',
    email: 'christopher.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '56',
    name: 'Dr. Isabella Wilson',
    category: 'Finance',
    experience: 10,
    rating: 4.5,
    bio: 'Budgeting and personal finance coach specializing in financial planning, debt management, and savings strategies.',
    email: 'isabella.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '57',
    name: 'Dr. Alexander Martinez',
    category: 'Education',
    experience: 13,
    rating: 4.8,
    bio: 'Language learning specialist specializing in ESL, foreign languages, and linguistic education.',
    email: 'alexander.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '58',
    name: 'Dr. Mia Brown',
    category: 'Education',
    experience: 7,
    rating: 4.6,
    bio: 'Art education specialist focusing on visual arts, creative expression, and art history.',
    email: 'mia.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '59',
    name: 'Dr. Ethan Davis',
    category: 'Education',
    experience: 16,
    rating: 4.7,
    bio: 'Physical education expert specializing in sports science, fitness training, and athletic development.',
    email: 'ethan.davis@expert.com',
    availableSlots: []
  },
  {
    _id: '60',
    name: 'Dr. Charlotte Johnson',
    category: 'Education',
    experience: 9,
    rating: 4.5,
    bio: 'Music education specialist focusing on instrumental instruction, music theory, and performance coaching.',
    email: 'charlotte.johnson@expert.com',
    availableSlots: []
  },
  {
    _id: '61',
    name: 'Dr. Benjamin Wilson',
    category: 'Education',
    experience: 11,
    rating: 4.6,
    bio: 'Environmental education expert specializing in sustainability, ecology, and environmental science.',
    email: 'benjamin.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '62',
    name: 'Dr. Sophia Martinez',
    category: 'Education',
    experience: 14,
    rating: 4.7,
    bio: 'Literature and writing coach specializing in creative writing, academic writing, and literary analysis.',
    email: 'sophia.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '63',
    name: 'Dr. Michael Thompson',
    category: 'Business',
    experience: 8,
    rating: 4.5,
    bio: 'Supply chain consultant specializing in logistics, inventory management, and operational efficiency.',
    email: 'michael.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '64',
    name: 'Dr. Emily Brown',
    category: 'Business',
    experience: 12,
    rating: 4.7,
    bio: 'Product management expert specializing in agile methodologies, product strategy, and user-centric development.',
    email: 'emily.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '65',
    name: 'Dr. David Lee',
    category: 'Business',
    experience: 15,
    rating: 4.8,
    bio: 'Business analyst specializing in process improvement, data analysis, and business intelligence.',
    email: 'david.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '66',
    name: 'Dr. Jessica Wilson',
    category: 'Business',
    experience: 9,
    rating: 4.6,
    bio: 'E-commerce specialist specializing in online retail, digital marketing, and customer experience optimization.',
    email: 'jessica.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '67',
    name: 'Dr. Andrew Martinez',
    category: 'Business',
    experience: 11,
    rating: 4.5,
    bio: 'Legal consultant specializing in business law, contract negotiation, and corporate compliance.',
    email: 'andrew.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '68',
    name: 'Dr. Sarah Thompson',
    category: 'Business',
    experience: 13,
    rating: 4.7,
    bio: 'International business expert specializing in global expansion, cross-cultural management, and international trade.',
    email: 'sarah.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '69',
    name: 'Dr. Kevin Brown',
    category: 'Other',
    experience: 10,
    rating: 4.6,
    bio: 'Photography expert specializing in portrait photography, event photography, and digital editing.',
    email: 'kevin.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '70',
    name: 'Dr. Amanda Lee',
    category: 'Other',
    experience: 8,
    rating: 4.5,
    bio: 'Yoga and meditation instructor specializing in mindfulness, stress relief, and holistic wellness.',
    email: 'amanda.lee@expert.com',
    availableSlots: []
  },
  {
    _id: '71',
    name: 'Dr. Ryan Wilson',
    category: 'Other',
    experience: 12,
    rating: 4.7,
    bio: 'Personal trainer specializing in fitness programming, nutrition coaching, and athletic performance.',
    email: 'ryan.wilson@expert.com',
    availableSlots: []
  },
  {
    _id: '72',
    name: 'Dr. Lisa Martinez',
    category: 'Other',
    experience: 9,
    rating: 4.6,
    bio: 'Nutritionist specializing in meal planning, dietary counseling, and wellness coaching.',
    email: 'lisa.martinez@expert.com',
    availableSlots: []
  },
  {
    _id: '73',
    name: 'Dr. James Thompson',
    category: 'Other',
    experience: 11,
    rating: 4.5,
    bio: 'Travel consultant specializing in adventure travel, cultural experiences, and sustainable tourism.',
    email: 'james.thompson@expert.com',
    availableSlots: []
  },
  {
    _id: '74',
    name: 'Dr. Michelle Brown',
    category: 'Other',
    experience: 7,
    rating: 4.4,
    bio: 'Social media manager specializing in content creation, brand building, and digital engagement.',
    email: 'michelle.brown@expert.com',
    availableSlots: []
  },
  {
    _id: '75',
    name: 'Dr. Christopher Lee',
    category: 'Other',
    experience: 13,
    rating: 4.6,
    bio: 'Event planner specializing in corporate events, weddings, and special occasion coordination.',
    email: 'christopher.lee@expert.com',
    availableSlots: []
  }
];

const generateAvailableSlots = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return mockExperts.map(expert => {
    const availableSlots = [];
    
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + d);
      
      availableSlots.push({
        date: currentDate,
        timeSlots: generateTimeSlots().map(time => ({
          time,
          isBooked: Math.random() > 0.8
        }))
      });
    }
    
    return {
      ...expert,
      availableSlots
    };
  });
};

class ExpertModel {
  static async find(query = {}) {
    let filteredExperts = generateAvailableSlots();
    
    if (query.$text) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.name.toLowerCase().includes(query.$text.$search.toLowerCase())
      );
    }
    
    if (query.category) {
      filteredExperts = filteredExperts.filter(expert => 
        expert.category === query.category
      );
    }
    
    return filteredExperts;
  }
  
  static async findById(id) {
    const experts = generateAvailableSlots();
    return experts.find(expert => expert._id === id);
  }
  
  static async countDocuments(query = {}) {
    const experts = await this.find(query);
    return experts.length;
  }
  
  static async distinct(field) {
    const experts = generateAvailableSlots();
    return [...new Set(experts.map(expert => expert[field]))];
  }
  
  static async save(expert) {
    return expert;
  }
}

module.exports = ExpertModel;
