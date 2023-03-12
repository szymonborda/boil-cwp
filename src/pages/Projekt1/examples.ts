import { Action } from './types';

const examples: Action[][] = [
  [
    { name: 'A', time: 3, predecessors: [] },
    { name: 'B', time: 2, predecessors: ['A'] },
    { name: 'C', time: 5, predecessors: ['A'] },
    { name: 'D', time: 4, predecessors: ['B', 'C'] },
    { name: 'E', time: 2, predecessors: ['D'] },
    { name: 'F', time: 3, predecessors: ['D'] },
    { name: 'G', time: 2, predecessors: ['E', 'F'] },
    { name: 'H', time: 1, predecessors: ['G'] },
  ],
  [
    { name: 'A', time: 3, predecessors: [] },
    { name: 'B', time: 4, predecessors: ['A'] },
    { name: 'C', time: 6, predecessors: ['A'] },
    { name: 'D', time: 7, predecessors: ['B'] },
    { name: 'E', time: 1, predecessors: ['D'] },
    { name: 'F', time: 2, predecessors: ['C'] },
    { name: 'G', time: 3, predecessors: ['C'] },
    { name: 'H', time: 4, predecessors: ['G'] },
    { name: 'I', time: 1, predecessors: ['E', 'F', 'H'] },
    { name: 'J', time: 2, predecessors: ['I'] },
  ],
  [
    { name: 'A', time: 5, predecessors: [] },
    { name: 'B', time: 7, predecessors: [] },
    { name: 'C', time: 6, predecessors: ['A'] },
    { name: 'D', time: 8, predecessors: ['A'] },
    { name: 'E', time: 3, predecessors: ['B'] },
    { name: 'F', time: 4, predecessors: ['C'] },
    { name: 'G', time: 2, predecessors: ['C'] },
    { name: 'H', time: 5, predecessors: ['E', 'D', 'F'] },
  ],
];

export default examples;
