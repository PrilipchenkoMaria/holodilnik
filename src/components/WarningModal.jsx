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
    if (event.target.className === "modal-wrapper") this.props.closeModal();
  };

  handleKeyPress = () => {
    this.props.closeModal();
  };

  render() {
    if (this.props.isVisible) {
      return (
        <div
          className="modal-wrapper"
          onClick={this.handleClickOutside}
          role="button"
          tabIndex="0"
          onKeyPress={this.handleKeyPress}
        >
          <div className="modal">
            <p>{this.props.text}</p>
            <button type="submit" onClick={this.handleClick} className="modal__button">Ок</button>
          </div>
        </div>
      );
    }
    return null;
  }
});

export default WarningModal;
