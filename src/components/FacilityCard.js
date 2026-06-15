import React from 'react';
import { formatDistance, formatETA } from '../utils/geo';
import { FACILITY_TYPES } from '../data/facilities';

const TYPE_LABELS = {
  [FACILITY_TYPES.HOSPITAL]: '🏥 Hospital',
  [FACILITY_TYPES.POLICE]:   '🚓 Police',
  [FACILITY_TYPES.TRAUMA]:   '🏨 Trauma',
  [FACILITY_TYPES.FIRE]:     '🚒 Fire',
};

export default function FacilityCard({ facility, onCall, onNavigate }) {
  const { name, address, type, distance, eta, compass, rating, beds, trauma, icu, open24x7 } = facility;

  return (
    <div className="facility-card">
      <div className="fc-header">
        <div className="fc-title-group">
          <div className="fc-name">{name}</div>
          {address && <div className="fc-address">{address}</div>}
        </div>
        <span className={`fc-badge ${type}`}>{TYPE_LABELS[type]}</span>
      </div>

      <div className="fc-stats">
        <div className="fc-stat">
          <span className="fc-stat-label">Distance</span>
          <span className="fc-stat-value highlight">{formatDistance(distance)}</span>
        </div>
        <div className="fc-stat">
          <span className="fc-stat-label">ETA</span>
          <span className="fc-stat-value">{formatETA(eta)}</span>
        </div>
        <div className="fc-stat">
          <span className="fc-stat-label">Direction</span>
          <span className="fc-stat-value">{compass}</span>
        </div>
        {rating && (
          <div className="fc-stat">
            <span className="fc-stat-label">Rating</span>
            <span className="fc-stat-value">⭐ {rating}</span>
          </div>
        )}
      </div>

      <div className="fc-tags">
        {open24x7 && <span className="fc-tag yes">24×7</span>}
        {trauma    && <span className="fc-tag yes">Trauma</span>}
        {icu       && <span className="fc-tag yes">ICU</span>}
        {beds      && <span className="fc-tag">{beds} beds</span>}
      </div>

      <div className="fc-actions">
        <button className="fc-action-btn call" onClick={onCall}>
          📞 Call Now
        </button>
        <button className="fc-action-btn navigate" onClick={onNavigate}>
          🗺 Navigate
        </button>
      </div>
    </div>
  );
}