# PAWS: Tactical Idle-RTS — Design Document

> Версия: 0.1  
> Жанр: Tactical Idle-RTS / Logistics Management / Squad Operations  
> Тон: Gritty sci-fi, industrial post-collapse, профессиональные feline operators  
> Визуальный стиль: XCOM meets BLAME! — hard-surface armor, тактическое снаряжение, glowing visors, грязные плащи, модульная техника  

---

## 1. Executive Summary

**PAWS** — это тактическая idle-RTS, в которой игрок управляет отрядами бессмертных антропоморфных котов-оперативников. Игрок не контролирует юнитов напрямую в реальном времени — он задаёт доктрины, шаблоны экипировки, управляет логистикой базы и снабжением отрядов в поле.

Ключевая механика: **Loadout Templates + Auto Resupply**. Игрок настраивает пресеты экипировки, база автоматически снаряжает отряды согласно этим пресетам. Возникает gameplay про подготовку, supply chain, planning и operational readiness — без ручного inventory hell.

---

## 2. Core Fantasy

### Что чувствует игрок

- Я — операционный директор PMC из генетически модифицированных котов.
- Я не контролирую каждый шаг — я задаю правила и доктрины.
- Мои отряды автономны, но зависят от моей логистики.
- Каждый провал — это не смерть, а потеря снаряжения, времени, readiness.

### Tone

- **Не** милые котики ради мемов.
- **А:** профессиональные бессмертные feline operators.
- Серьёзная sci-fi вселенная с элементами чёрного юмора.
- Эмоциональность без grimdark: можно привязаться к юнитам, но бессмертие снимает страх permanent death.

---

## 3. Вселенная и Лор

### Сеттинг

Пост-коллапс. Корпорации генетически модифицировали кошачьих для работы в экстремальных условиях: радиация, вакуум, автономные операции. Оперативники (Operators) — результат этой программы. Они бессмертны (см. механику бессмертия), но их тела и экипировка расходны.

### Бессмертие — 3 варианта (выбор одного или комбинация)

| Вариант | Механика |
|---------|----------|
| **Backup Consciousness** | Сознание хранится на базе, тело печатается заново. Потеря тела = потеря экипировки и части опыта миссии |
| **"9 жизней"** | У каждого оперативника ограниченное число регенераций. Сразу даёт stakes и theme |
| **Клонирование + мутации** | После гибели оперативник восстанавливается, но теряет часть памяти, traits мутируют, появляются quirks |

**Рекомендация:** комбинация "9 жизней" + клонирование. Лимит регенераций создаёт напряжение, а мутации при клонировании открывают trait system.

### С чем остаётся игра вместо смерти

- Нокаут / эвакуация
- Потеря снаряжения
- Травмы / стресс
- Поломка имплантов
- "Рассыпание" команды (потеря cohesion)

---

## 4. Юниты (Feline Operators)

### Классы и Silhouette Readability

Каждый класс имеет чёткий силуэт и визуальную идентичность, чтобы игрок мгновенно читал ситуацию:

| Класс | Порода (визуал) | Роль |
|-------|-----------------|------|
| **Engineer** | Тонкие ориентальные коты | Ремонт, взлом, дроны |
| **Heavy** | Мейн-куны в броне | Огневая мощь, штурм |
| **Scout** | Сфинксы | Разведка, stealth, дроны-сканеры |
| **Medic** | Белые стерильные коты | Лечение, аптечки, эвакуация |
| **Operator (универсал)** | Смешанные | Командиры, хакинг |

### Trait System

- "Боится дронов"
- "Любит тяжёлое оружие"
- "Клонирован 7 раз"
- "Страдает от деградации памяти"
- "Фанатик корпорации"
- "Ненавидит воду"

Traits влияют на поведение в поле, совместимость в отряде, эффективность при выполнении задач.

### Бессмертие в геймплее

Игроку приятнее возвращаться в игру если:
> "Кобра-1 провалили миссию, но все выжили. Потерян грузовик."
а не:
> "Ваш любимый оперативник умер."

Это критически важно для idle retention — игрок возвращается в прогрессирующий мир, а не в траур.

---

## 5. Инвентарная Система (Inventory Design)

### Проблема

- 6 squads × 8 бойцов = 48 inventory panels
- В idle-RTS ручной микроменеджмент убивает tempo
- "Inventory Tetris" не сочетается с macro-management

### Решение: Гибридная система

