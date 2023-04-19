import { useEffect, useState, forwardRef } from "react";


const useScrollToTop = (ref, height) => {
    const [scrollToTopIsVisible, setScrollToTopIsVisible] = useState();

    const scrollToTop = () => {
        if (ref.current) {
            ref.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const toggleVisibility = () => {
        if (ref.current) {
            if (ref.current.scrollTop > height) {
                setScrollToTopIsVisible(true);
            } else {
                setScrollToTopIsVisible(false);
            }
        }
    };

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("scroll", toggleVisibility);
            return () =>
                ref?.current?.removeEventListener("scroll", toggleVisibility);
        }
    }, []);

    return [scrollToTopIsVisible, scrollToTop];
};

export default useScrollToTop;