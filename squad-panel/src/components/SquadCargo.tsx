import './SquadCargo.css';

interface SquadCargoProps {
  cargo: { ammo: number; fuel: number; meds: number; materials: number };
  cargoMax: number;
}

function SquadCargo({ cargo, cargoMax }: SquadCargoProps) {
  return (
    <div className="squad-cargo">
      Squad Cargo: ammo {cargo.ammo}/{cargoMax} | fuel {cargo.fuel}/{cargoMax} | meds {cargo.meds}/{cargoMax} | materials {cargo.materials}/{cargoMax}
    </div>
  );
}

export default SquadCargo;
