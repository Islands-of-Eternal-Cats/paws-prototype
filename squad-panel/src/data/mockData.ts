export interface SupplyItem {
  status: 'ok' | 'low' | 'missing';
  value: number;
  max: number;
}

export interface Operator {
  id: string;
  name: string;
  operatorClass: string;
  weapon: string;
  utility: string;
}

export interface Squad {
  id: string;
  name: string;
  role: 'ASSAULT' | 'SALVAGE' | 'RECON' | 'DEFENSE';
  readiness: number;
  size: { current: number; max: number };
  supply: {
    ammo: SupplyItem;
    fuel: SupplyItem;
    medkits: SupplyItem;
    materials: SupplyItem;
  };
  operators: Operator[];
  cargo: { ammo: number; fuel: number; meds: number; materials: number };
  cargoMax: number;
}

export const squads: Squad[] = [
  {
    id: 'kobra-1',
    name: 'KOBRA-1',
    role: 'ASSAULT',
    readiness: 84,
    size: { current: 4, max: 6 },
    supply: {
      ammo: { status: 'ok', value: 180, max: 240 },
      fuel: { status: 'low', value: 40, max: 120 },
      medkits: { status: 'missing', value: 0, max: 8 },
      materials: { status: 'ok', value: 18, max: 24 },
    },
    operators: [
      { id: 'op-1', name: 'Sniper', operatorClass: 'Sniper', weapon: 'Rifle', utility: 'Cloak' },
      { id: 'op-2', name: 'Medic', operatorClass: 'Medic', weapon: 'SMG', utility: 'Medkit' },
      { id: 'op-3', name: 'Engineer', operatorClass: 'Engineer', weapon: 'Shotgun', utility: 'Toolkit' },
      { id: 'op-4', name: 'Heavy', operatorClass: 'Heavy', weapon: 'MG', utility: 'Armor' },
    ],
    cargo: { ammo: 120, fuel: 40, meds: 2, materials: 12 },
    cargoMax: 400,
  },
  {
    id: 'mule-3',
    name: 'MULE-3',
    role: 'SALVAGE',
    readiness: 62,
    size: { current: 3, max: 6 },
    supply: {
      ammo: { status: 'ok', value: 90, max: 120 },
      fuel: { status: 'missing', value: 0, max: 200 },
      medkits: { status: 'low', value: 2, max: 10 },
      materials: { status: 'ok', value: 40, max: 60 },
    },
    operators: [
      { id: 'op-5', name: 'Salvager', operatorClass: 'Engineer', weapon: 'Cutter', utility: 'Cargo Pack' },
      { id: 'op-6', name: 'Driver', operatorClass: 'Operator', weapon: 'Pistol', utility: 'Repair Kit' },
      { id: 'op-7', name: 'Scout', operatorClass: 'Scout', weapon: 'SMG', utility: 'Scanner' },
    ],
    cargo: { ammo: 60, fuel: 0, meds: 2, materials: 40 },
    cargoMax: 600,
  },
  {
    id: 'ghost-7',
    name: 'GHOST-7',
    role: 'RECON',
    readiness: 91,
    size: { current: 4, max: 4 },
    supply: {
      ammo: { status: 'ok', value: 90, max: 120 },
      fuel: { status: 'ok', value: 80, max: 100 },
      medkits: { status: 'ok', value: 6, max: 8 },
      materials: { status: 'low', value: 4, max: 16 },
    },
    operators: [
      { id: 'op-8', name: 'Spotter', operatorClass: 'Scout', weapon: 'DMR', utility: 'Drone' },
      { id: 'op-9', name: 'Ghost', operatorClass: 'Sniper', weapon: 'Silenced Rifle', utility: 'Cloak' },
      { id: 'op-10', name: 'Tech', operatorClass: 'Engineer', weapon: 'SMG', utility: 'Scanner' },
      { id: 'op-11', name: 'Medic', operatorClass: 'Medic', weapon: 'Pistol', utility: 'Medkit' },
    ],
    cargo: { ammo: 90, fuel: 80, meds: 6, materials: 4 },
    cargoMax: 200,
  },
];
