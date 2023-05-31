import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import navigation from '@/utils/navigation';

const RightNav = (): JSX.Element => {
	return (
		<ul className='hidden h-full lg:flex'>
			{navigation.map((item) => (
				<li key={item.name}>
					{item.subNav ? (
						<Popover className='relative'>
							{({ open }) => (
								<>
									<Popover.Button className='flex items-center rounded bg-opacity-10 py-2 px-4 uppercase text-white text-opacity-70 transition duration-400 ease-in-out hover:bg-lightBlue'>
										<span>{item.name}</span>
										<ChevronDownIcon
											className={`ml-1 h-5 w-5 transition duration-300 ${
												open ? 'rotate-180 transform' : ''
											}`}
										/>
									</Popover.Button>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-200'
										enterFrom='opacity-0 translate-y-1'
										enterTo='opacity-100 translate-y-0'
										leave='transition ease-in duration-150'
										leaveFrom='opacity-100 translate-y-0'
										leaveTo='opacity-0 translate-y-1'
									>
										<Popover.Panel
											as='nav'
											className='absolute left-0 z-40 mt-5 origin-top-left rounded bg-white text-lightBlack shadow-xl'
										>
											<ul className='flex flex-col py-2'>
												{item.subNav.map((subItem) => {
													return subItem.isAsset ? (
														<Fragment key={subItem.name}>
															<div className='absolute -top-1 left-10 h-2 w-2 rotate-45 transform bg-white'></div>
															<li>
																<a
																	href={subItem.href}
																	target='_blank'
																	rel='noreferrer'
																	className='flex items-center py-2 px-4 uppercase text-lightBlack text-opacity-70 hover:text-lightRed'
																>
																	{subItem.name}
																</a>
															</li>
														</Fragment>
													) : (
														<Fragment key={subItem.name}>
															<div className='absolute -top-1 left-10 h-2 w-2 rotate-45 transform bg-white'></div>
															<li>
																<NavLink
																	to={subItem.href}
																	className='flex items-center py-2 px-4 uppercase text-lightBlack text-opacity-70 hover:text-lightRed'
																>
																	{subItem.name}
																</NavLink>
															</li>
														</Fragment>
													);
												})}
											</ul>
										</Popover.Panel>
									</Transition>
								</>
							)}
						</Popover>
					) : (
						<NavLink
							to={item.href}
							className={(navData) =>
								`flex items-center rounded bg-opacity-10 py-2 px-4 uppercase text-white text-opacity-70 transition duration-400 ease-in-out hover:bg-lightBlue ${
									navData.isActive ? 'text-opacity-100' : ''
								}`
							}
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
