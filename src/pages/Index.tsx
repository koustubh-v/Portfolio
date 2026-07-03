import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Twitter, Download, ChevronDown } from "lucide-react";

// Components
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import Navigation from "@/components/Navigation";

// --- Cursor Follower ---
const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x, y }}
    />
  );
};

const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference">
    <h1 className="font-sans font-black text-2xl md:text-4xl tracking-tighter text-white flex items-start uppercase">
      KOUSTUBH.DEV
    </h1>
  </div>
);

const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
    style={{ top: "2.25rem" }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
    </span>
    <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-white">
      Available for work
    </span>
  </motion.div>
);

const SocialStrip = () => {
  const socials = [
    { label: "GitHub", href: "https://github.com/koustubh-v" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/koustubh-verma/" },
    { label: "Instagram", href: "https://www.instagram.com/koustubh._.07/" },
    { label: "Email", href: "mailto:hp.koustubh@gmail.com" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute z-20 hidden md:flex flex-col items-center"
      style={{ right: "64px", top: "112px", bottom: "194px", justifyContent: "center", gap: "1rem" }}
    >
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          title={label}
          className="group flex-shrink-0"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="font-sans font-black text-[10px] tracking-[0.22em] uppercase text-white group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </a>
      ))}
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
};

const SpinningCTA = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="absolute md:z-30 lg:z-10 hidden md:flex items-center justify-center"
    style={{ bottom: "4rem", right: "4rem" }}
  >
    <style>{`
      @keyframes ctaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cta-ring { animation: ctaSpin var(--cta-spin-duration, 10s) linear infinite; transform-origin: center; }
      .cta-wrap:hover .cta-ring { --cta-spin-duration: 3s; }
      .cta-wrap { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      .cta-wrap:hover { transform: scale(1.08); }
    `}</style>
    <a href="#contact" className="cta-wrap group relative flex items-center justify-center w-[130px] h-[130px]" aria-label="Get in touch">
      <svg viewBox="0 0 130 130" className="absolute inset-0 w-full h-full pointer-events-none">
        <circle cx="65" cy="65" r="62" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 130 130" className="cta-ring absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <path id="cta-circle-path" d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
        </defs>
        <text fill="rgba(255,255,255,1)" fontSize="8.5" fontFamily="'Inter', sans-serif" fontWeight="900" letterSpacing="4">
          <textPath href="#cta-circle-path">GET IN TOUCH · GET IN TOUCH · GET IN TOUCH ·&nbsp;</textPath>
        </text>
      </svg>
      <span className="absolute inset-4 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out" style={{ transformOrigin: "center" }} />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 w-6 h-6 text-white group-hover:text-black" style={{ transition: "color 0.3s ease" }}>
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  </motion.div>
);

const MobileSocialStrip = () => {
  const socials = [
    { label: "Github", icon: Github, href: "https://github.com/koustubh-v" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/koustubh-verma/" },
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/koustubh._.07/" },
    { label: "Email", icon: Mail, href: "mailto:hp.koustubh@gmail.com" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
          className="text-white hover:opacity-75 transition-opacity duration-300 block">
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};

const Index = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setVideoEnded(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"]
  });
  const { scrollY } = useScroll();

  // Create parallax effect: Footer starts higher up and moves to normal position as we scroll into it
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  
  // Parallax effect for the hero section
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: videoEnded ? 1 : 0 }} transition={{ duration: 1 }} className="pointer-events-none z-50">
        <div className="pointer-events-auto">
          <BrandLogo />
        </div>
        <div className="pointer-events-auto">
          <Navigation />
        </div>
      </motion.div>
      <CursorFollower />

      {/* Fixed background About section */}
      <div className="fixed inset-0 z-0 bg-white text-black">
        <About />
      </div>

      {/* Hero */}
      <section className="relative h-screen bg-black flex flex-col items-center justify-center z-20 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          {/* Center Video for Desktop */}
          {!isMobile && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
               <video 
                 src="/Assets/Images/Intro_Vid With Text.mp4" 
                 autoPlay 
                 muted 
                 playsInline
                 onEnded={() => setVideoEnded(true)}
                 className="w-full h-full object-contain md:w-4/5 lg:w-3/4" 
               />
            </div>
          )}

          {/* Tagline for Mobile */}
          {isMobile && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase mb-4"
              >
                Crafting <br /> Digital <span className="text-white/50">Experiences</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-sm text-white/70 font-medium tracking-widest uppercase"
              >
                Web Developer • ML Engineer
              </motion.p>
            </div>
          )}

          {/* Bottom Mask/Gradient for video cutoff */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/15 to-transparent pointer-events-none z-10" />

          {/* Left Side */}
          <motion.div 
            className="absolute left-6 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20 flex flex-row items-end gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: videoEnded ? 1 : 0, x: videoEnded ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-sans text-xs font-medium text-white uppercase tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                Scroll to Explore
              </span>
              <ChevronDown className="w-5 h-5 text-white animate-bounce mt-4" />
            </div>

            <a 
              href="https://drive.google.com/file/d/1DSoi35HSZVdu0OTJUnbgPkzhWkGmegAh/view?usp=drive_link" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full border border-white/30 py-6 px-3 flex flex-col items-center gap-4 hover:border-white transition-colors backdrop-blur-sm bg-black/20"
            >
              <span className="absolute inset-0 bg-white translate-y-[-101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <Download className="relative z-10 w-4 h-4 text-white group-hover:text-black transition-colors" />
              <span className="relative z-10 font-sans font-black text-xs tracking-widest uppercase text-white group-hover:text-black transition-colors" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                View Resume
              </span>
            </a>
          </motion.div>

          {/* Right Side */}
          <motion.div 
            className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20"
            initial="hidden"
            animate={videoEnded ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <span className="w-[1px] h-12 bg-white/30" />
              {[
                { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', href: 'https://www.linkedin.com/in/koustubh-verma/' },
                { name: 'GitHub', icon: Github, color: '#ffffff', href: 'https://github.com/koustubh-v' },
                { name: 'Twitter', icon: Twitter, color: '#1DA1F2', href: 'https://x.com/verma_koustubh' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="p-3 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: social.color + '20', borderColor: social.color + '40' }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${social.color}aa` }}
                >
                  <social.icon 
                    size={22} 
                    color={social.color} 
                    className="drop-shadow-lg"
                  />
                </motion.a>
              ))}
              <span className="w-[1px] h-12 bg-white/30" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Content stack */}
      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="work" className="bg-black text-white relative z-20">
          <SelectedWorks />
        </div>

        <div className="bg-white text-black relative z-20">
          <VectorBridge />
        </div>

        <div className="bg-black text-white relative z-20">
          <Testimonial />
        </div>

        {/* Change contact layer to z-20 and relative so it scrolls normally OVER the footer */}
        <div id="contact" className="relative z-20 bg-white text-black">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;