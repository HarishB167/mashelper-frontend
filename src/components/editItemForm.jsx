import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import masApiService from "./services/mashelperBackendService";
import SpinnerWhileLoading from "./common/spinnerWhileLoading";

const schema = {
  id: Joi.optional(),
  date: Joi.string().required().label("Date"),
  location: Joi.string().required().label("Location"),
  remarks: Joi.string().required().label("Remarks"),
  material_name: Joi.number().required().label("Material Name"),
  quantity: Joi.number().required().min(0.01).label("Quantity"),
  unit: Joi.number().required().label("Unit"),
};

function EditItemForm(props) {
  const itemId = props.match.params.id;
  const [unitsList, setUnitsList] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    date: "",
    location: "",
    remarks: "",
    material_name: "",
    quantity: "",
    unit: "",
  });

  const getMaterialIdForName = (list, name) => {
    const material = list.find((mat) => mat.name === name);
    if (material) return material.id;
    return "Not found";
  };

  const getUnitIdForUnit = (list, unitName) => {
    const unit = list.find((u) => u.unit === unitName);
    if (unit) return unit.id;
    return "Not found";
  };

  useEffect(() => {
    async function loadSelectListData() {
      const unitsList = await masApiService.getUnitsList();
      const materialsList = await masApiService.getMaterialsList();
      const material = await masApiService.getMaterialLineItem(itemId);
      material.material_name = getMaterialIdForName(
        materialsList,
        material.material_name
      );
      material.unit = getUnitIdForUnit(unitsList, material.unit);
      setUnitsList(unitsList);
      setMaterialsList(materialsList);
      setCurrentItem(material);
    }
    loadSelectListData();
  }, []);

  const validate = () => {
    const result = Joi.validate(currentItem, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (validate()) {
      toast.error(JSON.stringify(validate()));
      return false;
    }
    await masApiService.updateMaterialLineItem(itemId, currentItem);
    setCurrentItem({
      date: "",
      location: "",
      remarks: "",
      material_name: "",
      quantity: "",
      unit: "",
    });
    props.history.replace("/view-data");
  };

  return (
    <form className="container conatiner-sm">
      <SpinnerWhileLoading
        className="d-flex flex-column align-items-center"
        showSpinnerWhen={materialsList.length === 0}
      >
        <label className="form-label mt-2 mb-0" htmlFor="date">
          Date of Issue/Consumption
        </label>
        <input
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
              onClick={handleSave}
              disabled={validate()}
              className="btn btn-primary btn-sm m-2"
            >
              Save
            </button>
          </fieldset>
        </div>
      </SpinnerWhileLoading>
    </form>
  );
}

export default EditItemForm;
