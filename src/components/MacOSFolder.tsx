import { useRef, useState, useCallback, useEffect, type MouseEvent ,type ReactNode } from "react";
import { useNavigate } from "react-router";

interface Prop {
    children?: ReactNode;
    className?: string;
}

export const MacOSFolder = (props: Prop) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragged, setIsDragged] = useState(false);

    const dragOffset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement | null>(null);

    const navigator = useNavigate();

    useEffect(() => {
        if (windowRef.current) {
            const { innerWidth, innerHeight } = window;
            const { offsetWidth, offsetHeight } = windowRef.current;
            setPosition({
                x: (innerWidth - offsetWidth) / 2,
                y: (innerHeight - offsetHeight) / 2
            });
        }
    }, []);

    const onCloseIconClick = useCallback(() => {
        navigator('/home', { replace: true });
    }, [navigator]);

    const onMaximizeIconClick = useCallback(() => {
        setIsMaximized((prev) => !prev);
    }, []);

    const onMinimizedIconClick = useCallback(() => {
        setIsVisible(false);
    }, []);

    const onMouseDownDraggable = (e: MouseEvent<HTMLDivElement>) => {
        if (isMaximized) return;

        setIsDragged(true);

        if (windowRef.current) {
            const rect = windowRef.current.getBoundingClientRect();
            dragOffset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!isDragged) return;

            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragged(false);
        };

        if (isDragged) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragged]);

    if (!isVisible) return null;

    return (
        <div
            ref={windowRef}
            style={!isMaximized ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute'
            } : {}}
            className={`
                bg-gray-200 
                ${props.className || ''} 
                ${isMaximized ? "fixed inset-0 w-full h-full rounded-none" : "absolute w-[50%] h-[70%] rounded-xl shadow-xl"} 
                flex flex-col overflow-hidden
            `}
        >
            <div
                className={`w-full h-9 bg-gray-300 flex flex-col justify-center ${isMaximized ? "cursor-default" : "cursor-move"}`}
                onMouseDown={onMouseDownDraggable}
            >
                <div className="relative justify-evenly flex w-30 mt-2 cursor-auto select-none " unselectable="on"  >
                        
                        
                        <img src="/icons/close-icon.png " className=" mt-0.5 scale-[1.2] w-[20%] cursor-pointer " onClick={onCloseIconClick} />
                        <img src="/icons/minimize-icon.png" className="mt-0.5 scale-[1.2] w-[20%] cursor-pointer " onClick={onMinimizedIconClick} />
                        <img src="/icons/maximize-icon.png" className=" mt-1 scale-[1.1] w-[20%] cursor-pointer " onClick={onMaximizeIconClick} />
                    
                    
                    </div>
                    
                    
                    <hr className="mt-2 w-full font-bold text-gray-400" />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto relative">
                {props.children}
            </div>
        </div>
    );
};