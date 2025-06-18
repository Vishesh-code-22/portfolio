import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from "split-type";
import Button from "../components/Button";

const Hero = () => {
    const headlineRef = useRef(null);

    useGSAP(() => {
        if (headlineRef.current) {
            // Split text into lines
            new SplitType(headlineRef.current, {
                types: "lines",
                lineClass: "split-line",
            });

            // Wrap lines in overflow hidden containers
            gsap.set(".split-line", {
                overflow: "hidden",
                display: "block",
            });

            // Animate each line
            gsap.fromTo(
                ".split-line",
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                }
            );
        }
        gsap.fromTo(
            ".sub-headline",
            {
                opacity: 0,
                y: -10,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.inOut",
            }
        );
        gsap.fromTo(
            ".socials a",
            {
                opacity: 0,
                y: -40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.inOut",
            }
        );
    }, []);

    return (
        <section
            id="home"
            className="hero-section flex flex-col items-center justify-center min-h-screen max-w-[1440px] gap-4 sm:gap-6 md:gap-8 mx-auto px-4 py-16 sm:py-20 md:py-24"
        >
            <h1
                ref={headlineRef}
                className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-center text-white w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] leading-tight sm:leading-snug md:leading-normal"
            >
                Transforming <span className="highlight1">Ideas</span> into
                Beautiful <span className="highlight2">Web Products</span>. From
                concept to launch, I help you{" "}
                <span className="highlight3">go live</span> with confidence.
            </h1>
            <p className="sub-headline text-base sm:text-lg md:text-xl lg:text-2xl font-medium sm:font-semibold text-center text-gray-400 w-full sm:w-[95%] md:w-[85%] lg:w-[80%] xl:w-[75%] leading-relaxed">
                Hi, I'm Vishesh — a web developer focused on helping you bring
                that product idea to life. With clear communication and a
                feedback-first approach, I make sure you're involved every step
                of the way. Let's build something great, together.
            </p>
            <div className="buttons flex flex-col sm:flex-row gap-6 sm:gap-4 mt-4 sm:mt-6 md:mt-8 items-center w-full sm:w-auto">
                <div className="socials flex gap-4 sm:gap-6 order-2 sm:order-1">
                    <a href="#" aria-label="GitHub Profile">
                        <img
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/github.png"
                            alt="github"
                        />
                    </a>
                    <a href="#" aria-label="Twitter Profile">
                        <img
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/twitter.png"
                            alt="twitter"
                        />
                    </a>
                    <a href="#" aria-label="LinkedIn Profile">
                        <img
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transform hover:scale-110 transition-transform duration-200"
                            src="/icons/linkedin.png"
                            alt="linkedin"
                        />
                    </a>
                </div>
                <Button
                    text="See My Work"
                    className="w-full sm:w-64 md:w-72 lg:w-80 h-12 sm:h-14 md:h-16 order-1 sm:order-2 max-w-sm"
                    id="work"
                />
            </div>
        </section>
    );
};

export default Hero;
