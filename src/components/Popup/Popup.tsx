import type { GhostaPopupProps } from "./popup.type";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";

import { XMarkIcon } from "../icons";
import { popup } from "./popup.variant";
import { generateCssVariables } from "../../utils/helpers";

export const PopupContext = React.createContext<GhostaPopupProps>(
  {} as GhostaPopupProps
);

let closeTimeout: NodeJS.Timeout;

const Popup: React.FC<GhostaPopupProps> = ({
  id,
  isVisible,
  alignment,
  size,
  children,
  showCloseButton,
  colors,
  classNames,
  showBackdrop = true,
  preventClose,
  onClose,
}) => {
  const [showPopup, setShowPopup] = React.useState(isVisible);

  const handleClose = () => {
    if (preventClose) return;
    setShowPopup(false);
    closeTimeout = setTimeout(onClose, 250);
  };

  React.useEffect(() => {
    setShowPopup(isVisible);
  }, [isVisible]);

  React.useEffect(() => {
    return () => clearTimeout(closeTimeout);
  }, []);

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
      {/* Popup */}
      <Dialog.Root open={showPopup} onOpenChange={handleClose}>
        <Dialog.Portal>
          {/* Backdrop */}
          {showBackdrop && (
            <Dialog.Overlay
              className={cx("ghosta__backdrop", classNames?.backdrop)}
              style={generateCssVariables(colors)}
            />
          )}

          <Dialog.Content
            className={cx("ghosta__panel", popup({ size, alignment }))}
            style={generateCssVariables(colors)}
          >
            {/* Close Button */}
            {showCloseButton ? (
              <Dialog.Close
                className={cx("ghosta__close-button", classNames?.closeButton)}
                aria-label="Close"
                onClick={handleClose}
              >
                <XMarkIcon />
              </Dialog.Close>
            ) : null}

            {/* Entire Content */}
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </PopupContext.Provider>
  );
};

export default Popup;
