import {ReactNode, useEffect, useState} from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {User} from "../../types/User.ts";

type LayoutProps = {
    children: ReactNode;
    user: User | undefined | null;
};


export default function Layout(props: Readonly<LayoutProps>) {
    const [showFooter, setShowFooter] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight;
            const clientHeight =
                document.documentElement.clientHeight || window.innerHeight;

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                setShowFooter(scrollTop + clientHeight >= scrollHeight);
            } else {
                // Scrolling up
                setShowFooter(false);
            }
            setLastScrollTop(scrollTop);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <>
            <Header user={props.user} />
            <div className="layout">
                <main>{props.children}</main>
            </div>
            {showFooter && <Footer />}
        </>
    );
}
