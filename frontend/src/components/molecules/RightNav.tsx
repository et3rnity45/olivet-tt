import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import navigation from "@Utils/navigation";

const RightNav = (): JSX.Element => {
  return (
    <ul className="h-full hidden lg:flex">
      {navigation.map((item) => (
        <li key={item.name}>
          {item.subNav ? (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="flex items-center py-2 px-4 rounded uppercase text-white text-opacity-70 bg-opacity-10 hover:bg-lightBlue transition duration-400 ease-in-out">
                    <span>{item.name}</span>
                    <ChevronDownIcon
                      className={`ml-1 h-5 w-5 transition duration-300 ${
                        open ? "transform rotate-180" : ""
                      }`}
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      as="nav"
                      className="absolute z-40 bg-white text-lightBlack rounded shadow-xl left-0 origin-top-left mt-5"
                    >
                      <ul className="flex flex-col py-2">
                        {item.subNav.map((subItem) => (
                          <Fragment key={subItem.name}>
                            <div className="absolute w-2 h-2 transform rotate-45 bg-white -top-1 left-10"></div>
                            <li>
                              <NavLink
                                to={subItem.href}
                                className="flex items-center uppercase text-lightBlack text-opacity-70 py-2 px-4 hover:text-lightRed"
                              >
                                {subItem.name}
                              </NavLink>
                            </li>
                          </Fragment>
                        ))}
                      </ul>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ) : (
            <NavLink
              to={item.href}
              className="flex items-center py-2 px-4 rounded uppercase text-white text-opacity-70 bg-opacity-10 hover:bg-lightBlue transition duration-400 ease-in-out"
              activeClassName="text-opacity-100"
              exact
            >
              {item.name}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RightNav;
