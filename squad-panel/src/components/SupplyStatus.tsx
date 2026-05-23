import './SupplyStatus.css';
import type { SupplyItem } from '../data/mockData';

interface SupplyStatusProps {
  supply: {
    ammo: SupplyItem;
    fuel: SupplyItem;
    medkits: SupplyItem;
    materials: SupplyItem;
  };
}

const STATUS_ICONS: Record<string, string> = {
  ok: '✓',
  low: '⚠',
  missing: '✗',
};

const STATUS_LABELS: Record<string, string> = {
  ok: 'OK',
  low: 'LOW',
  missing: 'MISSING',
};

const ITEMS = [
  { key: 'ammo', label: 'ammo' },
  { key: 'fuel', label: 'fuel' },
  { key: 'medkits', label: 'medkits' },
  { key: 'materials', label: 'materials' },
] as const;

function SupplyStatus({ supply }: SupplyStatusProps) {
  return (
    <div className="supply-status">
      <div className="supply-status-title">SUPPLY</div>
      <div className="supply-status-grid">
        {ITEMS.map(({ key, label }) => {
          const item = supply[key as keyof typeof supply];
          return (
            <div key={key} className="supply-item">
              <span className={`supply-item-icon ${item.status}`}>
                {STATUS_ICONS[item.status]}
              </span>
              <span className="supply-item-label">{label}</span>
              <span className={`supply-item-value ${item.status}`}>
                {STATUS_LABELS[item.status]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SupplyStatus;
