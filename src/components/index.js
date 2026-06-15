import React from 'react';
import { FACILITY_TYPES } from '../data/facilities';

/* ══════════════════════════════════
   LocationDisplay
══════════════════════════════════ */
export function LocationDisplay({ location, usingMock, facilityCount }) {
  const dotClass = location.loading ? 'loading' : location.error ? 'error' : 'active';

  return (
    <div className="location-display">
      <div className={`location-dot ${dotClass}`} aria-hidden="true" />
      <div className="location-info">
        {location.lat ? (
          <>
            <div className="location-coords">
              {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
            </div>
            <div className="location-meta">
              {location.accuracy ? `±${Math.round(location.accuracy)}m · ` : ''}
              {facilityCount} facilities within 25 km
            </div>
          </>
        ) : (
          <div className="location-coords">
            {location.loading ? 'Getting location…' : location.error || 'Location unavailable'}
          </div>
        )}
      </div>
      <span className={`location-badge ${usingMock ? 'mock' : 'live'}`}>
        {usingMock ? 'Demo' : 'Live GPS'}
      </span>
    </div>
  );
}

/* ══════════════════════════════════
   FilterBar
══════════════════════════════════ */
const FILTERS = [
  { key: null,                          label: 'All',      emoji: '📍' },
  { key: FACILITY_TYPES.HOSPITAL,       label: 'Hospital', emoji: '🏥' },
  { key: FACILITY_TYPES.POLICE,         label: 'Police',   emoji: '🚓' },
  { key: FACILITY_TYPES.TRAUMA,         label: 'Trauma',   emoji: '🏨' },
  { key: FACILITY_TYPES.FIRE,           label: 'Fire',     emoji: '🚒' },
];

export function FilterBar({ activeFilter, onChange, counts }) {
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="filter-bar" role="group" aria-label="Filter emergency facilities">
      {FILTERS.map(({ key, label, emoji }) => {
        const count = key === null ? totalCount : (counts[key] || 0);
        const isActive = activeFilter === key;
        return (
          <button
            key={String(key)}
            className={`filter-btn ${isActive ? 'active ' + (key || 'all') : ''}`}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
          >
            {emoji} {label}
            {count > 0 && <span className="filter-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════
   EmergencyModal
══════════════════════════════════ */
const ACCIDENT_TYPES = [
  { id: 'road_accident', label: 'Road Accident', icon: '🚗' },
  { id: 'fire',          label: 'Fire',           icon: '🔥' },
  { id: 'medical',       label: 'Medical',        icon: '💊' },
  { id: 'drowning',      label: 'Drowning',       icon: '🌊' },
  { id: 'fall',          label: 'Fall / Injury',  icon: '🤕' },
  { id: 'other',         label: 'Other',          icon: '🆘' },
];

export function EmergencyModal({
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

  const handleSOSFire = () => {
    /* Determine best contact based on accident type */
    let target = null;
    if (accidentType === 'road_accident' || accidentType === 'fall') {
      target = nearestTrauma || nearestHospital || nearestPolice;
    } else if (accidentType === 'fire') {
      handleCall('101');
      return;
    } else if (accidentType === 'medical') {
      target = nearestHospital;
    } else {
      target = nearestPolice;
    }

    if (target) {
      handleCall(target.emergency || target.phone || '112');
    } else {
      handleCall('112');
    }
  };

  /* Build sorted emergency contact list */
  const contacts = [];
  if (nearestHospital) contacts.push({ label: 'Nearest Hospital', facility: nearestHospital, color: 'primary' });
  if (nearestPolice)   contacts.push({ label: 'Nearest Police',   facility: nearestPolice,   color: 'secondary' });
  if (nearestTrauma)   contacts.push({ label: 'Trauma Centre',    facility: nearestTrauma,   color: 'secondary' });

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet" role="dialog" aria-modal="true" aria-label="Emergency Response">
        <div className="modal-handle" aria-hidden="true" />
        <div className="modal-header">
          <h2 className="modal-title">🚨 Emergency Alert</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {/* Accident type selector */}
          <div>
            <p className="section-label">What happened?</p>
            <div className="accident-types">
              {ACCIDENT_TYPES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  className={`accident-type-btn ${accidentType === id ? 'selected' : ''}`}
                  onClick={() => onAccidentTypeChange(id)}
                >
                  <span className="at-icon">{icon}</span>
                  <span className="at-label">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Your location */}
          {location.lat && (
            <div>
              <p className="section-label">Your Location</p>
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '0.5px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                }}
              >
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                {location.accuracy && ` ±${Math.round(location.accuracy)}m`}
              </div>
            </div>
          )}

          {/* Emergency contacts */}
          {contacts.length > 0 && (
            <div>
              <p className="section-label">Nearest Services</p>
              <div className="emergency-contacts">
                {contacts.map(({ label, facility, color }) => (
                  <div key={facility.id} className="emergency-contact-row">
                    <div className="ec-info">
                      <div className="ec-name">{facility.shortName || facility.name}</div>
                      <div className="ec-detail">
                        {facility.distance?.toFixed(1)} km · ~{facility.eta} min · {facility.compass}
                      </div>
                    </div>
                    <button
                      className={`ec-call-btn ${color}`}
                      onClick={() => handleCall(facility.emergency || facility.phone)}
                    >
                      📞 {facility.emergency || facility.phone}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOS fire button */}
          <button className="sos-fire-btn" onClick={handleSOSFire}>
            🆘 Call Nearest Station Now
          </button>

          {/* National helplines */}
          <div>
            <p className="section-label">National Helplines</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Police',     number: '100' },
                { label: 'Fire',       number: '101' },
                { label: 'Ambulance',  number: '108' },
                { label: 'Emergency',  number: '112' },
              ].map(({ label, number }) => (
                <button
                  key={number}
                  onClick={() => handleCall(number)}
                  style={{
                    padding: '10px',
                    background: 'var(--bg-card)',
                    border: '0.5px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '700', color: 'var(--red-light)' }}>{number}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   InstallPrompt
══════════════════════════════════ */
export function InstallPrompt({ prompt, onDismiss }) {
  const handleInstall = async () => {
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') onDismiss();
  };

  return (
    <div className="install-banner" role="complementary">
      <div className="install-icon">📲</div>
      <div className="install-text">
        <div className="install-title">Install RescueNow</div>
        <div className="install-desc">Works offline, faster access in emergencies</div>
      </div>
      <div className="install-actions">
        <button className="install-btn accept" onClick={handleInstall}>Install</button>
        <button className="install-btn dismiss" onClick={onDismiss}>Later</button>
      </div>
    </div>
  );
}