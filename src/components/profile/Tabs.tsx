import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { name: "Mi Cuenta", href: "/profile", icon: UserIcon },
  {
    name: "Cambiar Password",
    href: "/profile/password",
    icon: FingerPrintIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = tabs.filter((tab) => tab.href === location.pathname)[0]
    .href;

  return (
    <div className="mb-10">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-teal-300 focus:ring-teal-300"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            navigate(e.target.value)
          }
          value={currentTab}
        >
          {tabs.map((tab) => {
            return (
              <option value={tab.href} key={tab.name}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? "border-teal-400 text-teal-500"
                    : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href
                      ? "text-teal-500"
                      : "text-neutral-400 group-hover:text-neutral-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
