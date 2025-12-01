import { useRef, useState, type ReactHTMLElement, useCallback } from "react"
import { useNavigate } from "react-router";



interface Prop {
    children?: ReactHTMLElement<HTMLDivElement>,
    className?: string
}

export const MacOSFolder = (props: Prop) => {
    const [isVisible,setIsVisibile] = useState(true);
    const [isMaximized,setIsMaximized] = useState(false);
    const draggableComponent = useRef<HTMLDivElement | null>(null);
    const navigator = useNavigate();


    const onCloseIconClick = useCallback(() => {
        navigator('/home',{
            replace : true
        })
    },[navigator]);



    const onMaximizeIconClick = useCallback(() => {
        setIsMaximized(!isMaximized);
    },[isMaximized,setIsMaximized])
    
    
    const onMinimizedIconClick = useCallback(() => {
        setIsVisibile(false);
    },[isVisible,setIsVisibile])
    
    
    return (
        <>
            <div className={" bg-gray-200 absolute left-1/2 top-[51.99%] -translate-x-1/2 -translate-y-1/2 " + props.className + (isMaximized?" w-full h-[95.99%]":" w-[50%] h-[70%] rounded-xl")} hidden={!isVisible} >
                <div ref={draggableComponent} className={" w-full  h-9 " + (isMaximized?"cursor-default":"cursor-all-scroll")}>
                    <div className="relative justify-evenly flex w-30 mt-2 cursor-auto" >
                        <img src="/icons/close-icon.png " className=" mt-0.5 scale-[1.2] w-[20%] cursor-pointer " onClick={onCloseIconClick} />
                        <img src="/icons/minimize-icon.png" className="mt-0.5 scale-[1.2] w-[20%] cursor-pointer " onClick={onMinimizedIconClick}/>
                        <img src="/icons/maximize-icon.png" className=" mt-1 scale-[1.1] w-[20%] cursor-pointer " onClick={onMaximizeIconClick}/>
                    </div>
                    <hr className="mt-2 w-full font-bold text-gray-400" />
                </div>
                {props.children}
            </div>
        </>
    )
}