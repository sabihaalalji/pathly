import heroImg from "../assets/herobg.jpg";

export default function Home() {
  return (
    <> 
    
    <section className="bg-[#042F2E] px-5 md:px-10 py-8 text-white ">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
         
      <h1 className="text-4xl font-semibold text-2xl leading-tight text-[#F0FDFA]">
        FIND YOUR FIRST STEP <span className="text-[#FB7185] font-medium">  BUILD YOUR FUTURE</span>
      </h1>
      <p className="mt-4 text-sm text-[#CCFBF1] max-w-xs">
        One place to discover opportunities, show your skills and track every
        application
      </p>
      <div className="mt-6 flex flex-col gap-3 max-w-md">
        <button className="bg-[#FB7185] text-[#042F2E] py-3 rounded-lg text-center font-medium">Find opportunities</button>
        <button className="border border-[#5EEAD4] text-white py-3 rounded-lg text-center font-medium">Post an opportunity</button>
      </div>

      <div className="mt-7 bg-white/10 border border-white/25 rounded-2xl p-4 max-w-md">
        <div className="flex justify-between items-center">
          <span className="text-xs px-3 py-1 rounded-full bg-[#CCFBF1] text-[#134E4A] ">Internship</span>
          <span className="text-xs px-3 py-1 rounded-full bg-[#DCFCE7] text-[#166534] ">Active</span>
        </div>
        <div>
            <h2 className="mt-3 text-base font-medium">Graphic design Intern</h2>
            <p className="mt-1 text-xs text-[#CCFBF1]">Nairobi| Closes 30 Dec</p>
        </div>
      </div>
      </div>
         <img src={heroImg}
          alt="Young person using a laptop" className="w-full h-72 rounded-2xl object-cover md:w-1/2 md:h-96"/>
   </div>
   
    </section>


<section className="bg-[#F0FDFA] px-5 py-8  md:px-10 ">
  <p className="text-xs font-medium text-[#0F766E]">BROWSE</p>
  <h2 className="mt-1 text-2xl font-medium text-[#042F2E]">Find what fits you</h2>
  <p className="mt-1 text-sm text-[#134E4A]">Pick a type to see what is open right now.</p>
  <div className="mt-5 grid grid-cols-2 gap-3">


    <div className="row-span-2 rounded-2xl p-4 bg-[#0F766E]">
      <h3 className="text-lg font-medium text-[#F0FDFA]">Jobs</h3>
      <p className="mt-1 text-xs text-[#CCFBF1]">Full-time, part-time and remote roles</p>
    
    </div>

    <div className="rounded-2xl p-4 bg-white border border-[#5EEAD4]">
      <h3 className="text-lg font-medium text-[#042F2E]">Internships</h3>
      <p className="mt-1 text-xs text-[#134E4A]">Get your first experience</p>
  
    </div>

    <div className="rounded-2xl p-4 bg-white border border-[#5EEAD4]">
      <h3 className="text-lg font-medium text-[#042F2E]">Scholarships</h3>
      <p className="mt-1 text-xs text-[#134E4A]">Bursaries and funding</p>

    </div>

    <div className="rounded-2xl p-4 bg-white border border-[#5EEAD4]">
      <h3 className="text-lg font-medium text-[#042F2E]">Training</h3>
      <p className="mt-1 text-xs text-[#134E4A]">Courses and skills</p>
     
    </div>

    <div className="rounded-2xl p-4 bg-white border border-[#5EEAD4]">
      <h3 className="text-lg font-medium text-[#042F2E]">Volunteering</h3>
      <p className="mt-1 text-xs text-[#134E4A]">Give back and grow</p>
   
    </div>

    <div className=" rounded-2xl p-4 bg-[#FB7185] ">
      <h3 className="text-lg font-medium text-[#042F2E]">Freelance gigs</h3>
      <p className="mt-1 text-xs text-[#134E4A]">Short jobs to earn from your skills</p>
      
    </div>
  </div>
</section>


<section className="relative overflow-hidden bg-[#042F2E] px-5 md:px-16 py-8">
  <p className="text-xs font-medium tracking-wider text-[#FB7185]">HOW IT WORKS</p>
  <h2 className="mt-1 text-2xl font-medium text-[#F0FDFA]">Three simple steps</h2>
  <p className="mt-1 text-sm text-[#CCFBF1]">From sign up to your first opportunity.</p>

  <div className="relative mt-6">
    
<div className="relative flex gap-4 mb-5">
  <div className="flex-none w-10 h-10 rounded-full bg-[#FB7185] text-[#042F2E] font-medium flex items-center justify-center">1</div>
  <div className="flex-1 rounded-2xl p-4 bg-white/10 border border-white/20">
    <h3 className="text-base font-medium text-[#F0FDFA]">Create your profile</h3>
  <p className="mt-1 text-sm text-[#CCFBF1]">Add your skills, education and portfolio links.</p>
  </div>
</div>
  
    <div className="relative flex gap-4 mb-5">
      <div className="flex-none w-10 h-10 rounded-full bg-[#FB7185] text-[#042F2E] font-medium flex items-center justify-center">2</div>
      <div className="flex-1 rounded-2xl p-4 bg-white/10 border border-white/20">
        <h3 className="text-base font-medium text-[#F0FDFA]">Search and save</h3>
        <p className="mt-1 text-sm text-[#CCFBF1]">Filter by category, location and type. Bookmark your favourites.</p>
      </div>
    </div>

    <div className="relative flex gap-4 mb-5">
      <div className="flex-none w-10 h-10 rounded-full bg-[#FB7185] text-[#042F2E] font-medium flex items-center justify-center">3</div>
      <div className="flex-1 rounded-2xl p-4 bg-white/10 border border-white/20">
        <h3 className="text-base font-medium text-[#F0FDFA]">Apply and track</h3>
        <p className="mt-1 text-sm text-[#CCFBF1]">See if you are submitted, shortlisted, accepted or rejected.</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-[#F0FDFA] px-5 md:px-16 py-8">
  <p className="text-xs font-medium tracking-wider text-[#0F766E]">WHO IS IT FOR</p>
  <h2 className="mt-1 text-2xl font-medium text-[#042F2E]">Two ways to join</h2>
  <p className="mt-1 text-sm text-[#134E4A]">Choose your role when you sign up.</p>

  <div className="mt-5 grid gap-4 md:grid-cols-2">
    <div className="rounded-3xl p-6 bg-[#FB7185] text-[#042F2E]">
      <span className="inline-block text-[11px] font-medium tracking-wider px-3 py-1 rounded-full bg-[#042F2E] text-[#F0FDFA]">FOR SEEKERS</span>
      <h3 className="mt-3 text-2xl font-medium leading-tight">Opportunity seekers</h3>
      <p className="mt-2 text-sm">For students, graduates and anyone starting out.</p>

      <div className="mt-5 text-sm">Discover jobs, internships and training</div>
      <div className="mt-3 text-sm">Apply in a few clicks</div>
      <div className="mt-3 text-sm">Build a profile and portfolio</div>

      <button className="mt-6 w-full rounded-xl py-3 text-base font-medium bg-[#042F2E] text-[#F0FDFA]">
        Join as a seeker
      </button>
    </div>

    <div className="rounded-3xl p-6 bg-[#042F2E] text-[#F0FDFA]">
      <span className="inline-block text-[11px] font-medium tracking-wider px-3 py-1 rounded-full bg-[#0F766E] text-[#F0FDFA]">FOR PROVIDERS</span>
      <h3 className="mt-3 text-2xl font-medium leading-tight">Opportunity providers</h3>
      <p className="mt-2 text-sm text-[#CCFBF1]">For employers, schools, NGOs and businesses.</p>

      <div className="mt-5 text-sm">Post and manage your listings</div>
      <div className="mt-3 text-sm">Review applicants and their profiles</div>
      <div className="mt-3 text-sm">Shortlist, accept or reject</div>

      <button className="mt-6 w-full rounded-xl py-3 text-base font-medium bg-[#FB7185] text-[#042F2E]">
        Join as a provider
      </button>
    </div>
  </div>
</section>


</>
  );
}
