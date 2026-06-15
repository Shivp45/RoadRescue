import React from 'react';
import { FACILITY_TYPES } from '../data/facilities';

const FILTERS = [
  { key: null, label: 'All', emoji: '📍' },
  { key: FACILITY_TYPES.HOSPITAL, label: 'Hospital', emoji: '🏥' },
  { key: FACILITY_TYPES.POLICE, label: 'Police', emoji: '🚓' },
  { key: FACILITY_TYPES.TRAUMA, label: 'Trauma', emoji: '🏨' },
  { key: FACILITY_TYPES.FIRE, label: 'Fire', emoji: '🚒' },
];

export default function FilterBar({
  activeFilter,
  onChange,
  counts,
}) {
  const totalCount = Object.values(counts || {}).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div
      className="filter-bar"
      role="group"
      aria-label="Filter emergency facilities"
    >
      {FILTERS.map(({ key, label, emoji }) => {
        const count =
          key === null ? totalCount : (counts?.[key] || 0);

        const isActive = activeFilter === key;

        return (
          <button
            key={String(key)}
            className={`filter-btn ${
              isActive ? `active ${key || 'all'}` : ''
            }`}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
          >
            {emoji} {label}
            {count > 0 && (
              <span className="filter-count">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}