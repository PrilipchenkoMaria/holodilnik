import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../store/actions";
import ForgotPassword from "./Auth/ForgotPassword";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

const Index = (props) => {
  const {
    // eslint-disable-next-line no-shadow
    closeModal,
    isVisible,
    text,
    type,
  } = props;

  function getMessageModal() {
    return (
      <div className="modal">
        <p>{text}</p>
        <button type="submit" onClick={handleClick} className="modal__button">Ок</button>
      </div>
    );
  }

  function getModalContent() {
    switch (type) {
      case "signin": {
        return <SignIn />;
      }
      case "signup": {
        return <SignUp />;
      }
      case "forgotPassword": {
        return <ForgotPassword />;
      }
      case "message": {
        return getMessageModal();
      }
      default: {
        return getMessageModal();
      }
    }
  }

  function handleClick(event) {
    event.preventDefault();
    closeModal();
  }

  function handleClickOutside(event) {
    if (event.target.className === "modal-wrapper") closeModal();
  }

  function handleKeyPress() {
    closeModal();
  }

  return isVisible && (
    <div
      className="modal-wrapper"
      onClick={handleClickOutside}
      role="button"
      tabIndex="0"
      onKeyPress={handleKeyPress}
    >
      {getModalContent()}
    </div>
  );
};

Index.defaultProps = {
  text: null,
  type: "message",
};

Index.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default connect((state) => ({
  isVisible: state.modal.isVisible,
  text: state.modal.text,
  type: state.modal.type,
}), {
  closeModal,
})(Index);
