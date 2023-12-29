import { useEffect } from "react";

const LockOrientation = () => {
    useEffect(() => {
        lockOrientation();
        window.addEventListener('orientationchange', lockOrientation);

        return () => {
            window.removeEventListener('orientationchange', LockOrientation)
        }
    }, [])

    const lockOrientation = () => {
        const isPortrait = window.matchMedia('(orientation: landscape)').matches;

        if (isPortrait) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('portrait');
            } else if (screen.lockOrientation) {
                screen.lockOrientation('portrait')
            }
        }
    }

    return null
}

export default LockOrientation;