# Simple RoundRobin

[![npm status](https://img.shields.io/badge/npm-v1.0.1-brightgreen.svg)](https://www.npmjs.org/package/simple-roundrobin)

### Usage

Simply pass the params for the teams and legs:

```js
import simpleRoundRobin from "simple-roundrobin";

const schedule = simpleRoundRobin({
  teams: [
    "Hajduk",
    "Dinamo",
    "Osijek",
    "Rijeka",
    "Gorica",
    "Istra 1961"
  ],
  legs: 2, // Optional - 1 is default
});
```

Will return the following output:

```
[
  [
    { home: 'Istra 1961', away: 'Hajduk' },
    { home: 'Gorica', away: 'Dinamo' },
    { home: 'Osijek', away: 'Rijeka' }
  ],
  [
    { home: 'Hajduk', away: 'Gorica' },
    { home: 'Rijeka', away: 'Istra 1961' },
    { home: 'Dinamo', away: 'Osijek' }
  ],
  [
    { home: 'Rijeka', away: 'Hajduk' },
    { home: 'Gorica', away: 'Osijek' },
    { home: 'Dinamo', away: 'Istra 1961' }
  ],
  [
    { home: 'Hajduk', away: 'Osijek' },
    { home: 'Rijeka', away: 'Dinamo' },
    { home: 'Gorica', away: 'Istra 1961' }
  ],
  [
    { home: 'Dinamo', away: 'Hajduk' },
    { home: 'Osijek', away: 'Istra 1961' },
    { home: 'Gorica', away: 'Rijeka' }
  ],
  [
    { home: 'Hajduk', away: 'Istra 1961' },
    { home: 'Dinamo', away: 'Gorica' },
    { home: 'Rijeka', away: 'Osijek' }
  ],
  [
    { home: 'Gorica', away: 'Hajduk' },
    { home: 'Istra 1961', away: 'Rijeka' },
    { home: 'Osijek', away: 'Dinamo' }
  ],
  [
    { home: 'Hajduk', away: 'Rijeka' },
    { home: 'Osijek', away: 'Gorica' },
    { home: 'Istra 1961', away: 'Dinamo' }
  ],
  [
    { home: 'Osijek', away: 'Hajduk' },
    { home: 'Dinamo', away: 'Rijeka' },
    { home: 'Istra 1961', away: 'Gorica' }
  ],
  [
    { home: 'Hajduk', away: 'Dinamo' },
    { home: 'Istra 1961', away: 'Osijek' },
    { home: 'Rijeka', away: 'Gorica' }
  ]
]
```

A very simple sandbox by using React can be found [here](https://codesandbox.io/s/reverent-lamport-05gso9).
