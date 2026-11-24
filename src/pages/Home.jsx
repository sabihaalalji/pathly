import heroImg from "../assets/herobg.jpg";

export default function Home() {
  return (
    <> 
    
    <section className="bg-[#042F2E] px-5 py-8 text-white ">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
         
      <h1 className="text-4xl font-medium leading-tight text-[#F0FDFA]">
        FIND YOUR FIRST STEP <span className="text-[#FB7185]">  BUILD YOUR FUTURE</span>
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


<section>
  <p>BROWSE</p>
  <h2>Find what fits you</h2>
  <p>Pick a type to see what is open right now.</p>

  <div>
    <div>
      <h3>Jobs</h3>
      <p>Full-time, part-time and remote roles</p>
      <span>→</span>
    </div>

    <div>
      <h3>Internships</h3>
      <p>Get your first experience</p>
      <span>→</span>
    </div>

    <div>
      <h3>Scholarships</h3>
      <p>Bursaries and funding</p>
      <span>→</span>
    </div>

    <div>
      <h3>Training</h3>
      <p>Courses and skills</p>
      <span>→</span>
    </div>

    <div>
      <h3>Volunteering</h3>
      <p>Give back and grow</p>
      <span>→</span>
    </div>

    <div>
      <h3>Freelance gigs</h3>
      <p>Short jobs to earn from your skills</p>
      <span>→</span>
    </div>
  </div>
</section>

</>
  );
}
