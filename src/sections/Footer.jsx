const Footer = () => {
    return (
        <div
            className="footer-container navbar-container max-w-screen bg-black/30 backdrop-blur-md border-t border-white/20
 flex justify-center lg:h-18 md:h-16 h-12 z-50"
        >
            <div className="footer h-full flex justify-between w-[1440px] px-4 items-center">
                <div className="socials flex gap-4 sm:gap-6 order-2 sm:order-1">
                    <a
                        href="https://github.com/Vishesh-code-22"
                        aria-label="GitHub Profile"
                    >
                        <img
                            className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/github.png"
                            alt="github"
                        />
                    </a>
                    <a
                        href="https://x.com/Vishesh22k"
                        aria-label="Twitter Profile"
                    >
                        <img
                            className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/twitter.png"
                            alt="twitter"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/vishesh-kumawat-692339238/"
                        aria-label="LinkedIn Profile"
                    >
                        <img
                            className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/linkedin.png"
                            alt="linkedin"
                        />
                    </a>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-center md:text-end text-gray-400">
                        © {new Date().getFullYear()} Vishesh Kumawat. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
