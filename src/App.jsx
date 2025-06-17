import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Skills from "./sections/Skills";
import Work from "./sections/Work";

const App = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Work />
            <Skills />
            <Contact />
            <Footer />
        </>
    );
};

export default App;
