import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="container container-sm">
      <div>
        <a className="btn btn-primary btn-sm m-2" href="">
          Download Data in CSV
        </a>
        <Link className="btn btn-primary btn-sm m-2" to="view-data">
          View Data
        </Link>
      </div>
      <form>
        <label className="form-label mt-2 mb-0" htmlFor="date">
          Date of Issue/Consumption
        </label>
        <input className="form-control" name="date" type="date" required />
        <label className="form-label mt-2 mb-0" htmlFor="location">
          Location
        </label>
        <input className="form-control" name="location" type="text" required />
        <label className="form-label" mt-2 mb-0 htmlFor="remarks">
          Remarks
        </label>
        <input className="form-control" name="remarks" type="text" required />
        <div className="row">
          <fieldset className="col col-6">
            <legend>Add Item</legend>
            <label className="form-label mt-2 mb-0" htmlFor="material">
              Material Name
            </label>
            <input
              className="form-control"
              name="material"
              type="text"
              required
            />
            <label className="form-label mt-2 mb-0" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              min="0"
              required
            />
            <label className="form-label mt-2 mb-0" htmlFor="unit">
              Unit
            </label>
            <select className="form-control" name="unit" id="unit" required>
              <option value="">Select unit...</option>
              <option value="EA">EA</option>
              <option value="M">M</option>
              <option value="KG">KG</option>
              <option value="ROL">ROL</option>
              <option value="L">L</option>
              <option value="ST">ST</option>
            </select>
            <button className="btn btn-primary btn-sm m-2" type="submit">
              Add Item
            </button>
            <button className="btn btn-primary btn-sm m-2" type="submit">
              Save
            </button>
          </fieldset>
          <div className="col col-6">
            <table className="table create-data-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table__tbody">
                <tr>
                  <td>Eyehook</td>
                  <td>4 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Trf.Oil</td>
                  <td>10 L</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>IPC P4</td>
                  <td>10 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>LT Tape</td>
                  <td>2 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Eyehook</td>
                  <td>4 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Trf.Oil</td>
                  <td>10 L</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>IPC P4</td>
                  <td>10 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>LT Tape</td>
                  <td>2 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Eyehook</td>
                  <td>4 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Trf.Oil</td>
                  <td>10 L</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>IPC P4</td>
                  <td>10 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>LT Tape</td>
                  <td>2 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Eyehook</td>
                  <td>4 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>Trf.Oil</td>
                  <td>10 L</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>IPC P4</td>
                  <td>10 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
                <tr>
                  <td>LT Tape</td>
                  <td>2 EA</td>
                  <td>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Home;
