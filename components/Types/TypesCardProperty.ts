import type { GraphProperty } from "./TypesGraphProperty";

import type { Machine } from './TypesMachine';
import type { WhatToShowProperty } from "./TypesWhatToShowProperty";

export interface CardProperty{
    Machine : Machine,
    GraphProperty : GraphProperty,
    WhatToShowProperty : WhatToShowProperty,
}