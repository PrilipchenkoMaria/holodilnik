import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../store/actions";

export const WarningModal = connect(state => ({
    isVisible: state.modal.isVisible,
    text: state.modal.text,
}), {
    closeModal,
})(class extends React.Component {

    handleClick = event => {
        event.preventDefault();
        this.props.closeModal();
    };
    handleClickOutside = event => {
        if (event.target.className === "ModalWrapper") this.props.closeModal();
    };

    render() {
        if (this.props.isVisible) {
            return (
                <div className="ModalWrapper" onClick={this.handleClickOutside}>
                    <div className="Modal">
                        <p>{this.props.text}</p>
                        <button onClick={this.handleClick} className="ModalButton">Ок</button>
                    </div>
                </div>
            );
        } else return null;
    }
});
