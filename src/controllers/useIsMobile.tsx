import { useState, useEffect } from 'react';

const useIsMobile = (width: number) => {
    const windowIsDefined = typeof window === `object`;

    const isMobile = () => {
        return windowIsDefined && window.innerWidth < width;
    };

    const [activeClass, setActiveClass] = useState(isMobile);

    useEffect(() => {
        const listenWindowResize = () => {
            const handleResize = () => {
                setActiveClass(isMobile());
            };

            window.addEventListener(`resize`, handleResize, { passive: true });
            return () => window.removeEventListener(`resize`, handleResize);
        };

        listenWindowResize();
    }, []);

    return activeClass;
};

export default useIsMobile;
