import React from 'react';

import './ErrorModal.css';

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        <h2>Ein Fehler ist aufgetreten!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button className="error-modal__button" type="button" onClick={props.onClose}>
            Ok
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
