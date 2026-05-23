# Squad Panel MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working UI prototype of the PAWS Squad Panel — the main squad management screen with mock data, component architecture, and dark sci-fi theme.

**Architecture:** Single-page React app with no routing. State is a single `selectedSquadId` in App.tsx. All data is static mock data. Components receive props only (no context/store needed at this scale).

**Tech Stack:** React 18, Vite, TypeScript, vanilla CSS

**Plan Location:** `squad-panel/` subdirectory in project root

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `squad-panel/package.json`
- Create: `squad-panel/vite.config.ts`
- Create: `squad-panel/tsconfig.json`
- Create: `squad-panel/tsconfig.node.json`
- Create: `squad-panel/index.html`
- Create: `squad-panel/src/main.tsx`
- Create: `squad-panel/src/vite-env.d.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "paws-squad-panel",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PAWS — Tactical Operations</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/main.tsx**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 7: Create src/vite-env.d.ts**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 8: Install dependencies**

Run: `cd squad-panel && npm install`
Expected: `npm` installs all dependencies without errors

- [ ] **Step 9: Verify scaffold works**

Run: `cd squad-panel && npx vite --version`
Expected: prints Vite version (e.g. `5.x.x`)

- [ ] **Step 10: Commit**

```bash
git add squad-panel/
git commit -m "feat: scaffold Vite + React + TS project"
```

---

### Task 2: Create mock data types and data

**Files:**
- Create: `squad-panel/src/data/mockData.ts`

- [ ] **Step 1: Define types and mock data**

```ts
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
```

- [ ] **Step 2: Verify file compiles**

Run: `cd squad-panel && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/data/mockData.ts
git commit -m "feat: add mock data types and squad data"
```

---

### Task 3: Create global styles (App.css)

**Files:**
- Create: `squad-panel/src/App.css`

- [ ] **Step 1: Write global theme styles**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0f0f1a;
  color: #d0d0d0;
  font-family: 'Courier New', Courier, monospace;
  min-height: 100vh;
}

#root {
  display: flex;
  justify-content: center;
  padding: 24px;
}

.app {
  width: 100%;
  max-width: 640px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #1a1a2e;
  border-bottom: 1px solid #333;
  border-radius: 8px 8px 0 0;
}

.app-header h1 {
  font-size: 14px;
  font-weight: bold;
  color: #e0e0e0;
}

.app-header .version {
  font-size: 12px;
  color: #888;
}

.squad-panel {
  background: #0f0f1a;
  border: 1px solid #2a2a3e;
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 16px;
}
```

- [ ] **Step 2: Commit**

```bash
git add squad-panel/src/App.css
git commit -m "feat: add global theme styles"
```

---

### Task 4: Create SquadSelector component

**Files:**
- Create: `squad-panel/src/components/SquadSelector.tsx`
- Create: `squad-panel/src/components/SquadSelector.css`

- [ ] **Step 1: Write SquadSelector.css**

```css
.squad-selector {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.squad-selector-tab {
  background: #1a1a2e;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid #2a2a3e;
  color: #888;
  cursor: pointer;
  font-family: inherit;
}

.squad-selector-tab.active {
  background: #2a2a3e;
  border-color: #556677;
  color: #d0d0d0;
}

.squad-selector-tab:hover {
  border-color: #556677;
}
```

- [ ] **Step 2: Write SquadSelector.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/SquadSelector.css squad-panel/src/components/SquadSelector.tsx
git commit -m "feat: add SquadSelector component"
```

---

### Task 5: Create SquadHeader component

**Files:**
- Create: `squad-panel/src/components/SquadHeader.tsx`
- Create: `squad-panel/src/components/SquadHeader.css`

- [ ] **Step 1: Write SquadHeader.css**

```css
.squad-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.squad-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.squad-header-name {
  font-size: 18px;
  font-weight: bold;
}

.squad-header-role {
  background: #3a3a5e;
  padding: 2px 10px;
  border-radius: 3px;
  font-size: 11px;
  color: #aac;
}

.squad-header-size {
  font-size: 11px;
  color: #888;
}
```

- [ ] **Step 2: Write SquadHeader.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/SquadHeader.css squad-panel/src/components/SquadHeader.tsx
git commit -m "feat: add SquadHeader component"
```

---

### Task 6: Create ReadinessBar component

**Files:**
- Create: `squad-panel/src/components/ReadinessBar.tsx`
- Create: `squad-panel/src/components/ReadinessBar.css`

- [ ] **Step 1: Write ReadinessBar.css**

```css
.readiness-bar {
  margin-bottom: 16px;
}

.readiness-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
}

.readiness-bar-label span:first-child {
  color: #888;
}

.readiness-bar-label span:last-child {
  color: #eecc44;
}

.readiness-bar-track {
  height: 10px;
  background: #1a1a2e;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #333;
}

.readiness-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #eecc44, #ccaa22);
  border-radius: 5px;
  transition: width 0.3s ease;
}
```

