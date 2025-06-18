import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { useRef, useState } from "react";

const Navbar = () => {
    const logoRef = useRef(null);
    const navLinks = useRef(null);
    const mobileMenuRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // track if the user has scrolled down the page
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // create an event listener for when the user scrolls
        const handleScroll = () => {
            // check if the user has scrolled down at least 10px
            // if so, set the state to true
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        // add the event listener to the window
        window.addEventListener("scroll", handleScroll);

        // cleanup the event listener when the component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        gsap.fromTo(
            logoRef.current,
            {
                opacity: 0,
                y: -100,
            },
            {
                opacity: 1,
                duration: 0.5,
                y: 0,
                ease: "power1.inOut",
            }
        );

        // Only animate desktop nav links on larger screens
        if (window.innerWidth >= 768) {
            gsap.fromTo(
                navLinks.current?.children || [],
                {
                    opacity: 0,
                    y: -100,
                },
                {
                    opacity: 1,
                    duration: 0.5,
                    y: 0,
                    stagger: 0.2,
                    ease: "power1.inOut",
                }
            );
        }
    }, []);

    // Animate mobile menu
    useGSAP(() => {
        if (mobileMenuRef.current) {
            if (isMobileMenuOpen) {
                gsap.to(mobileMenuRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.fromTo(
                    mobileMenuRef.current.children,
                    {
                        opacity: 0,
                        x: -50,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        delay: 0.1,
                        ease: "power2.out",
                    }
                );
            } else {
                gsap.to(mobileMenuRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.2,
                    ease: "power2.in",
                });
            }
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div
            className={`navbar-container max-w-screen ${
                scrolled
                    ? "bg-black/30 backdrop-blur-md border-b border-white/20 transition-all duration-1000"
                    : ""
            } flex justify-center lg:h-18 md:h-16 h-12 z-50 fixed top-0 left-0 right-0`}
        >
            <nav className="navbar h-full flex justify-between w-[1440px] px-4 z-50">
                <a className="nav-left flex items-center" href="#home">
                    <img
                        src="./icons/nav-logo.png"
                        alt="Brand logo"
                        className="md:h-10 h-8"
                        ref={logoRef}
                    />
                </a>

                {/* Desktop Navigation */}
                <div className="nav-right hidden md:flex items-center">
                    <ul
                        ref={navLinks}
                        className="flex lg:gap-8 md:gap-6 text-gray-400 lg:text-lg md:text-base"
                    >
                        <li>
                            <a
                                className="group relative cursor-pointer lg:text-lg md:text-base hover:text-gray-300 transition duration-200"
                                href="#work"
                            >
                                Work
                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="group relative cursor-pointer lg:text-lg md:text-base hover:text-gray-300 transition duration-200"
                                href="#skills"
                            >
                                Skills
                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="group relative cursor-pointer lg:text-lg md:text-base hover:text-gray-300 transition duration-200"
                                href="#contact"
                            >
                                Contact
                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-400 hover:text-gray-300 transition-colors duration-200 p-2"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-5 relative">
                            <span
                                className={`absolute w-full h-0.5 bg-current transition-all duration-300 transform ${
                                    isMobileMenuOpen
                                        ? "rotate-45 top-1/2 -translate-y-1/2"
                                        : "top-0"
                                }`}
                            ></span>
                            <span
                                className={`absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
                                    isMobileMenuOpen ? "opacity-0" : ""
                                }`}
                            ></span>
                            <span
                                className={`absolute w-full h-0.5 bg-current transition-all duration-300 transform ${
                                    isMobileMenuOpen
                                        ? "-rotate-45 top-1/2 -translate-y-1/2"
                                        : "bottom-0"
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black-100/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className={`fixed top-12 left-4 right-4 bg-black-200/95 backdrop-blur-md border border-gray-800/50 rounded-lg z-40 md:hidden ${
                    isMobileMenuOpen ? "block" : "hidden"
                }`}
                style={{ opacity: 0, transform: "translateY(-20px)" }}
            >
                <ul className="flex flex-col p-4 space-y-4">
                    <li>
                        <a
                            className="block text-gray-400 text-lg hover:text-gray-300 transition duration-200 py-2 px-4 rounded-md hover:bg-gray-800/30"
                            href="#work"
                            onClick={closeMobileMenu}
                        >
                            Work
                        </a>
                    </li>
                    <li>
                        <a
                            className="block text-gray-400 text-lg hover:text-gray-300 transition duration-200 py-2 px-4 rounded-md hover:bg-gray-800/30"
                            href="#skills"
                            onClick={closeMobileMenu}
                        >
                            Skills
                        </a>
                    </li>
                    <li>
                        <a
                            className="block text-gray-400 text-lg hover:text-gray-300 transition duration-200 py-2 px-4 rounded-md hover:bg-gray-800/30"
                            href="#contact"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