```
┌─────────────────────────────────────────┐
│            ЮНИТ (Personal Slots)         │
│  [Primary Weapon] [Secondary] [Armor]   │
│  [Utility 1] [Utility 2]                │
│  Carry Weight: 24/30 кг                 │
├─────────────────────────────────────────┤
│           SQUAD (Shared Cargo)           │
│  Ammo: 480    Fuel: 120    Meds: 8      │
│  Materials: 24    Food: 16              │
│  Weight: 120/400 кг                     │
├─────────────────────────────────────────┤
│        БАЗА (Warehouse / Storage)        │
│  Все ресурсы, производство, крафт       │
│  Auto-template fulfillment               │
└─────────────────────────────────────────┘
```

**У юнита:**
- Primary weapon, secondary, armor
- 1–2 utility слота (toolkit, medkit, drone, scanner и т.д.)
- Carry weight (ограничение на общий вес)

**У отряда (squad):**
- Shared cargo: ammo pool, fuel, meds, materials, food
- Весовой лимит (зависит от транспорта)

**У базы:**
- Склад с ресурсами
- Производство / крафт
- Автоматическое выполнение шаблонов снаряжения

### Critical Item Ownership

Некоторые вещи закреплены за конкретным юнитом:

```
Инженер погиб → toolkit потерян.
Но:
ammo не надо вручную перекладывать.
```

- Toolkit → Engineer
- Medkit → Medic
- Heavy Weapon → Heavy
- Hacking Device → Operator
- Repair Drone → Engineer

Всё остальное — squad shared.

---

## 6. Loadout Templates & Auto Resupply

### Как это работает

Игрок НЕ таскает предметы руками. Он задаёт шаблон экипировки.

#### Пример: ENGINEER TEMPLATE

```
Primary: SMG
Utility: Toolkit, Repair Drone
Consumables: 2 Medkits, 1 Battery
Ammo: 120 SMG ammo
```

#### Что делает база

Когда юнит возвращается на базу или FOB:

1. Проверяет template
2. Сравнивает с текущим inventory
3. Добирает недостающее со склада
4. Складывает лишнее на склад
5. Чинит экипировку
6. Перезаряжает

### Doctrines (Presets)

Игрок создаёт пресеты и назначает их на squad:

```
KOBRA   → ASSAULT
MULE    → SALVAGE
GHOST   → RECON
```

| Doctrine | Состав экипировки |
|----------|-------------------|
| **ASSAULT** | Heavy armor, grenades, AR ammo, medkits |
| **RECON** | Light armor, drone, scanner, silenced weapon, low weight |
| **SALVAGE** | Cargo packs, cutting tools, repair kits, minimal ammo |
| **DEFENSE** | Fortification mats, sentry gun, medkits, heavy ammo |

### Дефицит — источник глубины

```
Template wants: 4 Medkits
Storage has:   1

→ Squad уходит частично снаряжён
→ Или ждёт производства
→ Readiness падает
→ Игрок управляет приоритетами supply chain
```

### Время снабжения

Если resupply мгновенный — логистика исчезает.

> Resupplying... 00:43

Реальное время снабжения создаёт:
- Очереди на складе
- Необходимость в нескольких сменных отрядах
- Ценность Forward Operating Bases

### Physicalized Logistics (опционально, Tier 2)

- Warehouse workers / drones
- Forklifts
- Conveyors
- База выглядит живой

---

## 7. Readiness System

### Combat Readiness %

У каждого squad есть единый показатель готовности:

```
KOBRA-1
ROLE: ASSAULT
READINESS: 84%
SUPPLY:
  ammo     OK
  fuel     LOW
  medkits  MISSING
```

**Влияет на Readiness:**
- % заполнения template
- Топливо
- Мораль (Morale)
- Усталость (Fatigue)
- Ремонт техники
- Наличие командира

### Зачем это нужно

Вместо 300 иконок предметов — один показатель. Игрок мгновенно читает: готов ли отряд к выходу. UX становится **doctrine-driven**, а не inventory-driven.

---

## 8. UI / HUD Concept

### Squad Panel (основной интерфейс)

