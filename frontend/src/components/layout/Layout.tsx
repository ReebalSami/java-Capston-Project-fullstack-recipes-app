import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
    user: string | undefined | null

}
export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header user={props.user} />
            <div className={"layout"}>
                <main>
                    {props.children}
                </main>
            </div>
            <Footer/>
        </>
    )
}