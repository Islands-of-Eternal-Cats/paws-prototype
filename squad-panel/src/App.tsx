import { useState } from 'react';
import { squads } from './data/mockData';
import SquadSelector from './components/SquadSelector';
import SquadHeader from './components/SquadHeader';
import ReadinessBar from './components/ReadinessBar';
import SupplyStatus from './components/SupplyStatus';
import ActionButtons from './components/ActionButtons';
import OperatorCard from './components/OperatorCard';
import SquadCargo from './components/SquadCargo';

function App() {
  const [selectedId, setSelectedId] = useState(squads[0].id);
  const squad = squads.find((s) => s.id === selectedId) ?? squads[0];

  const squadNames = squads.map((s) => ({ id: s.id, name: s.name }));

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 PAWS — Tactical Operations</h1>
        <span className="version">v0.0.1</span>
      </header>

      <div className="squad-panel">
        <SquadSelector
          squadNames={squadNames}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <SquadHeader
          name={squad.name}
          role={squad.role}
          currentSize={squad.size.current}
          maxSize={squad.size.max}
        />

        <ReadinessBar readiness={squad.readiness} />

        <SupplyStatus supply={squad.supply} />

        <ActionButtons />

        <OperatorCard operators={squad.operators} />

        <SquadCargo cargo={squad.cargo} cargoMax={squad.cargoMax} />
      </div>
    </div>
  );
}

export default App;