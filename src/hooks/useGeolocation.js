import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

/**
 * useGeolocation — real-time GPS tracking hook
 */
export function useGeolocation() {

    console.log("HOOK RUNNING");

  const [state, setState] = useState({
    lat: null,
    lng: null,
    accuracy: null,
    altitude: null,
    speed: null,
    heading: null,
    timestamp: null,
    loading: true,
    error: null,
    permissionStatus: 'pending', // 'pending' | 'granted' | 'denied' | 'unavailable'
  });

  const watchIdRef = useRef(null);

  const onSuccess = useCallback((pos) => {

    console.log("LOCATION SUCCESS", pos);
    
    setState({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
      altitude: pos.coords.altitude,
      speed: pos.coords.speed,
      heading: pos.coords.heading,
      timestamp: pos.timestamp,
      loading: false,
      error: null,
      permissionStatus: 'granted',
    });
  }, []);

  const onError = useCallback((err) => {

    console.log("LOCATION ERROR", err);

    let permissionStatus = 'denied';
    let errorMessage = err.message;

    if (err.code === 1) {
      permissionStatus = 'denied';
      errorMessage = 'Location access denied. Please enable GPS in your browser settings.';
    } else if (err.code === 2) {
      permissionStatus = 'unavailable';
      errorMessage = 'Location unavailable. Check your device GPS.';
    } else if (err.code === 3) {
      errorMessage = 'Location timed out. Retrying...';
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      error: errorMessage,
      permissionStatus,
    }));
  }, []);

  const startTracking = useCallback(() => {

    console.log("START TRACKING CALLED");

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser.',
        permissionStatus: 'unavailable',
      }));
      return;
    }

    /* Get immediate position */
    navigator.geolocation.getCurrentPosition(onSuccess, onError, DEFAULT_OPTIONS);

    /* Set up continuous watch */
    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      DEFAULT_OPTIONS
    );
  }, [onSuccess, onError]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        ...DEFAULT_OPTIONS,
        maximumAge: 0,
      });
    }
  }, [onSuccess, onError]);

  useEffect(() => {
    console.log("START TRACKING CALLED");
    startTracking();
    return () => stopTracking();
  }, [startTracking, stopTracking]);

  return { ...state, refresh, stopTracking, startTracking };
}

/**
 * useMockLocation — for demo/testing when GPS unavailable
 * Defaults to IITM Chennai area
 */
export function useMockLocation(initialLat = 12.9916, initialLng = 80.2337) {
  const [location, setLocation] = useState({
    lat: initialLat,
    lng: initialLng,
    accuracy: 10,
    loading: false,
    error: null,
    permissionStatus: 'granted',
    isMock: true,
  });

  const updateLocation = useCallback((lat, lng) => {
    setLocation((prev) => ({ ...prev, lat, lng }));
  }, []);

  return { ...location, updateLocation };
}