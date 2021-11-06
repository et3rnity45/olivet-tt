import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import navigation from "../../utils/navigation";
import "./hambox.css";

const HamBox = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="block lg:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Menu"
        className="flex lg:hidden justify-center items-center relative z-10 -mr-4 p-4"
      >
        <div className="inline-block relative w-8 h-6">
          <div
            className={`ham-box-inner ${menuOpen ? "ham-open" : "ham-close"}`}
          />
        </div>
      </button>
      <aside
        aria-hidden={!menuOpen}
        className={`fixed top-0 bottom-0 right-0 py-4 mt-20 h-screen bg-lightBlue lg:hidden ${
          menuOpen ? "active" : ""
        }`}
      >
        <nav>
          <ul>
            {navigation.map((item) => (
              <li className="flex flex-col" key={item.name}>
                {item.subNav ? (
                  <Disclosure defaultOpen={true}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`relative flex w-full py-3 px-6 ${
                            open
                              ? "border-lightWhite border-t border-opacity-10"
                              : ""
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDownIcon
                            className={`absolute top-0 bottom-0 right-0 my-auto mx-6 h-5 w-5 transition duration-300 ${
                              open ? "transform rotate-180" : ""
                            }`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-200 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-200 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel as="nav" className="pb-6">
                            <ul>
                              {item.subNav.map((subItem) => (
                                <li className="flex" key={subItem.name}>
                                  <NavLink
                                    to={subItem.href}
                                    className="w-full py-3 px-10 text-sm"
                                    activeClassName="font-semibold"
                                    exact
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  <NavLink
                    to={item.href}
                    className="w-full py-3 px-6"
                    activeClassName="font-semibold"
                    exact
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default HamBox;
