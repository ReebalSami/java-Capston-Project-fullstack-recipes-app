import './Footer.css';
import {useEffect, useState} from "react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;

            setIsVisible(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={isVisible ? 'visible' : 'hidden'}>
            <div className="first-line">
                &copy; 2024 RecipeApp. All rights reserved.
            </div>
            <div className="second-line">
                <a href="#top">Back to Top</a> |{" "}
                <a href="/terms">Terms of Service</a> |{" "}
                <a href="/privacy">Privacy Policy</a> |{" "}
                <a href="/about">About Us</a> |{" "}
                <a href="/faq">FAQs</a>
            </div>
        </footer>
    );
}

