import type { GhostaPopupProps } from './popup.type';

import React, { createContext, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import { XMarkIcon } from '../icons';
import { popup } from './popup.variant';
import { cn, generateCssVariables } from '../../utils/helpers';

export const PopupContext = createContext<GhostaPopupProps>(
  {} as GhostaPopupProps
);

const Popup: React.FC<GhostaPopupProps> = ({
  id,
  isVisible,
  alignment,
  size,
  children,
  showCloseButton,
  colors,
  classNames,
  animationOptions,
  showBackdrop = true,
  preventClose,
  onClose,
}) => {
  const motionValue = useMotionValue(0);
  const motionScale = useTransform(motionValue, [0, 0.8, 1], [0, 1.1, 1]);
  const motionOpacity = useTransform(motionValue, [0, 1], [0, 1]);

  const handleOpen = () => {
    animate(motionValue, 1, {
      duration: 0.25,
      ...animationOptions?.open,
    });
  };

  const handleClose = () => {
    if (preventClose) return;
    animate(motionValue, 0, {
      duration: 0.2,
      ...animationOptions?.close,
    }).then(onClose);
  };

  useEffect(() => {
    if (isVisible) handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <PopupContext.Provider
      value={{
        id,
        isVisible,
        alignment,
        size,
        children,
        colors,
        classNames,
        onClose: handleClose,
      }}
    >
      <AnimatePresence>
        {/* Popup */}
        <Dialog
          static
          open={isVisible}
          onClose={handleClose}
          className={cn('ghosta ghosta--root', popup({ size, alignment }))}
          style={generateCssVariables(colors)}
        >
          {/* Backdrop */}
          {showBackdrop && (
            <motion.div
              className={cn('ghosta__backdrop', classNames?.backdrop)}
              style={{
                opacity: motionOpacity,
              }}
              aria-hidden="true"
            />
          )}

          {/* Panel */}
          <div className="ghosta__scroll-container">
            <Dialog.Panel
              as={motion.div}
              className={cn('ghosta__panel', classNames?.panel)}
              style={{
                scale: motionScale,
                opacity: motionOpacity,
              }}
            >
              {/* Close Button */}
              {showCloseButton ? (
                <button
                  className={cn(
                    'ghosta__close-button',
                    classNames?.closeButton
                  )}
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <XMarkIcon />
                </button>
              ) : null}

              {/* Entire Content */}
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      </AnimatePresence>
    </PopupContext.Provider>
  );
};

export default Popup;
