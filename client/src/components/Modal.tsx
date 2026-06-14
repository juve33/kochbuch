import { type JSX } from "react";
import { createPortal } from "react-dom";

import '../assets/css/modal.css';

type ModalProps = {
    name?: string;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Modal = ({ onCloseButtonClick, children } : ModalProps) => {
    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        return null;
    }

    return createPortal(
        <div className='modal__wrapper'>
            <div className='modal'>
                {children}
            </div>
            {onCloseButtonClick && (
                <button
                    type="button"
                    className="button modal-close__button"
                    onClick={onCloseButtonClick}
                >
                    x
                </button>
            )}
        </div>,
        modalRoot
    );
}

export default Modal