import React, { useState } from "react";
import Joi from "joi-browser";
import mashelperBackendService from "./services/mashelperBackendService";
import { toast } from "react-toastify";
import SpinnerWhileLoading from "./common/spinnerWhileLoading";

const datePattern = new RegExp("^[0-9]{4}-(1[0-2]|[0-9]{2})-[0-9]{2}$");

const schema = {
  from: Joi.string().regex(datePattern).required(),
  to: Joi.string().regex(datePattern).required(),
};

function CSVDataDownloadForm(props) {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [downloadedData, setDownloadedData] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const validate = () => {
    const result = Joi.validate(dateRange, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloadedData(null);
    setShowSpinner(true);
    try {
      const data = await mashelperBackendService.downloadCSVData(
        dateRange.from,
        dateRange.to
      );
      setDownloadedData(new Blob([data], { type: "text/csv" }));
      console.log("data :>> ", data);
      setShowSpinner(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
    setShowSpinner(false);
  };

  return (
    <div className="container container_center">
      <form className="d-flex flex-column h-75 align-items-center justify-content-center">
        <div className="input-group mb-3 row">
          <label className="align-middle col-3" htmlFor="from-date">
            From
          </label>
          <input
            name="from-date"
            className="form-control col"
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, from: e.currentTarget.value })
            }
            value={dateRange.from}
          />
        </div>
        <div className="input-group mb-3 row">
          <label className="align-middle col-3" htmlFor="to-date">
            To
          </label>
          <input
            name="to-date"
            className="form-control m col"
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, to: e.currentTarget.value })
            }
            value={dateRange.to}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary mb-3"
          disabled={validate()}
        >
          Fetch data
        </button>
        {downloadedData && (
          <a
            href={URL.createObjectURL(downloadedData)}
            className="btn btn-primary"
            download={`material_line_items_${dateRange.from}_${dateRange.to}.csv`}
          >
            Download
          </a>
        )}
        <SpinnerWhileLoading showSpinnerWhen={showSpinner} />
      </form>
    </div>
  );
}

export default CSVDataDownloadForm;
