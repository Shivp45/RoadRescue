import React from 'react';

const ACCIDENT_TYPES = [
  { id: 'road_accident', label: 'Road Accident', icon: '🚗' },
  { id: 'fire', label: 'Fire', icon: '🔥' },
  { id: 'medical', label: 'Medical', icon: '💊' },
  { id: 'drowning', label: 'Drowning', icon: '🌊' },
  { id: 'fall', label: 'Fall / Injury', icon: '🤕' },
  { id: 'other', label: 'Other', icon: '🆘' },
];

export default function EmergencyModal({
  location,
  nearestHospital,
  nearestPolice,
  nearestTrauma,
  accidentType,
  onAccidentTypeChange,
  onClose,
}) {
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div className="modal-header">
          <h2 className="modal-title">🚨 Emergency Alert</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div>
            <p className="section-label">What happened?</p>

            <div className="accident-types">
              {ACCIDENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  className={`accident-type-btn ${
                    accidentType === type.id ? 'selected' : ''
                  }`}
                  onClick={() => onAccidentTypeChange(type.id)}
                >
                  <span className="at-icon">{type.icon}</span>
                  <span className="at-label">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="sos-fire-btn"
            onClick={() =>
              handleCall(
                nearestHospital?.emergency ||
                  nearestPolice?.emergency ||
                  '112'
              )
            }
          >
            🆘 Call Nearest Station Now
          </button>
        </div>
      </div>
    </div>
  );
}