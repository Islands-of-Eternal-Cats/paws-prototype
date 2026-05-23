import './SquadHeader.css';

interface SquadHeaderProps {
  name: string;
  role: string;
  currentSize: number;
  maxSize: number;
}

function SquadHeader({ name, role, currentSize, maxSize }: SquadHeaderProps) {
  return (
    <div className="squad-header">
      <div className="squad-header-left">
        <span className="squad-header-name">{name}</span>
        <span className="squad-header-role">{role}</span>
      </div>
      <div className="squad-header-size">Squad size: {currentSize}/{maxSize}</div>
    </div>
  );
}

export default SquadHeader;
