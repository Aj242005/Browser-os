import { navIcons } from "#constants"
import { Routes, Route, data } from "react-router"
import { TextEditorNavbar } from "./navbar/TextEditorNAVBAR";
import { MainNavBar } from "./navbar/MainNAVBAR";
import { DiagramNavBar } from "./navbar/DiagramNAVBAR";
import { BrowserNavBar } from "./navbar/BrowserNAVBAR";
import { SpotifyyyNavBar } from "./navbar/SpotifyyyNAVBAR";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


interface Props {
    className?: string;

}

const RouteBasedNavbar = () => {
    return (
        <Routes>
            <Route path="/text-editor/*" element={<TextEditorNavbar/>} />
            <Route path="/diagram/*" element={<DiagramNavBar />}/>
            <Route path="/browser/*" element={<BrowserNavBar />}/>
            <Route path="/spotifyyy/*" element={<SpotifyyyNavBar/> }/>
            <Route path="/*" element={<MainNavBar />}/>
        </Routes>
    )
}

export const Navbar = (props: Props) => {
    let [date,setDate] = useState(dayjs().format('ddd MMM D h:mm A'))
    useEffect( ()=>{
        setInterval(()=>{
            setDate(dayjs().format('ddd MMM D h:mm A'))
        },20000)
        console.log('changed date');
    },[])

    return (
        <>
            <nav className={props.className} >
                <div>
                    <img src="/images/logo.svg" alt="apple's logo" className="mb-1" />
                    <RouteBasedNavbar />
                </div>
                <div>
                    <ul>
                        {navIcons.map((items) => (
                            <li key={items.id} ><button className="hover:cursor-pointer" ><img src={items.img} /></button></li>
                        ))}
                    </ul>
                    <time>{date}</time>
                </div>

            </nav>
        </>
    )
}