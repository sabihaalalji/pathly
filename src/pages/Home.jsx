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

</>
  );
}
