import './SquadSelector.css';

interface SquadSelectorProps {
  squadNames: { id: string; name: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function SquadSelector({ squadNames, selectedId, onSelect }: SquadSelectorProps) {
  return (
    <div className="squad-selector">
      {squadNames.map((squad) => (
        <button
          key={squad.id}
          className={`squad-selector-tab ${squad.id === selectedId ? 'active' : ''}`}
          onClick={() => onSelect(squad.id)}
        >
          {squad.name}
        </button>
      ))}
    </div>
  );
}

export default SquadSelector;
