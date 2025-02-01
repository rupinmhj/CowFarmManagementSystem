import React, { useState, useEffect } from "react";
import "./MilkRecords.css";

const MilkRecords = () => {
  const initialFormState = {
    milking_date: "",
    cow: "",
    morning_milk_quantity: "",
    afternoon_milk_quantity: "",
    evening_milk_quantity: "",
  };

  const fetchMonthlySummary = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/monthly-milk-yield/"
      );
      if (response.ok) {
        const data = await response.json();
        setMonthlySummary(data);
      } else {
        setSummaryError("Failed to fetch monthly summary.");
      }
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
      setSummaryError("An error occurred while fetching monthly summary.");
    }
  };
  const [monthlySummary, setMonthlySummary] = useState([]); //added
  const [summaryError, setSummaryError] = useState(""); //added
  const [milkData, setMilkData] = useState(initialFormState);
  const [milkRecords, setMilkRecords] = useState([]);
  const [cowOptions, setCowOptions] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the record being edited
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
      const recordsPerPage = 5;

   


  useEffect(() => {
    fetchMilkRecords();
    fetchCowOptions();
    fetchMonthlySummary();
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
    setMilkData({
      ...milkData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate milking date
    const today = new Date().toISOString().split("T")[0];
    if (milkData.milking_date > today) {
      setError("Milking date cannot be in the future");
      return;
    }
    setLoading(true);
    try {
      const url = editingId
        ? `http://localhost:8000/api/milk-records/${editingId}/`
        : "http://localhost:8000/api/milk-records/";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(milkData),
      });

      if (response.ok) {
        alert(editingId ? "Milk Record Updated!" : "Milk Record Saved!");
        setMilkData(initialFormState);
        setEditingId(null);
        fetchMilkRecords();
      } else {
        alert("Failed to save milk record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while saving the milk record.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMilkRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/milk-records/");
      if (response.ok) {
        const data = await response.json();
        setMilkRecords(data);
      } else {
        setError("Failed to fetch milk records.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the milk records.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setMilkData(record);
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/milk-records/${id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Milk record deleted successfully!");
        fetchMilkRecords();
      } else {
        alert("Failed to delete milk record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while deleting the milk record.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = milkRecords.filter((record) =>
    record.cow
      ? record.cow.toString().toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.length > 0
    ? filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div id="milkRecords" className="milkrecords">
      <div className="record-milk">
        {/* <h2>Milk Records</h2> */}
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}

        <form onSubmit={handleSubmit}>
          <div className="milk-records">
            <label className="label">
              Milking Date: *
              <input
                className="area"
                type="date"
                name="milking_date"
                value={milkData.milking_date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Cow ID:
              <select
  className="area"
  name="cow"
  value={milkData.cow}
  onChange={handleChange}
  required
>
  <option value="">Select Cow</option>
  {cowOptions.map((cow) => (
    <option key={cow.id} value={cow.id}>
      {cow.id} {/* Show cow name if available, fallback to ID */}
    </option>
  ))}
</select>
            </label>

            <label className="label">
              Morning Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="morning_milk_quantity"
                value={milkData.morning_milk_quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Afternoon Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="afternoon_milk_quantity"
                value={milkData.afternoon_milk_quantity}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Evening Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="evening_milk_quantity"
                value={milkData.evening_milk_quantity}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              Save Milk Record
            </button>
          </div>
        </form>
      </div>

      <div className="milk-second">
        <div className="record-milk">
          <h2>Milk Records Details</h2>
          {/* <div className="table-container"> */}
          <div className="table-container">
            {/* Add search box */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Cow ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <table className="table" id="milkTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Cow Id</th>
                  <th>Morning Milk (L)</th>
                  <th>Afternoon Milk (L)</th>
                  <th>Evening Milk (L)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {currentRecords.length > 0 ? (
                  currentRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.milking_date}</td>
                      {/* <td>{record.cow}</td> */}
                      <td>{record.cow}</td>
                      <td>{record.morning_milk_quantity}</td>
                      <td>{record.afternoon_milk_quantity}</td>
                      <td>{record.evening_milk_quantity}</td>
                      

                      <td >
                        <button
                          className="editButton milk-editButton"  
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="deleteButton milk-deleteButton"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No milk records available.</td>
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
        {/* </div> */}
        <div className="record-milk-summary">
          <h2>Monthly Milk Yield Summary</h2>
          {summaryError && <div className="error-message">{summaryError}</div>}
          <div className="table-container table">
            <table className="table" id="monthlySummaryTable">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Morning Milk (L)</th>
                  <th>Total Afternoon Milk (L)</th>
                  <th>Total Evening Milk (L)</th>
                  <th>Total Daily Milk (L)</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.length > 0 ? (
                  monthlySummary.map((summary) => (
                    <tr key={summary.month}>
                      <td>
                        {new Date(summary.month).toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td>{summary.total_morning_milk}</td>
                      <td>{summary.total_afternoon_milk}</td>
                      <td>{summary.total_evening_milk}</td>
                      <td>{summary.total_daily_milk}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No monthly summary available.</td>
                  </tr>
                )}
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default MilkRecords;
