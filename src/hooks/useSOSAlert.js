import { useState, useCallback } from 'react';

const SOS_COUNTDOWN = 3; /* seconds before SOS fires */

export function useSOSAlert() {
  const [sosState, setSosState] = useState({
    active: false,
    countdown: SOS_COUNTDOWN,
    sent: false,
    sending: false,
    error: null,
    alertId: null,
    timestamp: null,
  });

  const [countdownTimer, setCountdownTimer] = useState(null);

  /* Trigger vibration patterns for SOS */
  const vibrateSOS = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200, 100, 600, 100, 600, 100, 600, 100, 200, 100, 200, 100, 200]);
    }
  }, []);

  /* Initiate SOS countdown */
  const initiateSOS = useCallback(() => {
    if (sosState.active) return;

    setSosState((prev) => ({
      ...prev,
      active: true,
      countdown: SOS_COUNTDOWN,
      sent: false,
      error: null,
    }));

    /* Start countdown */
    let remaining = SOS_COUNTDOWN;
    const timer = setInterval(() => {
      remaining -= 1;
      setSosState((prev) => ({ ...prev, countdown: remaining }));

      if (remaining <= 0) {
        clearInterval(timer);
        setSosState((prev) => ({ ...prev, active: false, sending: true }));
        /* Fire the actual alert */
      }
    }, 1000);

    setCountdownTimer(timer);
    vibrateSOS();
  }, [sosState.active, vibrateSOS]);

  /* Cancel SOS during countdown */
  const cancelSOS = useCallback(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }
    setSosState({
      active: false,
      countdown: SOS_COUNTDOWN,
      sent: false,
      sending: false,
      error: null,
      alertId: null,
      timestamp: null,
    });
    if ('vibrate' in navigator) navigator.vibrate(0);
  }, [countdownTimer]);

  /**
   * Send emergency alert with user location
   * In production: POST to backend. For now simulates the call.
   */
  const sendAlert = useCallback(async (location, nearestFacility, accidentType) => {
    setSosState((prev) => ({ ...prev, sending: true }));

    try {
      const alertPayload = {
        id: `SOS-${Date.now()}`,
        timestamp: new Date().toISOString(),
        location: {
          lat: location.lat,
          lng: location.lng,
          accuracy: location.accuracy,
        },
        nearestFacility,
        accidentType: accidentType || 'Unknown',
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      };

      /* In production: call your backend API */
      /* await fetch('/api/emergency/alert', { method: 'POST', body: JSON.stringify(alertPayload) }) */

      /* Simulate network call */
      await new Promise((res) => setTimeout(res, 1200));

      /* Open emergency call */
      if (nearestFacility?.emergency) {
        window.location.href = `tel:${nearestFacility.emergency}`;
      } else {
        window.location.href = 'tel:112';
      }

      setSosState((prev) => ({
        ...prev,
        sending: false,
        sent: true,
        alertId: alertPayload.id,
        timestamp: alertPayload.timestamp,
      }));

      /* Store in local history */
      const history = JSON.parse(localStorage.getItem('sos_history') || '[]');
      history.unshift(alertPayload);
      localStorage.setItem('sos_history', JSON.stringify(history.slice(0, 10)));

      return alertPayload;
    } catch (err) {
      setSosState((prev) => ({
        ...prev,
        sending: false,
        error: 'Failed to send alert. Calling emergency directly...',
      }));
      window.location.href = 'tel:112';
      throw err;
    }
  }, []);

  const resetSOS = useCallback(() => {
    setSosState({
      active: false,
      countdown: SOS_COUNTDOWN,
      sent: false,
      sending: false,
      error: null,
      alertId: null,
      timestamp: null,
    });
  }, []);

  return { sosState, initiateSOS, cancelSOS, sendAlert, resetSOS };
}