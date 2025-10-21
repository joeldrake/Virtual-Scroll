# Virtual Scroller

En högpresterande virtual scrolling web component som klarar av items med **dynamisk höjd**. Perfekt för stora listor där endast synliga element renderas för optimal prestanda.

## Features

- **Dynamisk höjd** - Klarar items med varierande och dynamiska höjder
- **Automatisk mätning** - ResizeObserver mäter och uppdaterar item-höjder automatiskt
- **Hög prestanda** - Endast synliga items renderas
- **Web Component** - Standard custom element, fungerar med alla frameworks
- **Template-baserad** - Flexibel rendering med HTML templates
- **TypeScript support** - Inkluderar type definitions
- **Konfigurerbar overscan** - Rendera extra items för smidigare scrolling
- **Event-driven** - Events för item-rendering och range-ändringar

## Installation

```bash
# Klona repositoryt
git clone https://github.com/yourusername/Virtual-Scroll.git
cd Virtual-Scroll

# Starta demo-server
npm run dev
```

Öppna sedan `http://localhost:8000/demo/` i din webbläsare.

## Snabbstart

### Grundläggande användning

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    virtual-scroller {
      height: 500px;
      display: block;
    }
  </style>
</head>
<body>
  <virtual-scroller id="myScroller" item-height="100" overscan="5">
    <template>
      <div class="item">
        <h3>{{data.title}}</h3>
        <p>{{data.description}}</p>
      </div>
    </template>
  </virtual-scroller>

  <script type="module">
    import VirtualScroller from './src/virtual-scroller.js';

    const scroller = document.getElementById('myScroller');

    // Sätt data
    const items = Array.from({ length: 10000 }, (_, i) => ({
      title: `Item ${i}`,
      description: `Beskrivning för item ${i}`
    }));

    scroller.setItems(items);
  </script>
</body>
</html>
```

## API

### Attribut

| Attribut | Typ | Default | Beskrivning |
|----------|-----|---------|-------------|
| `item-height` | number | 50 | Standard höjd för items (i pixlar) innan mätning |
| `overscan` | number | 3 | Antal items att rendera utanför viewport |

### Metoder

#### `setItems(items: any[])`
Sätt data-items som ska renderas.

```javascript
scroller.setItems([
  { title: 'Item 1', content: 'Lorem ipsum...' },
  { title: 'Item 2', content: 'Dolor sit amet...' }
]);
```

#### `scrollToIndex(index: number)`
Scrolla till ett specifikt item.

```javascript
scroller.scrollToIndex(500); // Scrolla till item 500
```

#### `getVisibleRange(): { startIndex: number, endIndex: number }`
Få det aktuella synliga intervallet av items.

```javascript
const { startIndex, endIndex } = scroller.getVisibleRange();
console.log(`Visar items ${startIndex} till ${endIndex}`);
```

#### `getItemHeight(index: number): number`
Få höjden för ett specifikt item (mätt eller default).

```javascript
const height = scroller.getItemHeight(42);
```

#### `getTotalHeight(): number`
Få den totala höjden av alla items.

```javascript
const totalHeight = scroller.getTotalHeight();
```

### Events

#### `itemrender`
Triggas när ett item renderas.

```javascript
scroller.addEventListener('itemrender', (event) => {
  const { index, element, data } = event.detail;
  console.log(`Item ${index} rendered`, element, data);

  // Anpassa element vid behov
  if (data.highlighted) {
    element.classList.add('highlight');
  }
});
```

#### `rangechange`
Triggas när den renderade index-rangen ändras (vid scrollning).

**Event detail properties:**
- `startIndex` - Första synliga item-index
- `endIndex` - Sista synliga item-index
- `visibleCount` - Antal items som renderas
- `totalCount` - Totalt antal items

```javascript
scroller.addEventListener('rangechange', (event) => {
  const { startIndex, endIndex, visibleCount, totalCount } = event.detail;
  console.log(`Visar items ${startIndex}-${endIndex} (${visibleCount} av ${totalCount})`);

  // Användningsfall: Lazy loading av data
  // Ladda fler items när användaren närmar sig slutet
  if (endIndex > totalCount - 20) {
    loadMoreItems();
  }
});
```

### Template Syntax

Använd följande placeholders i ditt template:

- `{{index}}` - Item index (0-baserat)
- `{{data.propertyName}}` - Åtkomst till properties på data-objektet

```html
<template>
  <div class="item">
    <span class="index">{{index}}</span>
    <h3>{{data.title}}</h3>
    <p>{{data.description}}</p>
    <small>{{data.date}}</small>
  </div>
