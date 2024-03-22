import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;

}
export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header />
            <div className={"layout"}>
                <main>
                    {props.children}
                </main>
            </div>
            <Footer/>
        </>
    )
}