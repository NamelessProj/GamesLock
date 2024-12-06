import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Squares = ({direction="down", speed=1, squareSize=50, borderColor="#999", hoverFillColor="#222", hover=false, className=""}) => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const numSquaresX = useRef();
    const numSquaresY = useRef();
    const gridOffset = useRef({x: 0, y: 0});
    const [hoveredSquare, setHoveredSquare] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let i = 0; i < numSquaresX.current; i++){
                for(let j = 0; j < numSquaresY.current; j++){
                    const squareX = (i * squareSize) + (gridOffset.current.x % squareSize);
                    const squareY = (j * squareSize) + (gridOffset.current.y % squareSize);

                    // Fill square if it is hovered
                    if(hover && hoveredSquare && hoveredSquare.x === i && hoveredSquare.y === j){
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    }

                    // Set border color
                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }

            // Draw radial gradient overlay
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 2
            );
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)"); // transparent at center
            gradient.addColorStop(1, "#000"); // Black at edge

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const updateAnimation = () => {
            switch(direction){
                case "down":
                    gridOffset.current.y += speed;
                    break;
                case "up":
                    gridOffset.current.y -= speed;
                    break;
                case "left":
                    gridOffset.current.x += speed;
                    break;
                case "right":
                    gridOffset.current.x -= speed;
                    break;
                case "diagonal":
                default:
                    gridOffset.current.x -= speed;
                    gridOffset.current.y -= speed;
                    break;
            }

            if(Math.abs(gridOffset.current.x) > squareSize) gridOffset.current.x = 0;
            if(Math.abs(gridOffset.current.y) > squareSize) gridOffset.current.y = 0;

            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        // Track mouse hover
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate hovered square
            const hoveredSquareX = Math.floor((mouseX - (gridOffset.current.x % squareSize)) / squareSize);
            const hoveredSquareY = Math.floor((mouseY - (gridOffset.current.y % squareSize)) / squareSize);

            setHoveredSquare({x: hoveredSquareX, y: hoveredSquareY});
        };

        // Clear hover state when mouse leaves canvas
        const handleMouseLeave = () => {
            setHoveredSquare(null);
        };

        if(hover){
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener("mouseleave", handleMouseLeave);
        }

        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(requestRef.current);
            if(hover){
                canvas.removeEventListener("mousemove", handleMouseMove);
                canvas.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [direction, speed, borderColor, hoverFillColor, hoveredSquare, navigate]);

    return <canvas ref={canvasRef} className={`w-full h-full border-none block ${className}`} />;
};

export default Squares;