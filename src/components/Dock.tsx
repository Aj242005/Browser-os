import { dockApps } from "#constants"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { NavLink } from "react-router"
import { Tooltip } from 'react-tooltip'
import { gsap } from "gsap/gsap-core"


export const Dock = () => {
    
    
    const dockRef = useRef<HTMLDivElement | null>(null);

    useGSAP( () => {
        const dock = dockRef.current;
        if(!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');

        const animateIcons = (mouseHorizontalPosition : number) => {
            const { left } = dock.getBoundingClientRect();
            const l = left;
            icons.forEach( (icon) => {
                const { left, width } = icon.getBoundingClientRect();
                const center  = left - l + width/2;
                const distance = Math.abs(mouseHorizontalPosition - center);
                const intensity = Math.exp( -(distance ** 2.5) / 20000);

                gsap.to( icon , {
                    scale : 1 + 0.25*intensity,
                    y : -15*intensity,
                    duration : 0.2,
                    ease : "power2.out"
                })
            })
        }

        const handleMouseMove = (e : MouseEvent) => {
            const {left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        }

        const resetIcons = () => {
            icons.forEach( (icon) => gsap.to( icon, {
                scale : 1,
                y : 0,
                duration : 0.3,
                ease : "power1.out"
            } ))
        }

        dock.addEventListener('mousemove',handleMouseMove);
        dock.addEventListener("mouseleave",resetIcons);

    }, []);

    return (
        <>
            <section id="dock" >
                <div ref={dockRef} className="dock-container">
                    {dockApps.map( (apps) => (
                        <div key={apps.id} className="relative flex justify-center" >
                            <button type="button" className="dock-icon" aria-label={apps.name} data-tooltip-id = {"dock-tooltip"} data-tooltip-content={apps.name} 
                            data-tooltip-delay-show={150}
                            disabled={!apps.canOpen}
                            >
                                <NavLink to={apps.to}>
                                    <img src={`/icons/${apps.icon}`} className={"scale-[0.95] " + (apps.canOpen)?" ":" opacity-50"} alt={apps.name} loading="lazy" />
                                </NavLink>
                            </button>
                        </div>
                    ))}
                    <Tooltip id="dock-tooltip" place="top" className="tooltip" />
                </div>
            </section>
        </>
    )
}