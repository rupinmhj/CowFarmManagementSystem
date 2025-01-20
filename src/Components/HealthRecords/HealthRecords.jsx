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
      {/* Form Section */}
      <div className="health-records-form">
        <h2>Health Records</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Cow ID', type: 'text', name: 'cowId', required: true },
            { label: 'Cow Name', type: 'text', name: 'cowName' },
            {
              label: 'Health Condition',
              type: 'select',
              name: 'healthCondition',
              options: ['Healthy', 'Sick', 'Under Treatment'],
              required: true,
            },
            { label: 'Diagnosed Illnesses', type: 'textarea', name: 'diagnosedIllnesses' },
            { label: 'Treatment History', type: 'textarea', name: 'treatmentHistory' },
            { label: 'Vaccination History', type: 'textarea', name: 'vaccinationHistory' },
            { label: 'Veterinary Visits', type: 'textarea', name: 'veterinaryVisits' },
            { label: 'Symptoms', type: 'textarea', name: 'symptoms' },
            {
              label: 'Recovery Status',
              type: 'select',
              name: 'recoveryStatus',
              options: ['Improving', 'Stable', 'Worsening'],
            },
            { label: 'Treatment Cost (in Rs)', type: 'number', name: 'treatmentCost' },
          ].map((field, index) => (
            <div key={index} className="form-field">
              <label className="label">{field.label}:</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="input-field"
                  name={field.name}
                  value={healthData[field.name]}
                  onChange={handleChange}
                ></textarea>
              ) : field.type === 'select' ? (
                <select
                  className="input-field"
                  name={field.name}
                  value={healthData[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                >
                  <option value="">Select</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="input-field"
                  type={field.type}
                  name={field.name}
                  value={healthData[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                />
              )}
            </div>
          ))}
          <button type="submit" className="submit-button">
            Save Record
          </button>
        </form>
      </div>

      {/* Display Section */}
      <div className="showhealthrecords">
        <h2>Health Details</h2>
        <div className="table-container">
          <input type="text" id="searchInput" placeholder="Search health records..." />
          <table id="healthTable">
            <thead>
              <tr>
                {[
                  'Cow ID',
                  'Cow Name',
                  'Health Condition',
                  'Diagnosed Illnesses',
                  'Treatment History',
                  'Vaccination History',
                  'Veterinary Visits',
                  'Symptoms',
                  'Recovery Status',
                  'Treatment Cost',
                ].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Health data will be populated here from the database */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