- [ ] **Step 2: Write ReadinessBar.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/ReadinessBar.css squad-panel/src/components/ReadinessBar.tsx
git commit -m "feat: add ReadinessBar component"
```

---

### Task 7: Create SupplyStatus component

**Files:**
- Create: `squad-panel/src/components/SupplyStatus.tsx`
- Create: `squad-panel/src/components/SupplyStatus.css`

- [ ] **Step 1: Write SupplyStatus.css**

```css
.supply-status {
  margin-bottom: 16px;
}

.supply-status-title {
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}

.supply-status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  font-size: 12px;
}

.supply-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.supply-item-icon {
  font-weight: bold;
}

.supply-item-icon.ok {
  color: #44cc44;
}

.supply-item-icon.low {
  color: #ccaa44;
}

.supply-item-icon.missing {
  color: #cc4444;
}

.supply-item-label {
  color: #d0d0d0;
}

.supply-item-value.ok {
  color: #888;
}

.supply-item-value.low {
  color: #ccaa44;
}

.supply-item-value.missing {
  color: #cc4444;
}
```

- [ ] **Step 2: Write SupplyStatus.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/SupplyStatus.css squad-panel/src/components/SupplyStatus.tsx
git commit -m "feat: add SupplyStatus component"
```

---

### Task 8: Create ActionButtons component

**Files:**
- Create: `squad-panel/src/components/ActionButtons.tsx`
- Create: `squad-panel/src/components/ActionButtons.css`

- [ ] **Step 1: Write ActionButtons.css**

```css
.action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.action-btn {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #445566;
  font-family: inherit;
  background: #2a3a3e;
  color: #d0d0d0;
}

.action-btn.primary {
  background: #3a4a5e;
  border-color: #556677;
}

.action-btn:hover {
  opacity: 0.8;
}
```

- [ ] **Step 2: Write ActionButtons.tsx**

```tsx
import './ActionButtons.css';

function ActionButtons() {
  return (
    <div className="action-buttons">
      <button className="action-btn primary">RESUPPLY TO TEMPLATE</button>
      <button className="action-btn">AUTO ✓</button>
    </div>
  );
}

export default ActionButtons;
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/ActionButtons.css squad-panel/src/components/ActionButtons.tsx
git commit -m "feat: add ActionButtons component"
```

---

### Task 9: Create OperatorCard component

**Files:**
- Create: `squad-panel/src/components/OperatorCard.tsx`
- Create: `squad-panel/src/components/OperatorCard.css`

- [ ] **Step 1: Write OperatorCard.css**

```css
.operators-section {
  margin-bottom: 12px;
}

.operators-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.operators-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.operator-card {
  background: #1a1a2e;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  border: 1px solid #334455;
}

.operator-card-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.operator-card-class {
  font-size: 11px;
  font-weight: bold;
  color: #d0d0d0;
}

.operator-card-item {
  font-size: 10px;
  color: #888;
}
```

- [ ] **Step 2: Write OperatorCard.tsx**

```tsx
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
        {/* Fill empty slots if squad is below max */}
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/OperatorCard.css squad-panel/src/components/OperatorCard.tsx
git commit -m "feat: add OperatorCard component"
```

---

### Task 10: Create SquadCargo component

**Files:**
- Create: `squad-panel/src/components/SquadCargo.tsx`
- Create: `squad-panel/src/components/SquadCargo.css`

- [ ] **Step 1: Write SquadCargo.css**

```css
.squad-cargo {
  font-size: 11px;
  color: #666;
  border-top: 1px solid #222;
  padding-top: 8px;
}
```

- [ ] **Step 2: Write SquadCargo.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/components/SquadCargo.css squad-panel/src/components/SquadCargo.tsx
git commit -m "feat: add SquadCargo component"
```

---

### Task 11: Wire everything together in App.tsx

**Files:**
- Modify: `squad-panel/src/App.tsx`

- [ ] **Step 1: Write App.tsx with all components assembled**

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `cd squad-panel && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add squad-panel/src/App.tsx
git commit -m "feat: wire App with all squad panel components"
```

---

### Task 12: Verify final app runs

- [ ] **Step 1: Start dev server and check output**

Run: `cd squad-panel && npx vite --host`
Expected: Vite starts on localhost, no errors in terminal

- [ ] **Step 2: Open in browser**

Open `http://localhost:5173` (or whatever port Vite shows)
Expected:
- Dark theme page with "🐾 PAWS — Tactical Operations" header
- Three squad tabs: KOBRA-1 (active), MULE-3, GHOST-7
- Squad info: name, role badge, size
- Readiness bar at 84% with gold gradient
- Supply status with 4 items, each with icon and status
- Two action buttons (non-functional)
- 4 operator cards with emoji icons, class names, weapon and utility
- Squad cargo line at bottom
- Clicking different squad tabs switches the displayed data

- [ ] **Step 3: Verify build works**

Run: `cd squad-panel && npm run build`
Expected: Build succeeds, outputs to `dist/` directory