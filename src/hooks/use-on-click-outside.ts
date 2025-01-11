import { useEffect } from 'react';

/**
 * useOnClickOutside hook is used to handle the click event outside the element.
 *
 * @param ref Reference to the element.
 * @param handler Function to handle the click event.
 * @returns void
 */
const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    // Define the event listener
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if the element is clicked
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Call the handler function when the click event is outside the element
      handler(event);
    };

    // Attach the event listener to the document to handle the click event outside the element
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