</template>
```

## Exempel

### Med React

```jsx
import { useEffect, useRef } from 'react';
import VirtualScroller from './src/virtual-scroller.js';

function MyComponent() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const items = Array.from({ length: 10000 }, (_, i) => ({
      title: `Item ${i}`,
      content: `Content ${i}`
    }));

    scrollerRef.current.setItems(items);
  }, []);

  return (
    <virtual-scroller
      ref={scrollerRef}
      item-height="80"
      overscan="5"
      style={{ height: '600px' }}
    >
      <template>
        <div className="item">
          <h3>{{data.title}}</h3>
          <p>{{data.content}}</p>
        </div>
      </template>
    </virtual-scroller>
  );
}
```

### Med Vue

```vue
<template>
  <virtual-scroller
    ref="scroller"
    item-height="80"
    overscan="5"
    style="height: 600px"
  >
    <template>
      <div class="item">
        <h3>{{data.title}}</h3>
        <p>{{data.content}}</p>
      </div>
    </template>
  </virtual-scroller>
</template>

<script>
import VirtualScroller from './src/virtual-scroller.js';

export default {
  mounted() {
    const items = Array.from({ length: 10000 }, (_, i) => ({
      title: `Item ${i}`,
      content: `Content ${i}`
    }));

    this.$refs.scroller.setItems(items);
  }
}
</script>
```

### Dynamisk höjd

Items kan ha helt olika höjder - komponenten mäter och anpassar sig automatiskt:

```javascript
const items = [
  { title: 'Kort', content: 'Lite text.' },
  {
    title: 'Lång',
    content: 'Mycket mycket längre text som tar upp mer plats och gör att detta item blir betydligt högre än det föregående. ResizeObserver kommer att detektera detta och uppdatera scrollpositionen korrekt.'
  },
  { title: 'Mellan', content: 'Lagom mycket text.' }
];

scroller.setItems(items);
```

## Hur det fungerar

1. **Phantom element** - Ett osynligt element som representerar den totala höjden av alla items, vilket gör att scrollbar visar korrekt storlek

2. **Synliga items** - Endast items som är synliga (eller nära synliga baserat på `overscan`) renderas faktiskt i DOM

3. **ResizeObserver** - Varje renderat item observeras för storleksändringar, vilket uppdaterar höjd-cachen automatiskt

4. **Position calculation** - Items positioneras absolut baserat på summan av alla föregående items höjder

5. **Transform** - Items flyttas med CSS `transform: translateY()` för bästa prestanda

## Prestanda

Med denna virtual scroller kan du enkelt hantera:

- **10,000+ items** - Smooth scrolling utan problem
- **100,000+ items** - Fungerar bra med något längre initial rendering
- **Dynamiska höjder** - Ingen prestandapåverkan jämfört med fixed höjd

Endast ~10-30 items renderas i DOM åt gången (beroende på viewport-storlek och overscan), oavsett total datamängd.

## Browser Support

- Chrome/Edge 64+
- Firefox 69+
- Safari 13.1+

(Kräver ResizeObserver och Custom Elements support)

## TypeScript

Projektet inkluderar TypeScript-definitioner:

```typescript
import VirtualScroller, { VisibleRange, VirtualScrollerItemRenderEvent } from './src/virtual-scroller.js';

const scroller = document.querySelector('virtual-scroller') as VirtualScroller;

scroller.addEventListener('itemrender', (e: VirtualScrollerItemRenderEvent) => {
  console.log(e.detail.index);
});

const range: VisibleRange = scroller.getVisibleRange();
```

## Licens

MIT

## Bidra

Pull requests är välkomna! För stora ändringar, öppna gärna ett issue först för att diskutera vad du vill ändra.
