import React, { useState } from "react";
import "./Analytics.css";


const Analytics = () => {
  const [formData, setFormData] = useState({
    breed: "",
    age: "",
    weight: "",
    pregnancy_status: "false",
    lactation_cycle: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);


  // Add this missing handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      // Train first
      await fetch('http://127.0.0.1:8000/api/train/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
 
      const processedData = {
        breed: formData.breed,
        age: Number(formData.age),
        weight: Number(formData.weight),
        pregnancy_status: formData.pregnancy_status === "true",
        lactation_cycle: formData.lactation_cycle
      };
 
      const predResponse = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData)
      });
 
      const predData = await predResponse.json();
      if (predData.status === "error") {
        throw new Error(predData.message);
      }
      setPrediction(predData);
 
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" analytics">
      <div className="record-animal anlytics-cow">
        <form onSubmit={handleSubmit}>
          <div className="animal-records">
            <label className="label">
              Breed: *
              <input
                className="area"
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </label>


            <label className="label">
              Age (years): *
              <input
                className="area"
                type="number"
                name="age"
                step="0.1"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </label>


            <label className="label">
              Weight (kg): *
              <input
                className="area"
                type="number"
                name="weight"
                step="0.1"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </label>


            <label className="label">
              Pregnancy Status: *
              <select
                className="area"
                name="pregnancy_status"
                value={formData.pregnancy_status}
                onChange={handleChange}
                required
              >
                <option value="false">Not Pregnant</option>
                <option value="true">Pregnant</option>
              </select>
            </label>


            <label className="label">
              Lactation Cycle: *
              <select
                className="area"
                name="lactation_cycle"
                value={formData.lactation_cycle}
                onChange={handleChange}
                required
              >
                <option value="">Select Cycle</option>
                <option value="dry">Dry</option>
                <option value="lactating">Lactating</option>
                <option value="fresh">Fresh</option>
              </select>
            </label>


            <div className="button-group">
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Predict Milk Capacity"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
      {prediction && prediction.status === "success" && (
        <div className="showanimalrecordsanalytics">
          <h2>Prediction Results</h2>
          <div className="table-container table">
            <table>
              <tbody>
                <tr>
                  <td className="bluebox">Estimated Daily Milk Yield</td>
                  <td className="greenbox">{prediction.predicted_milk_yield} liters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
      
    </div>
  );
};


export default Analytics;