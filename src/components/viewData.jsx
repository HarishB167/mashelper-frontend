import React, { useEffect, useState } from "react";
import masApiService from "./services/mashelperBackendService";

function ViewData(props) {
  const [data, setData] = useState([]);

  async function loadMaterialLineItems() {
    const data = await masApiService.getMaterialLineItems();
    console.log("data :>> ", data);
    setData(data);
  }

  useEffect(() => {
    loadMaterialLineItems();
  }, []);

  const handleDelete = async (id) => {
    await masApiService.deleteMaterialLineItem(id);
    loadMaterialLineItems();
  };

  return (
    <div className="container container-sm">
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
                    <button className="btn btn-warning btn-sm m-1">Edit</button>
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );
}

export default ViewData;
