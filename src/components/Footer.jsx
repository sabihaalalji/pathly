import { Link } from "react-router-dom";

const linkClass = "block text-sm text-[#99F6E4] transition hover:text-[#FB7185]";

export default function Footer() {
  return (
    <footer className="bg-[#042F2E] px-5 md:px-16 pt-10 pb-6 text-[#F0FDFA]">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <Link to="/" className="text-lg font-medium">
            Pathly
          </Link>
          <p className="mt-2 max-w-xs text-sm text-[#CCFBF1]">
            Connecting young people with jobs, training and ways to earn.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <h4 className="text-sm font-medium">Get started</h4>
            <div className="mt-3 space-y-2">
              <Link to="/join/seekers" className={linkClass}>
                Seek an opportunity
              </Link>
              <Link to="/join/providers" className={linkClass}>
                Post an opportunity
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium">Account</h4>
            <div className="mt-3 space-y-2">
              <Link to="/login" className={linkClass}>
                Log in
              </Link>
              <Link to="/register" className={linkClass}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-5 text-xs text-[#99F6E4]">
        <p>2026 Pathly. All rights reserved.</p>
      </div>
    </footer>
  );
}