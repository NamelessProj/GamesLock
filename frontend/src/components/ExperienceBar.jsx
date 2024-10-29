import {useEffect, useRef} from "react";
import {useInView, useMotionValue, useSpring} from "framer-motion";

const ExperienceBar = ({to, from=0, delay=0, duration=2, progressColor="linear-gradient(90deg, #fddc75, #bc4b27)", className="", startWhen=true, onStart, onEnd}) => {
    const ref = useRef(null);
    const returnPercent = to < 0 || to > 100 ? 0 : to;

    const motionValue = useMotionValue(from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness
    });

    const isInView = useInView(ref, {
        once: true,
        margin: "0px"
    });

    useEffect(() => {
        if(ref.current){
            ref.current.style.cssText = `width: ${from}%; background: ${progressColor};`;
        }
    }, [from, to]);

    useEffect(() => {
        if(isInView && startWhen){
            if(typeof onStart === "function"){
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(() => {
                if(typeof onEnd === "function"){
                    onEnd();
                }
            }, delay * 1000 + duration * 1000);

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, from, to, delay, onStart, onEnd, duration]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if(ref.current){
                ref.current.style.cssText = `width: ${latest}%; background: ${progressColor};`;
            }
        });

        return () => unsubscribe();
    }, [springValue]);

    return (
        <div className={`experience-bar w-full h-1.5 rounded-full overflow-hidden bg-extra-gray-50 mx-auto ${className}`} aria-label={returnPercent+"%"}>
            <div ref={ref} className="rounded-full w-0 h-full bg-primary-400"></div>
        </div>
    );
};

export default ExperienceBar;