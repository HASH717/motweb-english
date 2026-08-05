export function WaitingIndicator() {
  return (
    <div className="waiting-indicator" role="status" aria-label="Waiting for completion confirmation">
      <svg viewBox="0 0 120 120" aria-hidden="true" className="waiting-indicator__art">
        <circle className="waiting-indicator__orbit" cx="60" cy="60" r="46" />
        <circle className="waiting-indicator__trail" cx="60" cy="60" r="46" />
        <g className="waiting-indicator__clock">
          <circle cx="60" cy="60" r="27" />
          <path d="M60 43v18l12 8" />
          <circle cx="60" cy="60" r="3" />
        </g>
        <circle className="waiting-indicator__spark waiting-indicator__spark--one" cx="19" cy="30" r="3" />
        <circle className="waiting-indicator__spark waiting-indicator__spark--two" cx="101" cy="86" r="3" />
      </svg>
    </div>
  );
}
