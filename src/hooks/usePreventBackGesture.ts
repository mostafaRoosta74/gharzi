import { RefObject, useEffect } from "react";

const usePreventBackGesture = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const element = ref.current;
    const handler = (e: TouchEvent) => {
      // is not near edge of view, exit
      const { pageX } = e.touches[0];
      if (pageX > 10 && pageX < window.innerWidth - 10) return;

      // prevent swipe to navigate back gesture
      e.preventDefault();
    };

    element?.addEventListener("touchstart", handler);

    return () => {
      element?.removeEventListener("touchstart", handler);
    };
  }, [ref]);
};

export default usePreventBackGesture;
