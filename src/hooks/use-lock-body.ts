import { useCallback, useEffect, useRef, useState } from 'react';

interface IUseScrollLockOptions {
  autoLock?: boolean;
  lockTarget?: HTMLElement | string;
  widthReflow?: boolean;
}

interface IUseScrollLockReturn {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
}

interface IOriginalStyle {
  overflow: string;
  paddingRight: string;
}

const IS_SERVER = typeof window === 'undefined';

/**
 * useLockBody hook is used to lock the body scroll when a component is mounted.
 *
 * @param options Options to configure the hook.
 * @returns Returns an object with isLocked, lock, and unlock properties.
 */
const useLockBody = (
  options: IUseScrollLockOptions = {}
): IUseScrollLockReturn => {
  const { autoLock = true, lockTarget, widthReflow = true } = options;
  const [isLocked, setIsLocked] = useState(false);
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<IOriginalStyle | null>(null);

  const lock = useCallback(() => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style;

      // Save the original styles
      originalStyle.current = { overflow, paddingRight };

      // Prevent width reflow
      if (widthReflow) {
        // Use window inner width if body is the target as global scrollbar isn't part of the document
        const offsetWidth =
          target.current === document.body
            ? window.innerWidth
            : target.current.offsetWidth;
        // Get current computed padding right in pixels
        const currentPaddingRight =
          parseInt(window.getComputedStyle(target.current).paddingRight, 10) ||
          0;

        const scrollbarWidth = offsetWidth - target.current.scrollWidth;
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
      }

      // Lock the scroll
      target.current.style.overflow = 'hidden';

      setIsLocked(true);
    }
  }, [widthReflow]);

  const unlock = useCallback(() => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow;

      // Only reset padding right if we changed it
      if (widthReflow) {
        target.current.style.paddingRight = originalStyle.current.paddingRight;
      }
    }

    setIsLocked(false);
  }, [widthReflow]);

  useEffect(() => {
    if (IS_SERVER) return;

    if (lockTarget) {
      target.current =
        typeof lockTarget === 'string'
          ? (document.querySelector(lockTarget) as HTMLElement)
          : lockTarget;
    }

    if (!target.current) {
      target.current = document.body;
    }

    if (autoLock) {
      lock();
    }

    return () => {
      unlock();
    };
  }, [autoLock, lockTarget, widthReflow, lock, unlock]);

  return { isLocked, lock, unlock };
};

export default useLockBody;
