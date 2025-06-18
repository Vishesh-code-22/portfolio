import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import emailjs from "@emailjs/browser";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const inputRefs = useRef([]);
    const buttonRef = useRef(null);
    const successIconRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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

        // Animate form container
        gsap.fromTo(
            formRef.current,
            {
                y: 80,
                opacity: 0,
                rotationY: 15,
                scale: 0.9,
            },
            {
                y: 0,
                opacity: 1,
                rotationY: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate form inputs with stagger
        gsap.fromTo(
            inputRefs.current,
            {
                x: -50,
                opacity: 0,
                rotationY: -20,
            },
            {
                x: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Animate submit button
        gsap.fromTo(
            buttonRef.current,
            {
                y: 50,
                opacity: 0,
                scale: 0.8,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: buttonRef.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Floating animation for background elements
        gsap.to(".floating-element", {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-10, 10)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.3,
        });

        // Cleanup ScrollTriggers on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const animateSuccess = () => {
        // Animate button to success state
        gsap.to(buttonRef.current, {
            backgroundColor: "#10b981", // Green color
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
        });

        // Animate success icon entrance
        if (successIconRef.current) {
            gsap.fromTo(
                successIconRef.current,
                {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(2)",
                    delay: 0.2,
                }
            );
        }

        // Reset after 2 seconds
        setTimeout(() => {
            setShowSuccess(false);
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        }, 2000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Animate button during submission
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
        });

        try {
            // Send email using emailjs API
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Show success animation
            setShowSuccess(true);
            animateSuccess();
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setIsSubmitting(false);
            setFormData({ name: "", email: "", message: "" });
        }
    };

    const handleInputFocus = (index) => {
        const input = inputRefs.current[index];
        gsap.to(input, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleInputBlur = (index) => {
        const input = inputRefs.current[index];
        gsap.to(input, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <section
            id="contact"
            className="min-h-screen py-20 px-6 relative overflow-hidden"
        >
            {/* Background gradient effects */}
            <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl floating-element"></div>
            <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-element"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl floating-element"></div>

            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/30 rotate-45 floating-element"></div>
            <div className="absolute top-40 right-20 w-6 h-6 border-2 border-pink-500/30 rounded-full floating-element"></div>
            <div className="absolute bottom-32 left-16 w-3 h-8 bg-blue-500/30 floating-element"></div>
            <div className="absolute bottom-20 right-32 w-5 h-5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 floating-element"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Animated Title */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl md:text-8xl font-bold text-white mb-6 perspective-1000"
                    >
                        {"Contact".split("").map((char, index) => (
                            <span
                                key={index}
                                className="inline-block transform-gpu"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
                        Let's collaborate and bring your ideas to life
                    </p>
                </div>

                {/* Contact Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>

                    {/* Animated border */}
                    <div
                        className="absolute inset-0 rounded-3xl opacity-50"
                        style={{
                            background:
                                "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent, rgba(168, 85, 247, 0.3), transparent)",
                            backgroundSize: "400% 400%",
                            animation: "gradient 4s ease infinite",
                        }}
                    ></div>

                    <div className="relative z-10 space-y-8">
                        {/* Name Input */}
                        <div
                            ref={(el) => (inputRefs.current[0] = el)}
                            className="group"
                        >
                            <label
                                htmlFor="name"
                                className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-white transition-colors duration-300"
                            >
                                Your Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus(0)}
                                    onBlur={() => handleInputBlur(0)}
                                    placeholder="What's your good name?"
                                    required
                                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div
                            ref={(el) => (inputRefs.current[1] = el)}
                            className="group"
                        >
                            <label
                                htmlFor="email"
                                className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-white transition-colors duration-300"
                            >
                                Your Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus(1)}
                                    onBlur={() => handleInputBlur(1)}
                                    placeholder="What's your email address?"
                                    required
                                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Message Textarea */}
                        <div
                            ref={(el) => (inputRefs.current[2] = el)}
                            className="group"
                        >
                            <label
                                htmlFor="message"
                                className="block text-gray-300 text-sm font-semibold mb-3 group-hover:text-white transition-colors duration-300"
                            >
                                Your Message
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus(2)}
                                    onBlur={() => handleInputBlur(2)}
                                    placeholder="How can I help you?"
                                    rows="6"
                                    required
                                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-4">
                            <button
                                ref={buttonRef}
                                type="submit"
                                disabled={isSubmitting || showSuccess}
                                className={`relative group px-12 py-4 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed transform hover:scale-105 ${
                                    showSuccess
                                        ? "bg-green-500 hover:shadow-green-500/25"
                                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25"
                                } ${isSubmitting ? "opacity-70" : ""}`}
                            >
                                {/* Button background animation */}
                                {!showSuccess && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                )}

                                {/* Button content */}
                                <span className="relative z-10 flex items-center justify-center">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                                            Sending...
                                        </>
                                    ) : showSuccess ? (
                                        <>
                                            <svg
                                                ref={successIconRef}
                                                className="w-6 h-6 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Message Sent!
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </span>

                                {/* Glow effect */}
                                <div
                                    className={`absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                                        showSuccess
                                            ? "bg-green-500/50"
                                            : "bg-gradient-to-r from-blue-600/50 to-purple-600/50"
                                    }`}
                                ></div>
                            </button>
                        </div>
                    </div>

                    {/* Form glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-50 -z-10"></div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
