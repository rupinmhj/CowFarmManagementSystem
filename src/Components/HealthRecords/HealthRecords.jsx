import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HealthRecords.css";

const HealthRecords = () => {
  const initialFormState = {
    cow: "",
    health_condtion: "", // Match backend field name
    diagnosed_illness: "",
    vaccination_history: "",
    veterinary_visits: "",
    symptoms: "",
    recovery_status: "",
    treatment_cost: "",
  };

  const [healthData, setHealthData] = useState(initialFormState);
  const [healthRecords, setHealthRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId
        ? `http://127.0.0.1:8000/api/health-records/${editingId}/`
        : "http://127.0.0.1:8000/api/health-records/";
      const method = editingId ? "PUT" : "POST";

      const response = await axios({
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        data: healthData,
      });

      if (response.status === 200 || response.status === 201) {
        alert(editingId ? "Health Record Updated!" : "Health Record Saved!");
        setHealthData(initialFormState);
        setEditingId(null);
        fetchHealthRecords();
      } else {
        alert("Failed to save health record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while saving the health record.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/health-records/");
      const records = response.data.map((record) => ({
        ...record,
        cow: record.cow.name || record.cow, // Adjust cow field display
      }));
      setHealthRecords(records);
    } catch (error) {
      console.error("Error fetching health records:", error);
      setError("An error occurred while fetching the health records.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setHealthData(record);
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/health-records/${id}/`);
      if (response.status === 204) {
        alert("Health record deleted successfully!");
        fetchHealthRecords();
      } else {
        alert("Failed to delete health record.");
      }
    } catch (error) {
      console.error("Error deleting health record:", error);
      setError("An error occurred while deleting the health record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="healthRecords" className="healthrecords">
      <div className="record-health">
        <h2>Health Records</h2>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}

        <form onSubmit={handleSubmit}>
          <div className="health-records">
            <label className="label">
              Cow ID: *
              <input
                className="area"
                type="text"
                name="cow"
                value={healthData.cow}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Health Condition: *
              <select
                className="area"
                name="health_condtion"
                value={healthData.health_condtion}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
                <option value="undertreatment">Under Treatment</option>
              </select>
            </label>

            <label className="label">
              Diagnosed Illness:
              <textarea
                className="area"
                name="diagnosed_illness"
                value={healthData.diagnosed_illness}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Vaccination History:
              <textarea
                className="area"
                name="vaccination_history"
                value={healthData.vaccination_history}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Veterinary Visits:
              <textarea
                className="area"
                name="veterinary_visits"
                value={healthData.veterinary_visits}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Symptoms:
              <textarea
                className="area"
                name="symptoms"
                value={healthData.symptoms}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Recovery Status: *
              <select
                className="area"
                name="recovery_status"
                value={healthData.recovery_status}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="improving">Improving</option>
                <option value="stable">Stable</option>
                <option value="worsening">Worsening</option>
              </select>
            </label>

            <label className="label">
              Treatment Cost:
              <input
                className="area"
                type="number"
                name="treatment_cost"
                value={healthData.treatment_cost}
                onChange={handleChange}
              />
            </label>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : editingId ? "Update Record" : "Save Record"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="record-health">
        <h2>Health Records Details</h2>
        <div className="health-table-container">
          <table id="healthTable">
            <thead>
              <tr>
                <th>Cow</th>
                <th>Health Condition</th>
                <th>Diagnosed Illness</th>
                <th>Vaccination History</th>
                <th>Veterinary Visits</th>
                <th>Symptoms</th>
                <th>Recovery Status</th>
                <th>Treatment Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {healthRecords.length > 0 ? (
                healthRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.cow}</td>
                    <td>{record.health_condtion}</td>
                    <td>{record.diagnosed_illness}</td>
                    <td>{record.vaccination_history}</td>
                    <td>{record.veterinary_visits}</td>
                    <td>{record.symptoms}</td>
                    <td>{record.recovery_status}</td>
                    <td>{record.treatment_cost}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(record)}>Edit</button>
                      <button className="deleteButton" onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No health records available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
