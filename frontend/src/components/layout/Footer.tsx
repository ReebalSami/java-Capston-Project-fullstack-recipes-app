import './Footer.css';

export default function Footer() {

    return (
        <footer >
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

