import React, { useState, useEffect } from 'react';
import './HealthRecords.css';
import api from '../../api'; // Assuming you have a common API service like in AnimalRecords

const HealthRecords = () => {
  const initialFormState = {
    cow: '',
    health_condition: '',
    diagnosed_illness: '',
    vaccination_history: '',
    veterinary_visits: '',
    symptoms: '',
    recovery_status: '',
    treatment_cost: '',
  };

  const [healthData, setHealthData] = useState(initialFormState);
  const [healthRecords, setHealthRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!healthData.cow || !healthData.health_condition) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      await api.post('health-records/', healthData);
      alert('Health Record Saved Successfully!');
      setHealthData(initialFormState);
      fetchHealthRecords();
    } catch (error) {
      setError('Failed to save record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get('health-records/');
      setHealthRecords(response.data);
    } catch (error) {
      setError('Failed to fetch health records.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = healthRecords.filter((record) =>
    record.cow?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="health-records-container">
      <div className="health-records-form">
        <h2>Health Records</h2>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}

        <form className="RecordHealth" onSubmit={handleSubmit}>
          <div className="form-fields">
            <label>
              Cow ID: * <br />
              <input
                type="text"
                name="cow"
                value={healthData.cow}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Health Condition: * <br />
              <select
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

            <label>
              Diagnosed Illness: <br />
              <textarea
                name="diagnosed_illness"
                value={healthData.diagnosed_illness}
                onChange={handleChange}
              />
            </label>

            <label>
              Vaccination History: <br />
              <textarea
                name="vaccination_history"
                value={healthData.vaccination_history}
                onChange={handleChange}
              />
            </label>

            <label>
              Veterinary Visits: <br />
              <textarea
                name="veterinary_visits"
                value={healthData.veterinary_visits}
                onChange={handleChange}
              />
            </label>

            <label>
              Symptoms: <br />
              <textarea
                name="symptoms"
                value={healthData.symptoms}
                onChange={handleChange}
              />
            </label>

            <label>
              Recovery Status: <br />
              <select
                name="recovery_status"
                value={healthData.recovery_status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="improving">Improving</option>
                <option value="stable">Stable</option>
                <option value="worsening">Worsening</option>
              </select>
            </label>

            <label>
              Treatment Cost (in Rs): <br />
              <input
                type="number"
                name="treatment_cost"
                value={healthData.treatment_cost}
                onChange={handleChange}
                min="0"
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>

      <div className="show-health-records">
        <h2>Health Details</h2>
        <input
          type="text"
          placeholder="Search health records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Cow ID</th>
              <th>Health Condition</th>
              <th>Diagnosed Illness</th>
              <th>Vaccination History</th>
              <th>Veterinary Visits</th>
              <th>Symptoms</th>
              <th>Recovery Status</th>
              <th>Treatment Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.cow}</td>
                  <td>{record.health_condition}</td>
                  <td>{record.diagnosed_illness || '-'}</td>
                  <td>{record.vaccination_history || '-'}</td>
                  <td>{record.veterinary_visits || '-'}</td>
                  <td>{record.symptoms || '-'}</td>
                  <td>{record.recovery_status || '-'}</td>
                  <td>{record.treatment_cost || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No health records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthRecords;
