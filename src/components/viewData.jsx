import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./common/modal";
import SpinnerWhileLoading from "./common/spinnerWhileLoading";
import masApiService from "./services/mashelperBackendService";

function ViewData(props) {
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");

  async function loadMaterialLineItems() {
    const data = await masApiService.getMaterialLineItems();
    console.log("data :>> ", data);
    setData(data);
  }

  useEffect(() => {
    loadMaterialLineItems();
  }, []);

  const handleDelete = async () => {
    await masApiService.deleteMaterialLineItem(itemToDelete);
    loadMaterialLineItems();
    setItemToDelete("");
  };

  return (
    <div className="container container-sm">
      <Modal
        id="modalPopup"
        title="Delete"
        body="Are you sure you want to delete this item?"
        action={handleDelete}
        actionMessage="Delete"
      ></Modal>
      <SpinnerWhileLoading
        className="d-flex flex-column align-items-center"
        spinnerType="grow"
        showSpinnerWhen={data.length === 0}
      >
        <table className="table view-data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Material</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <React.Fragment>
                <tr key={`${idx}`}>
                  <td className="text-nowrap fs-7 align-middle">{item.date}</td>
                  <td className=" align-middle">
                    <a
                      data-bs-toggle="collapse"
                      href={`#collapse${idx}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapse${idx}`}
                    >
                      {item.material_name}
                    </a>
                  </td>
                  <td className=" align-middle">
                    {item.quantity} {item.unit}
                  </td>
                  <td>
                    <div className="d-flex align-items-center flex-column">
                      <Link
                        className="btn btn-warning btn-sm m-1"
                        to={`edit-data/${item.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => setItemToDelete(item.id)}
                        data-bs-toggle="modal"
                        data-bs-target="#modalPopup"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                <tr key={`${idx}_collapse`}>
                  <td colSpan="4" className="p-0">
                    <div id={`collapse${idx}`} className="collapse">
                      <div className="card card-body">
                        <div>
                          <strong>Location : </strong>
                          <span>{item.location}</span>
                        </div>
                        <div>
                          <strong>Remarks : </strong>
                          <span>{item.remarks}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </SpinnerWhileLoading>
    </div>
  );
}

export default ViewData;
