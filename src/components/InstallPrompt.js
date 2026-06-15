import React from 'react';

export default function InstallPrompt({
  prompt,
  onDismiss,
}) {
  const handleInstall = async () => {
    if (!prompt) return;

    prompt.prompt();

    const result = await prompt.userChoice;

    if (result.outcome === 'accepted') {
      onDismiss();
    }
  };

  return (
    <div className="install-banner">
      <div className="install-icon">📲</div>

      <div className="install-text">
        <div className="install-title">
          Install RescueNow
        </div>

        <div className="install-desc">
          Works offline, faster access in emergencies
        </div>
      </div>

      <div className="install-actions">
        <button
          className="install-btn accept"
          onClick={handleInstall}
        >
          Install
        </button>

        <button
          className="install-btn dismiss"
          onClick={onDismiss}
        >
          Later
        </button>
      </div>
    </div>
  );
}