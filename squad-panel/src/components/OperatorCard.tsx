import './OperatorCard.css';
import type { Operator } from '../data/mockData';

interface OperatorCardProps {
  operators: Operator[];
}

const CLASS_ICONS: Record<string, string> = {
  Sniper: '🎯',
  Medic: '💊',
  Engineer: '🔧',
  Heavy: '🛡️',
  Scout: '👁️',
  Operator: '⚙️',
};

function OperatorCard({ operators }: OperatorCardProps) {
  return (
    <div className="operators-section">
      <div className="operators-label">OPERATORS</div>
      <div className="operators-grid">
        {operators.map((op) => (
          <div key={op.id} className="operator-card">
            <div className="operator-card-icon">
              {CLASS_ICONS[op.operatorClass] || '🐱'}
            </div>
            <div className="operator-card-class">{op.operatorClass}</div>
            <div className="operator-card-item">{op.weapon}</div>
            <div className="operator-card-item">{op.utility}</div>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 4 - operators.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="operator-card" style={{ opacity: 0.3 }}>
            <div className="operator-card-icon">—</div>
            <div className="operator-card-class">Empty</div>
            <div className="operator-card-item">—</div>
            <div className="operator-card-item">—</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OperatorCard;
