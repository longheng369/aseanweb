import {
  BN,
  ID,
  KH,
  LA,
  MM,
  MY,
  PH,
  SG,
  TH,
  VN,
} from "country-flag-icons/react/3x2";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-2xl rounded-3xl pl-4 pr-20 flex justify-between w-[98.5vw] m-0">
        <div>
          <Link className="btn btn-ghost text-xl" to="/dashboard">Admin</Link>
        </div>
        <div>
          <ul className="menu menu-horizontal px-1 gap-4">
         
            <li>
              <details >
                <summary className="text-lg">Country</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link className="pl-16 text-lg border-b" to="/dashboard">All</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/brunie" className="text-lg ">
                      <BN className="flag" />
                      Brunei
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/cambodia" className="text-lg">
                      <KH className="flag" />
                      Cambodia
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/indonesia" className="text-lg">
                      <ID className="flag" />
                      Indonesia
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/laos" className="text-lg">
                      <LA className="flag" />
                      Laos
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/malaysia" className="text-lg">
                      <MY className="flag" />
                      Malaysia
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard/myanmar" className="text-lg">
                      <MM className="flag" />
                      Myanmar
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/philipines" className="text-lg">
                      <PH className="flag" />
                      Philipines
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/singapore" className="text-lg">
                      <SG className="flag" />
                      Singapore
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/thailand" className="text-lg">
                      <TH className="flag" />
                      Thailand
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/vietnam" className="text-lg">
                      <VN className="flag" />
                      Vietnam
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link className="text-lg" to="/password">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
