import { Action } from './types';

export default function calculateCPM(actionsRef: Action[]) {
  const actions: Action[] = structuredClone(actionsRef);
  for (let i = 0; i < actions.length; i += 1) {
    if (actions[i].predecessors.length === 0) {
      actions[i].ES = 0;
      actions[i].EF = actions[i].time;
    } else if (actions[i].predecessors.length === 1) {
      // search for predecessor and extract time
      for (let j = 0; j < actions.length; j += 1) {
        if (actions[i].predecessors[0] === actions[j].name) {
          actions[i].ES = actions[j].time + actions[j].ES!;
          actions[i].EF = actions[i].ES! + actions[i].time;
          break;
        }
      }
    } else {
      // search for predecessors and calculate every possible ES
      // from gathered results select the maximum
      const arr: number[] = [];
      for (let a = 0; a < actions[i].predecessors.length; a += 1) {
        for (let b = 0; b < actions.length; b += 1) {
          if (actions[i].predecessors[a] === actions[b].name) {
            arr.push(actions[b].time + actions[b].ES!);
          }
        }
      }
      actions[i].ES = Math.max(...arr);
      actions[i].EF = actions[i].ES! + actions[i].time;
    }
  }
  return actions;
}