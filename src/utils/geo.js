/**
 * Geographic utility functions for RescueNow
 * Uses the Haversine formula for spherical earth distance calculation
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 */
const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Haversine formula — calculates great-circle distance between two points
 * @param {number} lat1  Origin latitude
 * @param {number} lng1  Origin longitude
 * @param {number} lat2  Destination latitude
 * @param {number} lng2  Destination longitude
 * @returns {number}     Distance in kilometres
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Calculate bearing (direction) from origin to destination
 * @returns {number} Bearing in degrees (0 = North, 90 = East)
 */
export function calculateBearing(lat1, lng1, lat2, lng2) {
  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

/**
 * Get compass direction label from bearing
 */
export function bearingToCompass(bearing) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(bearing / 45) % 8];
}

/**
 * Estimate travel time (rough road-distance approximation)
 * Uses a 1.3x road factor over straight-line distance
 * @param {number} distKm  Straight-line distance in km
 * @param {string} mode    'ambulance' | 'car' | 'bike'
 * @returns {number}       Estimated minutes
 */
export function estimateTravelTime(distKm, mode = 'ambulance') {
  const roadFactor = 1.3;
  const speeds = { ambulance: 60, car: 40, bike: 25 };
  const speed = speeds[mode] || 40;
  const roadDist = distKm * roadFactor;
  return Math.ceil((roadDist / speed) * 60);
}

/**
 * Find all facilities within a given radius sorted by distance
 * @param {number} userLat      User's latitude
 * @param {number} userLng      User's longitude
 * @param {Array}  facilities   Array of facility objects
 * @param {number} radiusKm     Search radius in kilometres (default 25)
 * @param {string} typeFilter   Optional facility type filter
 * @returns {Array}             Facilities with distance, bearing, eta added — sorted nearest first
 */
export function findNearbyFacilities(
  userLat,
  userLng,
  facilities,
  radiusKm = 25,
  typeFilter = null
) {
  return facilities
    .filter((f) => !typeFilter || f.type === typeFilter)
    .map((facility) => {
      const distance = haversineDistance(userLat, userLng, facility.lat, facility.lng);
      const bearing = calculateBearing(userLat, userLng, facility.lat, facility.lng);
      const eta = estimateTravelTime(distance, 'ambulance');
      return { ...facility, distance, bearing, compass: bearingToCompass(bearing), eta };
    })
    .filter((f) => f.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Find the single nearest facility of a given type
 */
export function findNearest(userLat, userLng, facilities, typeFilter = null) {
  const nearby = findNearbyFacilities(userLat, userLng, facilities, 25, typeFilter);
  return nearby[0] || null;
}

/**
 * Format distance for display
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Format ETA for display
 */
export function formatETA(minutes) {
  if (minutes < 60) return `~${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `~${h}h ${m}m`;
}