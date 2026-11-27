export default function Footer() {
  return (
    <footer className="bg-[#042F2E] px-5 md:px-16 pt-10 pb-6 text-[#F0FDFA]">
      <div>
        <h3 className="text-lg font-medium">Pathly</h3>
        <p className="mt-2 max-w-xs text-sm text-[#CCFBF1]">
          Connecting young people with jobs, training and ways to earn.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <h4 className="text-sm font-medium">Explore</h4>
          <p className="mt-3 text-sm text-[#99F6E4]">Opportunities</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Career guidance</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Scholarships</p>
        </div>

        <div>
          <h4 className="text-sm font-medium">For providers</h4>
          <p className="mt-3 text-sm text-[#99F6E4]">Post an opportunity</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Provider dashboard</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Manage listings</p>
        </div>

        <div>
          <h4 className="text-sm font-medium">Account</h4>
          <p className="mt-3 text-sm text-[#99F6E4]">Log in</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Register</p>
          <p className="mt-2 text-sm text-[#99F6E4]">My profile</p>
        </div>

        <div>
          <h4 className="text-sm font-medium">Company</h4>
          <p className="mt-3 text-sm text-[#99F6E4]">About us</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Contact</p>
          <p className="mt-2 text-sm text-[#99F6E4]">Help</p>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-white/20 pt-5 text-xs text-[#99F6E4] md:flex-row md:justify-between">
        <p>2026 Pathly. All rights reserved.</p>
        <p>Privacy | Terms</p>
      </div>
    </footer>
  );
}