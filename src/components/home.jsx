import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import masApiService from "./services/mashelperBackendService";
import SpinnerWhileLoading from "./common/spinnerWhileLoading";

const schema = {
  date: Joi.string().required().label("Date"),
  location: Joi.string().required().label("Location"),
  remarks: Joi.string().required().label("Remarks"),
  material_name: Joi.number().required().label("Material Name"),
  quantity: Joi.number().required().min(0.01).label("Quantity"),
  unit: Joi.number().required().label("Unit"),
};

function Home(props) {
  const [unitsList, setUnitsList] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    date: "",
    location: "",
    remarks: "",
    material_name: "",
    quantity: "",
    unit: "",
  });
  const [itemList, setItemList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const dateInput = useRef(null);

  useEffect(() => {
    async function loadSelectListData() {
      const unitsList = await masApiService.getUnitsList();
      const materialsList = await masApiService.getMaterialsList();
      setUnitsList(unitsList);
      setMaterialsList(materialsList);
      setShowSpinner(false);
    }
    loadSelectListData();
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    console.log("Adding item to list", currentItem);
    if (validate()) {
      toast.error(JSON.stringify(validate()));
      return false;
    }
    setItemList([...itemList, { ...currentItem }]);
    setCurrentItem({
      ...currentItem,
      material_name: "",
      quantity: "",
      unit: "",
    });
  };
  console.log("itemList :>> ", itemList);

  const validate = () => {
    const result = Joi.validate(currentItem, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const getMaterialNameForId = (id) => {
    const material = materialsList.find((mat) => mat.id === Number(id));
    if (material) return material.name;
    return "Not found";
  };

  const getUnitForId = (id) => {
    const unit = unitsList.find((u) => u.id === Number(id));
    if (unit) return unit.unit;
    return "Not found";
  };

  const convertToViewList = (itemList) => {
    return itemList.map((item) => {
      return {
        date: item.date,
        location: item.location,
        remarks: item.remarks,
        quantity: item.quantity,
        material_name: getMaterialNameForId(item.material_name),
        unit: getUnitForId(item.unit),
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (itemList.length > 0) {
      setShowSpinner(true);
      const data = await masApiService.createMaterialLineItems(itemList);
      setItemList([]);
      toast.success(`${data.length} consumption posted successfully`);
      dateInput.current.focus();
      setShowSpinner(false);
    } else {
      toast.warn("Nothing to save.");
    }
  };

  return (
    <div className="container container-sm">
      <div className="d-flex align-items-center">
        <a className="btn btn-primary btn-sm m-2" href="">
          Download Data in CSV
        </a>
        <Link className="btn btn-primary btn-sm m-2" to="view-data">
          View Data
        </Link>
        <SpinnerWhileLoading showSpinnerWhen={showSpinner} />
      </div>
      <form>
        <label className="form-label mt-2 mb-0" htmlFor="date">
          Date of Issue/Consumption
        </label>
        <input
          ref={dateInput}
          value={currentItem.date}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, date: e.currentTarget.value })
          }
          className="form-control"
          name="date"
          type="date"
          required
        />
        <label className="form-label mt-2 mb-0" htmlFor="location">
          Location
        </label>
        <input
          value={currentItem.location}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, location: e.currentTarget.value })
          }
          className="form-control"
          name="location"
          type="text"
          required
        />
        <label className="form-label" mt-2 mb-0 htmlFor="remarks">
          Remarks
        </label>
        <input
          value={currentItem.remarks}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, remarks: e.currentTarget.value })
          }
          className="form-control"
          name="remarks"
          type="text"
          required
        />
        <div className="row">
          <fieldset className="col col-6">
            <legend>Add Item</legend>
            <label className="form-label mt-2 mb-0" htmlFor="material">
              Material Name
            </label>
            <select
              value={currentItem.material_name}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  material_name: e.currentTarget.value,
                })
              }
              name="material"
              className="form-control"
              required
            >
              <option value="">Select material...</option>
              {materialsList.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name}
                </option>
              ))}
            </select>
            <label className="form-label mt-2 mb-0" htmlFor="quantity">
              Quantity
            </label>
            <input
              value={currentItem.quantity}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  quantity: e.currentTarget.value,
                })
              }
              className="form-control"
              name="quantity"
              type="number"
              min="0"
              required
            />
            <label className="form-label mt-2 mb-0" htmlFor="unit">
              Unit
            </label>
            <select
              value={currentItem.unit}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, unit: e.currentTarget.value })
              }
              className="form-control"
              name="unit"
              id="unit"
              required
            >
              <option value="">Select unit...</option>
              {unitsList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.unit}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddItem}
              className="btn btn-primary btn-sm m-2"
              disabled={validate()}
            >
              Add Item
            </button>
            <button onClick={handleSave} className="btn btn-primary btn-sm m-2">
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
                {convertToViewList(itemList).map((item, idx) => (
                  <tr>
                    <td>{item.material_name}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                    <td>
                      <i
                        onClick={() => {
                          itemList.splice(idx, 1);
                          setItemList([...itemList]);
                        }}
                        className="fa fa-times c-pointer"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Home;
