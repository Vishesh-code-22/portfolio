import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Work = () => {
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    const projects = [
        {
            id: 1,
            title: "Redline Rush",
            description:
                "An adrenaline-pumping racing game with stunning graphics and realistic physics. Experience high-speed thrills across diverse tracks with customizable vehicles and competitive multiplayer modes.",
            image: "/gifs/redline.gif",
            link: "https://redline-rush.vercel.app/",
            skills: [
                { name: "React", color: "#61DAFB" },
                { name: "Tailwind", color: "#38BDF8" },
                { name: "Appwrite", color: "#F02E65" },
                { name: "GSAP", color: "#88CE02" },
                { name: "Redux Toolkit", color: "#764ABC" },
            ],
        },
        {
            id: 2,
            title: "iPhone Showcase",
            description:
                "A sleek 3D product showcase featuring the latest iPhone models. Interactive demonstrations highlighting key features with smooth animations and responsive design for optimal user experience.",
            image: "/gifs/iphone.gif",
            link: "https://iphone-showcase-xi.vercel.app/",
            skills: [
                { name: "React", color: "#61DAFB" },
                { name: "Tailwind", color: "#38BDF8" },
                { name: "Three.js", color: "#6E40C9" },
                { name: "GSAP", color: "#88CE02" },
                { name: "CSS", color: "#1572B6" },
            ],
        },
        {
            id: 3,
            title: "Weather Now",
            description:
                "Real-time weather application with beautiful animations and comprehensive forecasts. Features location-based updates, interactive maps, and personalized weather alerts for informed decisions.",
            image: "/gifs/weather.gif",
            link: "https://github.com/Vishesh-code-22/WeatherAppExpress",
            skills: [
                { name: "Express", color: "#43B581" },
                { name: "CSS", color: "#1572B6" },
                { name: "REST API", color: "#e34c26" },
                { name: "EJS", color: "#A91E50" },
            ],
        },
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

        // Animate project cards on scroll
        cardsRef.current.forEach((card) => {
            if (card) {
                gsap.fromTo(
                    card,
                    {
                        y: 100,
                        opacity: 0,
                        scale: 0.8,
                        rotationY: 15,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                // Add hover animations
                const handleMouseEnter = () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
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

        // Cleanup ScrollTriggers on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section id="work" className="min-h-screen py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Animated Title */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-white mb-4 perspective-1000"
                    >
                        {"Projects".split("").map((char, index) => (
                            <span
                                key={index}
                                className="inline-block transform-gpu"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {char}
                            </span>
                        ))}
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                {/* Project Cards */}
                <div className="space-y-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden hover:shadow-purple-500/25 transition-all duration-500"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                                {/* Left side - Image */}
                                <div className="flex-shrink-0">
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-purple-500/30 transition-shadow duration-500">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-80 h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>

                                {/* Right side - Content */}
                                <div className="flex-1 text-center lg:text-left">
                                    <a
                                        href={project.link}
                                        className="group/link inline-block"
                                    >
                                        <h3 className="text-4xl font-bold text-white mb-4 group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-purple-400 group-hover/link:to-pink-400 transition-all duration-300">
                                            {project.title}
                                            <span className="inline-block ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300">
                                                →
                                            </span>
                                        </h3>
                                    </a>
                                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                                        {project.description}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {project.skills.map(
                                            ({ name, color }) => (
                                                <span
                                                    key={name}
                                                    className="px-4 py-2 rounded-full text-sm"
                                                    style={{
                                                        background: `${color}20`, // 20 for ~12% opacity in hex
                                                        color: color,
                                                        border: `1px solid ${color}80`, // 80 for ~50% opacity in hex
                                                    }}
                                                >
                                                    {name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Animated border */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background:
                                        "linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.4), transparent, rgba(236, 72, 153, 0.4), transparent)",
                                    backgroundSize: "400% 400%",
                                    animation: "gradient 3s ease infinite",
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
