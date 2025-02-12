import {useEffect, useRef, useState} from "react";

const MagnetComponent = ({children, padding=100, disabled=false}) => {
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const magnetRef = useRef(null);

    useEffect(() => {
        if(disabled){
            setPosition({x: 0, y: 0});
            return;
        }

        // Mouse move event handler
        const handleMouseMove = (e) => {
            if(magnetRef.current){
                const {left, top, width, height} = magnetRef.current.getBoundingClientRect(); // Get the bounding box of the element
                const centerX = left + width / 2; // Calculate the center X of the element
                const centerY = top + height / 2; // Calculate the center Y of the element
                const distX = Math.abs(centerX - e.clientX); // Calculate the distance between the center X and the mouse X
                const distY = Math.abs(centerY - e.clientY); // Calculate the distance between the center Y and the mouse Y

                // Check if the mouse is inside the element
                if(distX < width / 2 + padding && distY < height / 2 + padding){
                    setIsActive(true);
                    const offsetX = (e.clientX - centerX) / 2; // Calculate the offset X
                    const offsetY = (e.clientY - centerY) / 2; // Calculate the offset Y
                    setPosition({x: offsetX, y: offsetY}); // Set the position
                }else{
                    setIsActive(false);
                    setPosition({x: 0, y: 0}); // Reset the position
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [padding, disabled]);

    return (
        <div ref={magnetRef} style={{position: "relative", display: "inline-block"}}>
            <div
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    transition: isActive ? "transform 0.3s ease-out" : "transform 0.5s ease-in-out",
                    willChange: "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default MagnetComponent;