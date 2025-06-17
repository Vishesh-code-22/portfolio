import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const titleRef = useRef(null);
    const skillsGridRef = useRef(null);
    const skillCardsRef = useRef([]);

    const skillData = [
        { name: "ReactJS", logo: "/logos/react.png" },
        { name: "TailwindCSS", logo: "/logos/tailwind.png" },
        { name: "GSAP", logo: "/logos/gsap.png" },
        { name: "Three.js", logo: "/logos/three.png" },
        { name: "Appwrite", logo: "/logos/appwrite.png" },
        { name: "Redux Toolkit", logo: "/logos/redux.png" },
        { name: "HTML", logo: "/logos/html.png" },
        { name: "CSS", logo: "/logos/css.png" },
        { name: "JavaScript", logo: "/logos/javascript.png" },
        { name: "ExpessJS", logo: "/logos/express.png" },
        { name: "EJS", logo: "/logos/ejs.png" },
        { name: "Github", logo: "/logos/github.png" },
    ];

    useGSAP(() => {
        // Animate title characters on scroll
        const titleChars = titleRef.current.children;
        gsap.fromTo(
            titleChars,
            {
                y: -100,
                opacity: 0,
                rotationX: -90,
            },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate skill cards on scroll with staggered effect
        gsap.fromTo(
            skillCardsRef.current,
            {
                y: 80,
                opacity: 0,
                scale: 0.7,
                rotationY: 25,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                stagger: {
                    amount: 1.2,
                    grid: [4, 3],
                    from: "start",
                },
                ease: "power3.out",
                scrollTrigger: {
                    trigger: skillsGridRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Add individual hover animations for each card
        skillCardsRef.current.forEach((card) => {
            if (card) {
                const handleMouseEnter = () => {
                    gsap.to(card, {
                        y: -15,
                        scale: 1.05,
                        rotationY: 10,
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    // Animate logo and text separately
                    const logo = card.querySelector(".skill-logo");
                    const text = card.querySelector(".skill-text");

                    gsap.to(logo, {
                        scale: 1.1,
                        rotation: 10,
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    gsap.to(text, {
                        y: -5,
                        color: "#ffffff",
                        duration: 0.4,
                        ease: "power2.out",
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    const logo = card.querySelector(".skill-logo");
                    const text = card.querySelector(".skill-text");

                    gsap.to(logo, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    });

                    gsap.to(text, {
                        y: 0,
                        color: "#d1d5db",
                        duration: 0.4,
                        ease: "power2.out",
                    });
                };

                card.addEventListener("mouseenter", handleMouseEnter);
                card.addEventListener("mouseleave", handleMouseLeave);

                // Cleanup function for event listeners
                return () => {
                    card.removeEventListener("mouseenter", handleMouseEnter);
                    card.removeEventListener("mouseleave", handleMouseLeave);
                };
            }
        });

        // Floating animation for cards
        skillCardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.to(card, {
                    y: "random(-10, 10)",
                    duration: "random(3, 5)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.2,
                });
            }
        });

        // Cleanup ScrollTriggers on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            id="skills"
            className="min-h-screen py-20 px-6 relative overflow-hidden"
        >
            {/* Background gradient effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Animated Title */}
                <div className="text-center mb-20">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-white mb-6 perspective-1000"
                    >
                        {"Skills".split("").map((char, index) => (
                            <span
                                key={index}
                                className="inline-block transform-gpu"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                {/* Skills Grid */}
                <div
                    ref={skillsGridRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {skillData.map((skill, index) => (
                        <div
                            key={skill.name}
                            ref={(el) => (skillCardsRef.current[index] = el)}
                            className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Animated border */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background:
                                        "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent, rgba(236, 72, 153, 0.3), transparent)",
                                    backgroundSize: "400% 400%",
                                    animation: "gradient 3s ease infinite",
                                }}
                            ></div>

                            {/* Card Content */}
                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                {/* Logo */}
                                <div className="skill-logo w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                                    <img
                                        src={skill.logo}
                                        alt={skill.name}
                                        className="w-full h-full object-contain filter drop-shadow-lg"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextElementSibling.style.display =
                                                "flex";
                                        }}
                                    />
                                    {/* Fallback icon if image fails to load */}
                                    <div
                                        className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl items-center justify-center text-white font-bold text-lg hidden"
                                        style={{ display: "none" }}
                                    >
                                        {skill.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Skill Name */}
                                <h3 className="skill-text text-gray-300 font-semibold text-sm md:text-base group-hover:text-white transition-colors duration-500">
                                    {skill.name}
                                </h3>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
