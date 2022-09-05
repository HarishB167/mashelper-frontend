import React from "react";

/* Bootstrap Modal */
/*
  Props needed :
  Modal title
  Primary button type : warning, danger, primary
  Primary button action : onPrimaryAction

*/

function Modal(props) {
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${props.id}Label`}>
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={props.action}
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              {props.actionMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
