import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HealthRecords.css";

const HealthRecords = () => {
  const initialFormState = {
    cow: "",
    health_condition: "",
    diagnosed_illness: "",
    vaccination_history: "",
    veterinary_visits: "",
    symptoms: "",
    recovery_status: "",
    treatment_cost: "",
  };

  const [healthData, setHealthData] = useState(initialFormState);
  const [healthRecords, setHealthRecords] = useState([]);
  const [cowOptions, setCowOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
        const recordsPerPage = 5;

  useEffect(() => {
    fetchHealthRecords();
    fetchCowOptions();
  }, []);

  const fetchCowOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cows/");
      if (response.ok) {
        const data = await response.json();
        setCowOptions(data);
      } else {
        setError("Failed to fetch cow options");
      }
    } catch (error) {
      console.error("Error fetching cow options:", error);
      setError("An error occurred while fetching cow options");
    }
  };

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
      const response = await axios.get(
        "http://127.0.0.1:8000/api/health-records/"
      );
      setHealthRecords(response.data);
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
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/health-records/${id}/`
      );
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
  const filteredRecords = healthRecords.filter((record) => {
    return record.cow.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div id="healthRecords" className="healthrecords">
      <div className="record-health">
        {/* <h2>Health Records</h2> */}
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}

        <form onSubmit={handleSubmit}>
          <div className="health-records">
            <label className="label">
              Cow ID:
              <select
                className="area"
                type="number"
                name="cow"
                value={healthData.cow}
                onChange={handleChange}
                required
              >
                <option value="">Select Cow</option>
                {cowOptions.map((cow) => (
                  <option key={cow.id} value={cow.id}>
                    {cow.id}
                  </option>
                ))}
              </select>
            </label>
          

            <label className="label">
              Health Condition: *
              <select
                className="area"
                type="text"
                name="health_condition"
                value={healthData.health_condition}
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
                type="text"
                name="diagnosed_illness"
                value={healthData.diagnosed_illness}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Vaccination History:
              <textarea
                className="area"
                type="text"
                name="vaccination_history"
                value={healthData.vaccination_history}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Veterinary Visits:
              <textarea
                className="area"
                type="text"
                name="veterinary_visits"
                value={healthData.veterinary_visits}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Symptoms:
              <textarea
                className="area"
                type="text"
                name="symptoms"
                value={healthData.symptoms}
                onChange={handleChange}
              ></textarea>
            </label>

            <label className="label">
              Recovery Status: *
              <select
                className="area"
                type="text"
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
              <button className="submit-button" type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : editingId
                  ? "Update Record"
                  : "Save Record"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="record-health ">
        <h2>Health Records Details</h2>
      
        <div className="table-container health-detail">
        <div className="search-container">
  <input
    type="text"
    placeholder="Search records..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
</div>

          
          <table id="healthTable" className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>CowId</th>
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
              {currentRecords.length > 0 ? (
                currentRecords.map((record) => (
                  <tr key={record.id}>
                    {/* <td>{record.id}</td> */}
                    <td>{record.cow}</td>
                    <td>{record.health_condition}</td>
                    <td>{record.diagnosed_illness}</td>
                    <td>{record.vaccination_history}</td>
                    <td>{record.veterinary_visits}</td>
                    <td>{record.symptoms}</td>
                    <td>{record.recovery_status}</td>
                    <td>{record.treatment_cost}</td>
                    <td>
                      <button
                        className="editButton"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
                      </button>
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
          <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
              {page}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
