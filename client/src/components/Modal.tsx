import { type JSX } from "react";

import '../assets/css/modal.css';

type ModalProps = {
    name?: string;
    onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
};

const Modal = ({ onCloseButtonClick, children } : ModalProps) => {
    return (
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
        </div>
    )
}

export default Modal