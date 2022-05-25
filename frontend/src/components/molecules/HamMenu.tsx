import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import navigation from '@/utils/navigation';
import classNames from '@/utils/classNames';

const HamBox = (): JSX.Element => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<div className='block lg:hidden'>
			<button
				type='button'
				onClick={toggleMenu}
				aria-label='Menu'
				className='relative z-10 -mr-4 flex items-center justify-center p-4 lg:hidden'
			>
				<div className='relative inline-block h-6 w-8'>
					<div
						className={classNames(
							'ham-box-inner absolute top-1/2 right-0 h-2px w-30px transform rounded bg-lightWhite transition duration-300 ease-in-out',
							'before:absolute before:right-0 before:h-2px before:bg-lightWhite',
							'after:absolute after:right-0 after:h-2px after:bg-lightWhite',
							menuOpen
								? 'rotate-225 before:w-full after:w-full after:-rotate-90'
								: 'before:-top-10 before:w-6/5 after:-bottom-10 after:w-4/5'
						)}
					/>
				</div>
			</button>
			<aside
				aria-hidden={!menuOpen}
				className={classNames(
					'fixed top-0 bottom-0 right-0 mt-20 h-screen w-full transform bg-lightBlue py-4 transition-all duration-200 ease-in-out lg:hidden',
					menuOpen ? 'visible translate-x-no-screen' : 'invisible translate-x-screen'
				)}
			>
				<nav>
					<ul>
						{navigation.map((item) => (
							<li className='flex flex-col' key={item.name}>
								{item.subNav ? (
									<Disclosure>
										{({ open }) => (
											<>
												<Disclosure.Button
													className={`relative flex w-full py-3 px-6 ${
														open ? 'border-t border-lightWhite border-opacity-10' : ''
													}`}
												>
													<span>{item.name}</span>
													<ChevronDownIcon
														className={`absolute top-0 bottom-0 right-0 my-auto mx-6 h-5 w-5 transition duration-300 ${
															open ? 'rotate-180 transform' : ''
														}`}
													/>
												</Disclosure.Button>
												<Transition
													enter='transition duration-200 ease-out'
													enterFrom='transform scale-95 opacity-0'
													enterTo='transform scale-100 opacity-100'
													leave='transition duration-200 ease-out'
													leaveFrom='transform scale-100 opacity-100'
													leaveTo='transform scale-95 opacity-0'
												>
													<Disclosure.Panel as='nav' className='pb-6'>
														<ul>
															{item.subNav.map((subItem) => (
																<li className='flex' key={subItem.name}>
																	<NavLink
																		to={subItem.href}
																		className={(navData) =>
																			`w-full py-3 px-10 text-sm ${
																				navData.isActive ? 'font-semibold' : ''
																			}`
																		}
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
										className={(navData) =>
											`w-full py-3 px-6 ${navData.isActive ? 'font-semibold' : ''}`
										}
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
