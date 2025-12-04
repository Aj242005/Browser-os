import { useRef, useId } from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Outlet } from "react-router"




const renderText = (text: string, className: string, baseWeight: number = 400) => {
    return [...text].map((char) => {
        return (<span key={useId()} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char == ' ' ? "\u00A0" : char}
        </span>)
    })
}




const title = { min: 400, max: 900, default: 400 };





const setUpTextHover = (container: HTMLHeadingElement | null) => {
    if (!container) return () => { };

    const letters = container.querySelectorAll("span");


    const animate = (letter: HTMLSpanElement, weigth: number, duration: number = 0.25) => {
        gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weigth}` })
    }


    const handleMouseMove = (e: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const l = left;
        letters.forEach((letter: HTMLSpanElement) => {
            const { left, width } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - left + l - width / 2);
            const intensity = Math.exp(-(distance ** 2) / 20000);
            animate(letter, title.min + (title.max - title.min) * intensity)
        })
    }

    const handleMouseLeave = (e: MouseEvent) => {
        e.preventDefault();
        letters.forEach((letter) => {
            animate(letter, title.default, 0.3);
        })
    }


    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);


    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
}


export const Home = () => {

    const welcomeRef = useRef<HTMLHeadingElement | null>(null);
    const parentRef = useRef<HTMLElement | null>(null);

    useGSAP(() => {
        setUpTextHover(welcomeRef.current);
    }, [])
    



    return (<>
        <Outlet context={parentRef.current}/>
        <section id="welcome" ref={parentRef}>
            <h1 ref={welcomeRef} className="mt-7" >
                {renderText('Welcome', "text-9xl italic font-georama")}
            </h1>
            <div className="small-screen" >
                <p>This is only designed for desktop/tablet screens only</p>
            </div>
        </section>
    </>)
}