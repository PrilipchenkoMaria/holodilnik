import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeModal } from "../store/actions";

const WarningModal = connect((state) => ({
  isVisible: state.modal.isVisible,
  text: state.modal.text,
}), {
  closeModal,
})(class extends React.Component {
  static defaultProps = {
    text: null,
  };

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    text: PropTypes.string,
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.closeModal();
  };

  handleClickOutside = (event) => {
    if (event.target.className === "ModalWrapper") this.props.closeModal();
  };

  handleKeyPress = () => {
    this.props.closeModal();
  };

  render() {
    if (this.props.isVisible) {
      return (
        <div
          className="ModalWrapper"
          onClick={this.handleClickOutside}
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
        >
          <div className="Modal">
            <p>{this.props.text}</p>
            <button type="submit" onClick={this.handleClick} className="ModalButton">Ок</button>
          </div>
        </div>
      );
    }
    return null;
  }
});

export default WarningModal;
