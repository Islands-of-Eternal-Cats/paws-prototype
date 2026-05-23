import './ReadinessBar.css';

interface ReadinessBarProps {
  readiness: number;
}

function ReadinessBar({ readiness }: ReadinessBarProps) {
  return (
    <div className="readiness-bar">
      <div className="readiness-bar-label">
        <span>READINESS</span>
        <span>{readiness}%</span>
      </div>
      <div className="readiness-bar-track">
        <div className="readiness-bar-fill" style={{ width: `${readiness}%` }} />
      </div>
    </div>
  );
}

export default ReadinessBar;
