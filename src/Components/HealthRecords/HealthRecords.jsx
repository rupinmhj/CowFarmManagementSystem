import React, { useState } from 'react';
import './HealthRecords.css';

const HealthRecords = () => {
  const [healthData, setHealthData] = useState({
    cowId: '',
    cowName: '',
    healthCondition: '',
    diagnosedIllnesses: '',
    treatmentHistory: '',
    vaccinationHistory: '',
    veterinaryVisits: '',
    symptoms: '',
    recoveryStatus: '',
    treatmentCost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Health Record Saved!');
    console.log('Health Data Submitted:', healthData);

    // Reset form data after submission
    setHealthData({
      cowId: '',
      cowName: '',
      healthCondition: '',
      diagnosedIllnesses: '',
      treatmentHistory: '',
      vaccinationHistory: '',
      veterinaryVisits: '',
      symptoms: '',
      recoveryStatus: '',
      treatmentCost: '',
    });
  };

  return (
    <div className="health-records-container">
      <div className="health-records-form">
        <h2>Health Records</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Cow ID:
            <input
              className="input-field"
              type="text"
              name="cowId"
              value={healthData.cowId}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Cow Name:
            <input
              className="input-field"
              type="text"
              name="cowName"
              value={healthData.cowName}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Health Condition:
            <select
              className="input-field"
              name="healthCondition"
              value={healthData.healthCondition}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Under Treatment">Under Treatment</option>
            </select>
          </label>
          <label className="label">
            Diagnosed Illnesses:
            <textarea
              className="input-field"
              name="diagnosedIllnesses"
              value={healthData.diagnosedIllnesses}
              onChange={handleChange}
            ></textarea>
          </label>
          <label className="label">
            Treatment History:
            <textarea
              className="input-field"
              name="treatmentHistory"
              value={healthData.treatmentHistory}
              onChange={handleChange}
            ></textarea>
          </label>
          <label className="label">
            Vaccination History:
            <textarea
              className="input-field"
              name="vaccinationHistory"
              value={healthData.vaccinationHistory}
              onChange={handleChange}
            ></textarea>
          </label>
          <label className="label">
            Veterinary Visits:
            <textarea
              className="input-field"
              name="veterinaryVisits"
              value={healthData.veterinaryVisits}
              onChange={handleChange}
            ></textarea>
          </label>
          <label className="label">
            Symptoms:
            <textarea
              className="input-field"
              name="symptoms"
              value={healthData.symptoms}
              onChange={handleChange}
            ></textarea>
          </label>
          <label className="label">
            Recovery Status:
            <select
              className="input-field"
              name="recoveryStatus"
              value={healthData.recoveryStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Improving">Improving</option>
              <option value="Stable">Stable</option>
              <option value="Worsening">Worsening</option>
            </select>
          </label>
          <label className="label">
            Treatment Cost (in Rs):
            <input
              className="input-field"
              type="number"
              name="treatmentCost"
              value={healthData.treatmentCost}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-button">Save Record</button>
        </form>
      </div>
      <div className="showhealthrecords">
  <h2>Health Details</h2>
  <div className="table-container">
    <input type="text" id="searchInput" placeholder="Search health records..." />

    <table id="healthTable">
      <thead>
        <tr>
          <th>Cow ID</th>
          <th>Cow Name</th>
          <th>Health Condition</th>
          <th>Diagnosed Illnesses</th>
          <th>Treatment History</th>
          <th>Vaccination History</th>
          <th>Veterinary Visits</th>
          <th>Symptoms</th>
          <th>Recovery Status</th>
          <th>Treatment Cost</th>
        </tr>
      </thead>
      <tbody>
        {/* here data will be imported from the database */}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default HealthRecords;
