import React, { useState, useEffect, useRef } from 'react';

const COUNTDOWN_SECONDS = 3;

export default function SOSButton({ onTrigger, nearestFacility }) {
  const [phase, setPhase] = useState('idle'); /* idle | counting | sent */
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const timerRef = useRef(null);

  const startCountdown = () => {
    if (phase !== 'idle') return;
    setPhase('counting');
    setCountdown(COUNTDOWN_SECONDS);

    /* Vibrate immediately */
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  useEffect(() => {
    if (phase !== 'counting') return;

    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          setPhase('idle');
          if ('vibrate' in navigator) {
            navigator.vibrate([300, 100, 300, 100, 300]);
          }
          onTrigger();
          return COUNTDOWN_SECONDS;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, onTrigger]);

  const cancelCountdown = () => {
    clearInterval(timerRef.current);
    if ('vibrate' in navigator) navigator.vibrate(0);
    setPhase('idle');
    setCountdown(COUNTDOWN_SECONDS);
  };

  if (phase === 'counting') {
    return (
      <div className="sos-container">
        <button
          className="sos-btn counting"
          onClick={cancelCountdown}
          aria-label={`Cancel SOS — ${countdown} seconds remaining`}
        >
          <span className="sos-countdown-num">{countdown}</span>
          <span className="sos-cancel-hint">tap to cancel</span>
        </button>
        <p className="sos-hint" style={{ color: '#FCA5A5' }}>
          Alerting nearest station in {countdown}s…
        </p>
      </div>
    );
  }

  return (
    <div className="sos-container">
      <button
        className="sos-btn"
        onClick={startCountdown}
        aria-label="Hold to send SOS emergency alert"
      >
        <div className="sos-btn-ring" aria-hidden="true" />
        <div className="sos-btn-ring" aria-hidden="true" />
        <span className="sos-label">SOS</span>
        <span className="sos-sub">Tap to alert</span>
      </button>
      {nearestFacility ? (
        <p className="sos-hint">
          Will contact <strong style={{ color: '#F8FAFC' }}>{nearestFacility.shortName}</strong>{' '}
          ({nearestFacility.distance?.toFixed(1)} km away)
        </p>
      ) : (
        <p className="sos-hint">Locating nearest emergency services…</p>
      )}
    </div>
  );
}