/*
  WEAVE v1 demo data.
  This is intentionally simple. Replace this file with a backend later.
*/
window.WEAVE_SEED = {
  currentUser: {
    id: 1,
    name: "Pranav Vasudeva",
    headline: "B.Tech Student • Developer • AI & Startup Enthusiast",
    college: "KIIT",
    course: "B.Tech",
    branch: "Electronics & Computer Science",
    year: "1st Year",
    location: "Bhubaneswar, India",
    about: "Student builder interested in technology, AI, startups and creating useful products.",
    skills: ["Python", "C++", "Web Development", "AI"],
    connections: 284,
    profileViews: 128
  },

  people: [
    {id:2,name:"Aarav Mehta",headline:"ML Engineer Intern • Python • AI",college:"KIIT",branch:"CSE",year:"2nd Year",location:"Bhubaneswar",skills:["Python","Machine Learning","SQL"],about:"Building practical ML projects and looking for ambitious collaborators.",status:"none"},
    {id:3,name:"Sarbani Das",headline:"UI/UX Designer • Figma • Product",college:"KIIT",branch:"ECE",year:"1st Year",location:"Bhubaneswar",skills:["UI/UX","Figma","Product Design"],about:"Interested in product design, user research and startups.",status:"none"},
    {id:4,name:"Rohan Singh",headline:"Full Stack Developer • React • Node",college:"VIT",branch:"CSE",year:"3rd Year",location:"Vellore",skills:["React","Node.js","MongoDB"],about:"Full-stack developer building SaaS and campus products.",status:"connected"},
    {id:5,name:"Ishita Sharma",headline:"Data Science Student • Python • Analytics",college:"DTU",branch:"IT",year:"2nd Year",location:"Delhi",skills:["Python","Data Science","Statistics"],about:"Exploring analytics, AI and finance.",status:"none"},
    {id:6,name:"Kabir Kapoor",headline:"Mobile Developer • Android • Firebase",college:"KIIT",branch:"CSE",year:"1st Year",location:"Bhubaneswar",skills:["Java","Android","Firebase"],about:"Building mobile apps and experimenting with product ideas.",status:"pending"},
    {id:7,name:"Mehak Arora",headline:"Marketing • Research • Startup Growth",college:"NSUT",branch:"IT",year:"2nd Year",location:"Delhi",skills:["Marketing","Research","Canva"],about:"Interested in growth, startups and consumer research.",status:"none"},
    {id:8,name:"Dev Malhotra",headline:"Cybersecurity Student • Linux • Networking",college:"BITS",branch:"CSE",year:"3rd Year",location:"Pilani",skills:["Cybersecurity","Linux","Networking"],about:"Learning security and building privacy-focused tools.",status:"none"}
  ],

  posts: [
    {id:101,authorId:2,text:"Just finished building a small AI project for our campus community. Biggest lesson: start with the user's problem, not the technology.",likes:34,liked:false,saved:false,comments:[{name:"Mehak Arora",text:"Great point — problem first!"}],time:"2h"},
    {id:102,authorId:3,text:"Sharing my latest UI/UX case study. Designing for students taught me how much clarity matters more than visual complexity.",likes:51,liked:false,saved:false,comments:[{name:"Pranav Vasudeva",text:"Would love to see the case study."}],time:"5h"},
    {id:103,authorId:4,text:"Open to collaborating with students interested in AI + full-stack development. If you are building something, let's connect.",likes:27,liked:false,saved:false,comments:[],time:"1d"}
  ],

  jobs: [
    {id:201,title:"AI/ML Intern",company:"Nova Labs",location:"Remote",type:"Internship",skills:["Python","AI"],deadline:"30 Sep 2026"},
    {id:202,title:"Frontend Developer Intern",company:"CampusTech",location:"Bengaluru",type:"Internship",skills:["React","JavaScript"],deadline:"15 Sep 2026"},
    {id:203,title:"Product Intern",company:"LaunchPad",location:"Remote",type:"Internship",skills:["Product","Research"],deadline:"10 Oct 2026"},
    {id:204,title:"Climate AI Hackathon",company:"Student Innovation Cell",location:"Online",type:"Hackathon",skills:["AI","Research","Web"],deadline:"25 Sep 2026"}
  ],

  notifications: [
    {id:301,text:"Your profile appeared in 8 searches this week.",read:false,time:"1h"},
    {id:302,text:"Aarav Mehta accepted your connection request.",read:false,time:"3h"},
    {id:303,text:"New AI/ML internship matches your skills.",read:false,time:"5h"}
  ],

  messages: [
    {id:401,from:2,text:"Hey Pranav, want to collaborate on an AI project?",time:"10:30 AM"},
    {id:402,from:1,text:"Absolutely. Tell me what you're building.",time:"10:34 AM"}
  ],

  conversations: [
    {userId:2,unread:1,last:"Hey Pranav, want to collaborate on an AI project?"},
    {userId:4,unread:0,last:"Let's catch up about the project."}
  ]
};