```
┌──────────────────────────────────┐
│ KOBRA-1           [ASSAULT]      │
│ ████████░░  READINESS: 84%       │
│                                   │
│ SUPPLY:                           │
│ ✓ ammo     OK                     │
│ ⚠ fuel     LOW                   │
│ ✗ medkits  MISSING               │
│                                   │
│ [RESUPPLY TO TEMPLATE] [AUTO]    │
│                                   │
│ Portraits:                        │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│ │Snpr│ │Med │ │Eng │ │Hvy │     │
│ │Rifl│ │SMG │ │SG  │ │MG  │     │
│ │Clo │ │Med │ │Tool│ │Arm │     │
│ └────┘ └────┘ └────┘ └────┘     │
└──────────────────────────────────┘
```

### Принципы UI

1. **No spreadsheet** — информация подаётся визуально
2. **Readable at glance** — silhouette, цветовые индикаторы, иконки
3. **Минимум кликов** — auto-resupply по умолчанию, ручной режим опционально
4. **Portraits+gear** — роль читается по портрету и 2-3 иконкам снаряжения

---

## 9. Multi-Tier Templates

### Squad Template

Определяет:
- Роль / доктрину
- Поведение в поле (avoid combat, stealth priority, aggressive)
- Транспорт
- Supply policy (priority, min/max запасы)

### Unit Template

Определяет экипировку конкретного класса.

**Пример: RECON FAST Squad + Unit Templates:**

```
SQUAD: Recon Fast
  vehicles:  light buggy
  behavior:  avoid combat, stealth priority

  Sniper:
    DMR, Cloak, 2 batteries
  Scout:
    SMG, Drone, Scanner
```

---

## 10. Forward Operating Bases (FOB)

### Что это

Squad может пополняться не только в HQ, а в полевых депо.

### Что даёт

- Фронт снабжения
- Convoy gameplay (охрана караванов)
- Mobile warfare
- Увеличение операционного радиуса

### Глубина

- FOB нужно строить, снабжать, защищать
- Потеря FOB = потеря снаряжения на передовой
- Выбор: одна мощная база vs сеть маленьких FOB

---

## 11. Gameplay Loop

```
1. СОЗДАЙ DOCTRINE
   └ Настрой шаблоны экипировки (Assault, Recon, Salvage...)

2. ОСНАСТИ БАЗУ
   └ Производи / крафти / добывай ресурсы
   └ Управляй warehouse и очередями снабжения

3. АВТОМАТИЗИРУЙ SUPPLY
   └ Настрой Auto-Resupply
   └ Squad возвращается → база снаряжает по шаблону

4. ОТПРАВЛЯЙ SQUADS
   └ Назначь доктрину отряду
   └ Проверь Readiness
   └ Отправь на задание

5. РЕАГИРУЙ НА ДЕФИЦИТ
   └ Кончились medkits? → переключи производство
   └ Потерял toolkit? → отправь инженера в ремонт
   └ Топливо на нуле? → организуй конвой
```

---

## 12. Рекомендуемая Архитектура

```
┌─────────────────────────────────────────────┐
│                 PLAYER                       │
│         Doctrines / Presets / Orders         │
├─────────────────────────────────────────────┤
│                   BASE                       │
│  Warehouse │ Production │ Auto-Fulfillment   │
├─────────────────────────────────────────────┤
│               SQUAD (Shared)                │
│  Cargo │ Readiness │ Behavior │ Transport    │
├─────────────────────────────────────────────┤
│                UNIT (Personal)              │
│  Weapon │ Armor │ Utility │ Traits │ Weight  │
└─────────────────────────────────────────────┘
```

### Game Feel (целевые референсы)

| Игра | Что берём |
|------|-----------|
| **XCOM** | Тактическая глубина, классы, персональное снаряжение, attachment к юнитам |
| **Foxhole** | Logistics как полноценный gameplay, фронт снабжения, convoy |
| **Kenshi** | Squad management, автономное поведение, потеря снаряжения, emergent истории |
| **Idle automation (Factorio, Shapez)** | Автоматизация supply chain, очереди, оптимизация потоков |

---

## 13. Open Questions / Next Steps

- [ ] Выбор механики бессмертия (backup / 9 lives / cloning)
- [ ] Детальный дизайн Trait System
- [ ] Прототип UI: Squad Panel с portrait + gear slots
- [ ] Дизайн экономики: стоимость предметов, время производства
- [ ] FOB system: стоимость постройки, лимиты, защита
- [ ] Прототип Auto-Resupply: поведение AI базы
- [ ] Мокап интерфейса (UI mockup / Figma)

---

*Документ создан на основе обсуждений концепции (см. ideas/).*