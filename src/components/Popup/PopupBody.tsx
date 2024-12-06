import type { GhostaPopupBodyProps } from "./popup.type";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";

import { PopupContext } from "./Popup";
import { popupContent } from "./popup.variant";

const PopupBody: React.FC<GhostaPopupBodyProps> = ({
  title,
  description,
  icon,
  content,
}) => {
  const { alignment, classNames } = React.useContext(PopupContext);

  if (!title && !description && !icon && !content) {
    return <div className="ghosta__nocontent" />;
  }

  return (
    <div
      className={cx(
        "ghosta__content",
        popupContent({ alignment }),
        classNames?.panelBody
      )}
    >
      {icon ? (
        <div className={cx("ghosta__content__icon", classNames?.icon)}>
          {icon}
        </div>
      ) : null}
      {title ? (
        <Dialog.Title
          className={cx("ghosta__content__title", classNames?.title)}
        >
          {title}
        </Dialog.Title>
      ) : null}
      {description ? (
        <div className={cx("ghosta__content__desc", classNames?.description)}>
          {description}
        </div>
      ) : null}
      {content ? (
        <div className="ghosta__content__content">{content}</div>
      ) : null}
    </div>
  );
};

export default PopupBody;
