import { Link, useParams } from "react-router-dom";

const info = {
  seekers: {
    tag: "FOR SEEKERS",
    title: "Your next step",
    highlight: "starts here.",
    intro:
      "For students, graduates and anyone starting out. Find jobs, internships and training, and apply in a few clicks.",
    sample: [
      { t: "Software Internship", o: "Nairobi · 3 months", tag: "Internship" },
      { t: "Digital Marketing Training", o: "Online · 6 weeks", tag: "Training" },
      { t: "Junior Graphic Designer", o: "Mombasa · Full time", tag: "Job" },
    ],
    label: "WHAT YOU GET",
    heading: "Everything you need in one place",
    points: [
      { title: "Discover", text: "Browse jobs, internships and training that fit you." },
      { title: "Apply fast", text: "Apply in a few clicks, with no long forms." },
      { title: "Build a profile", text: "Show your skills and portfolio to providers." },
      { title: "Track progress", text: "See every application and its status in one place." },
    ],
    steps: [
      { t: "Create your account", p: "Sign up as a seeker in under a minute." },
      { t: "Complete your profile", p: "Add your skills, school and interests." },
      { t: "Find and apply", p: "Pick an opportunity and send your application." },
    ],
    role: "seeker",
    button: "Join as a seeker",
    closing: "Join Pathly and take your first step today.",
  },
  providers: {
    tag: "FOR PROVIDERS",
    title: "Find the talent",
    highlight: "you need.",
    intro:
      "For companies and organisations offering opportunities. Post a listing and reach motivated young people.",
    sample: [
      { t: "Post a Job", o: "Reach young talent", tag: "Job" },
      { t: "Offer an Internship", o: "Grow your team", tag: "Internship" },
      { t: "Run a Training", o: "Share your skills", tag: "Training" },
    ],
    label: "WHAT YOU GET",
    heading: "Everything you need to hire",
    points: [
      { title: "Post", text: "Share jobs, internships and training in minutes." },
      { title: "Reach talent", text: "Connect with motivated young people." },
      { title: "Review", text: "See all applicants in one dashboard." },
      { title: "Manage", text: "Edit or close your listings anytime." },
    ],
    steps: [
      { t: "Create your account", p: "Sign up as a provider in under a minute." },
      { t: "Post an opportunity", p: "Add the details and publish your listing." },
      { t: "Review applications", p: "Check applicants and pick the best fit." },
    ],
    role: "provider",
    button: "Join as a provider",
    closing: "Join Pathly and start finding talent today.",
  },
};

export default function RoleInfo() {
  const { type } = useParams();
  const page = info[type];

  if (!page) return <p className="p-10">Page not found.</p>;

  const joinButton = (
    <Link
      to={`/register?role=${page.role}`}
      className="inline-block rounded-2xl bg-[#FB7185] px-9 py-4 text-base font-semibold text-[#042F2E] shadow-lg shadow-[#FB7185]/40"
    >
      {page.button}
    </Link>
  );

  return (
    <div className="bg-[#F0FDFA] text-[#042F2E]">
      {/* Hero */}
<section className="bg-[#042F2E] px-5 py-10 md:px-16 md:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
          <div className="max-w-xl">
            <span className="rounded-full bg-[#FB7185] px-4 py-2 text-xs font-semibold tracking-wider">
              {page.tag}
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-[#F0FDFA] md:text-6xl">
              {page.title} <span className="text-[#FB7185]">{page.highlight}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#CCFBF1]">{page.intro}</p>
            <div className="mt-8 flex items-center gap-4">
              {joinButton}
              <span className="text-sm text-[#99F6E4]">Free to join</span>
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-4">
            {page.sample.map((s) => (
              <div
                key={s.t}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-xl"
              >
                <div>
                  <p className="font-semibold">{s.t}</p>
                  <p className="mt-1 text-sm text-[#115E59]">{s.o}</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-[#CCFBF1] px-3 py-1 text-xs font-semibold">
                  {s.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-5 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-semibold tracking-wider text-[#0F766E]">{page.label}</p>
          <h2 className="mt-2 text-3xl font-semibold">{page.heading}</h2>
          <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
            {page.points.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-[#99F6E4] bg-white p-7 shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#115E59]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-5 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-wider text-[#0F766E]">SIMPLE STEPS</p>
          <h2 className="mt-2 text-3xl font-semibold">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {page.steps.map((s, i) => (
              <div key={s.t} className="rounded-3xl bg-[#F0FDFA] px-7 py-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FB7185] text-2xl font-semibold ring-8 ring-[#FB7185]/25">
                  {i + 1}
                </div>
                <p className="mt-5 text-lg font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-[#115E59]">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#042F2E] px-5 py-16 text-center md:py-20">
        <h2 className="text-3xl font-semibold text-[#F0FDFA] md:text-4xl">Ready to start?</h2>
        <p className="mt-3 text-[#CCFBF1]">{page.closing}</p>
        <div className="mt-6">{joinButton}</div>
      </section>
    </div>
  );
}