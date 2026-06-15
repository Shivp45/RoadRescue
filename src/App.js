import React, { useState, useEffect, useMemo } from 'react';
import { useGeolocation, useMockLocation } from './hooks/useGeolocation';
import { findNearbyFacilities, findNearest } from './utils/geo';
import { FACILITIES, FACILITY_TYPES, EMERGENCY_NUMBERS } from './data/facilities';
import SOSButton from './components/SOSButton';
import FacilityCard from './components/FacilityCard';
import LocationDisplay from './components/LocationDisplay';
import EmergencyModal from './components/EmergencyModal';
import InstallPrompt from './components/InstallPrompt';
import './App.css';
import { FACILITY_TYPES, EMERGENCY_NUMBERS } from './data/facilities';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';



const RADIUS_KM = 25;

export default function App() {

  useEffect(() => {
    async function loadFacilities() {
      try {
        const snapshot = await getDocs(
          collection(db, "facilities")
        );

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Facilities loaded:", data);

        setFacilities(data);
      } catch (err) {
        console.error("Failed loading facilities:", err);
      } finally {
        setLoadingFacilities(false);
      }
    }

    loadFacilities();
  }, []);

  console.log("APP RENDERED");
  
  const gps = useGeolocation();
  const mock = useMockLocation(12.9916, 80.2337); /* IITM as default demo */

  /* Use real GPS if available, else mock for demo */
  const location = gps.permissionStatus === 'granted' && gps.lat ? gps : mock;

  const [facilities, setFacilities] = useState([]);
  const [loadingFacilities, setLoadingFacilities] = useState(true);

  console.log("GPS:", gps);
  console.log("Using:", location);

  const [activeFilter, setActiveFilter] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [accidentType, setAccidentType] = useState('road_accident');

  /* Check for URL params (PWA shortcuts) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'sos') setShowEmergencyModal(true);
    if (params.get('filter')) setActiveFilter(params.get('filter'));
  }, []);

  /* Capture PWA install prompt */
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  /* Compute nearby facilities */
  const nearbyFacilities = useMemo(() => {
    if (!location.lat || !location.lng) return [];
    return findNearbyFacilities(
  location.lat,
  location.lng,
  facilities,
  RADIUS_KM,
  activeFilter
);
  }, [location.lat, location.lng, activeFilter]);

  /* Find single nearest of each type for quick access */
  const nearestHospital = useMemo(() => {
    if (!location.lat) return null;
    return findNearest(
  location.lat,
  location.lng,
  facilities,
  FACILITY_TYPES.HOSPITAL
);
  }, [location.lat, location.lng]);

  const nearestPolice = useMemo(() => {
    if (!location.lat) return null;
    return findNearest(
  location.lat,
  location.lng,
  facilities,
  FACILITY_TYPES.HOSPITAL
);
  }, [location.lat, location.lng]);

  const nearestTrauma = useMemo(() => {
    if (!location.lat) return null;
    return findNearest(
  location.lat,
  location.lng,
  facilities,
  FACILITY_TYPES.HOSPITAL
);

  }, [location.lat, location.lng]);

  const handleSOSTrigger = () => {
    setShowEmergencyModal(true);
  };

  const handleFacilityCall = (facility) => {
    const number = facility.emergency || facility.phone;
    if (number) window.location.href = `tel:${number}`;
  };

  const handleNavigate = (facility) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}&travelmode=driving`;
    window.open(mapsUrl, '_blank');
  };

  const counts = {
    hospital: nearbyFacilities.filter(f => f.type === FACILITY_TYPES.HOSPITAL).length,
    police: nearbyFacilities.filter(f => f.type === FACILITY_TYPES.POLICE).length,
    trauma: nearbyFacilities.filter(f => f.type === FACILITY_TYPES.TRAUMA).length,
    fire: nearbyFacilities.filter(f => f.type === FACILITY_TYPES.FIRE).length,
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h1 className="brand-name">RescueNow</h1>
            <p className="brand-tagline">Emergency Response</p>
          </div>
        </div>

        {/* Quick emergency numbers */}
        <div className="quick-calls">
          <a href={`tel:${EMERGENCY_NUMBERS.AMBULANCE}`} className="quick-call ambulance">
            <span className="qc-number">{EMERGENCY_NUMBERS.AMBULANCE}</span>
            <span className="qc-label">Ambulance</span>
          </a>
          <a href={`tel:${EMERGENCY_NUMBERS.POLICE}`} className="quick-call police">
            <span className="qc-number">{EMERGENCY_NUMBERS.POLICE}</span>
            <span className="qc-label">Police</span>
          </a>
          <a href={`tel:${EMERGENCY_NUMBERS.DISASTER}`} className="quick-call disaster">
            <span className="qc-number">{EMERGENCY_NUMBERS.DISASTER}</span>
            <span className="qc-label">Helpline</span>
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        {/* Location display */}
              {loadingFacilities && (
        <div className="empty-state">
          <p>Loading emergency facilities...</p>
        </div>
      )}
        <LocationDisplay
          location={location}
          usingMock={location.isMock}
          facilityCount={nearbyFacilities.length}
        />

        {/* SOS Button — central action */}
        <SOSButton
          onTrigger={handleSOSTrigger}
          nearestFacility={nearestHospital || nearestPolice}
        />

        {/* Quick nearest cards */}
        {location.lat && (
          <section className="quick-nearest">
            <h2 className="section-title">Nearest Emergency Services</h2>
            <div className="nearest-grid">
              {nearestHospital && (
                <div className="nearest-card hospital" onClick={() => handleFacilityCall(nearestHospital)}>
                  <div className="nc-icon">🏥</div>
                  <div className="nc-info">
                    <span className="nc-type">Hospital</span>
                    <span className="nc-name">{nearestHospital.shortName}</span>
                    <span className="nc-dist">{nearestHospital.distance.toFixed(1)} km · ~{nearestHospital.eta} min</span>
                  </div>
                  <div className="nc-call">Call</div>
                </div>
              )}
              {nearestPolice && (
                <div className="nearest-card police" onClick={() => handleFacilityCall(nearestPolice)}>
                  <div className="nc-icon">🚓</div>
                  <div className="nc-info">
                    <span className="nc-type">Police</span>
                    <span className="nc-name">{nearestPolice.shortName}</span>
                    <span className="nc-dist">{nearestPolice.distance.toFixed(1)} km · ~{nearestPolice.eta} min</span>
                  </div>
                  <div className="nc-call">Call</div>
                </div>
              )}
              {nearestTrauma && (
                <div className="nearest-card trauma" onClick={() => handleFacilityCall(nearestTrauma)}>
                  <div className="nc-icon">🏨</div>
                  <div className="nc-info">
                    <span className="nc-type">Trauma Centre</span>
                    <span className="nc-name">{nearestTrauma.shortName}</span>
                    <span className="nc-dist">{nearestTrauma.distance.toFixed(1)} km · ~{nearestTrauma.eta} min</span>
                  </div>
                  <div className="nc-call">Call</div>
                </div>
              )}
            </div>
          </section>
        )}

        


        {/* Facilities list */}
        <section className="facilities-section">
          {nearbyFacilities.length === 0 && location.lat ? (
            <div className="empty-state">
              <div className="empty-icon">📍</div>
              <p>No {activeFilter || 'emergency'} facilities found within {RADIUS_KM} km of your location.</p>
              <p className="empty-sub">Data covers: Mumbai, Chennai, Delhi, Bengaluru, Hyderabad</p>
            </div>
          ) : !location.lat ? (
            <div className="empty-state">
              <div className="empty-icon">📡</div>
              <p>Getting your location...</p>
            </div>
          ) : (
            nearbyFacilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onCall={() => handleFacilityCall(facility)}
                onNavigate={() => handleNavigate(facility)}
                onSelect={() => setSelectedFacility(facility)}
              />
            ))
          )}
        </section>

        {/* Info footer */}
        <footer className="app-footer">
          <p>Data covers {RADIUS_KM} km radius · IITM Hackathon 2026 PS3</p>
          <p>In life-threatening emergencies always call <strong>112</strong></p>
        </footer>
      </main>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <EmergencyModal
          location={location}
          nearestHospital={nearestHospital}
          nearestPolice={nearestPolice}
          nearestTrauma={nearestTrauma}
          accidentType={accidentType}
          onAccidentTypeChange={setAccidentType}
          onClose={() => setShowEmergencyModal(false)}
        />
      )}

      {/* PWA Install Prompt */}
      {installPrompt && (
        <InstallPrompt
          prompt={installPrompt}
          onDismiss={() => setInstallPrompt(null)}
        />
      )}
    </div>
  );
}
