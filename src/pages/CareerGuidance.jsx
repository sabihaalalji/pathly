const careerGuides = [
{
id: 1,
title: "Build a Strong CV",
description:"Learn how to create a professional CV that highlights your education, skills, projects and experience.",
tips: ["Keep your CV clear and easy to read.",
       "Highlight relevant skills and projects.",
       "Tailor your CV to each opportunity.",
],
 },

{
id: 2,
title: "Prepare for Interviews",
description: "Build confidence and learn how to present yourself during job interviews.",
tips: ["Research the organization beforehand.",
       "Practice common interview questions.",
       "Give clear examples of your abilities.",
],
},

{
id: 3,
title: "Develop Your Skills",
description:"Discover how learning practical and digital skills can improve your career opportunities.",
tips: ["Choose skills related to your career goals.",
       "Practice through personal projects.",
       "Keep learning and improving.",
],
},

{
id: 4,
title: "Plan Your Career",
description:"Understand your interests, set career goals and identify the steps needed to achieve them.",
tips: ["Identify your interests and strengths.",
       "Explore different career paths.",
       "Set realistic learning goals.",
],
  },
];

function CareerGuidance() {
  return (
 <div className="min-h-screen bg-[#F0FDFA] px-6 py-10">
 <div className="mx-auto max-w-6xl">

{/* Introduction */}
 <section className="rounded-2xl bg-[#134E4A] px-8 py-12 text-white">
<p className="mb-3 font-semibold text-[#FB7185]">YOUR CAREER JOURNEY STARTS HERE</p>
<h1 className="text-3xl font-bold md:text-4xl">Build Your Future with Pathly</h1>
<p className="mt-4 max-w-2xl leading-relaxed text-teal-50">Explore practical career advice, develop valuable skills, prepare for opportunities and take the next step towards your professional goals.</p>
 </section>

{/* Career guidance cards */}
  <section className="mt-12">
    <h2 className="text-2xl font-bold text-[#042F2E]">Explore Career Guidance</h2>
    <p className="mt-2 text-[#134E4A]">Everything you need to prepare for your career journey.</p>

    <div className="mt-6 grid gap-6 sm:grid-cols-2">
    {careerGuides.map((guide) => (
    <div key={guide.id} className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="text-3xl">{guide.icon}</div>
        <h3 className="mt-4 text-xl font-bold text-[#042F2E]"> {guide.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#134E4A]"> {guide.description}</p>

    <ul className="mt-4 space-y-2">
    {guide.tips.map((tip, index) => (
        <li key={index} className="flex gap-2 text-sm text-[#042F2E]"> <span className="text-[#0F766E]">✓</span>
        {tip}
        </li>
 ))}
    </ul>
    </div>
 ))}
</div>
</section>

{/* Encouragement section */}
  <section className="mt-12 rounded-2xl bg-[#CCFBF1] p-8 text-center">
    <h2 className="text-2xl font-bold text-[#042F2E]">Your Future Starts with One Step</h2>
    <p className="mx-auto mt-3 max-w-2xl text-[#134E4A]"> Every skill you learn and every opportunity you explore brings you closer to your career goals. Stay curious, keep learning and believe in your potential.</p>
</section>

</div>
    </div>
  );
}

export default CareerGuidance;
