import { Action } from './types';

export default function calculateCPM(actionsRef: Action[]) {
  const actions: Action[] = structuredClone(actionsRef);
  // add a hidden last action that collects all other actions that are not present
  // in other actions' predecessors
  actions.push({
    name: 'hidden',
    time: 0,
    predecessors: actions.filter(
      (a) => !actions.some((b) => b.predecessors.includes(a.name)),
    ).map((c) => c.name),
  });
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
  // Calculate LF and LS
  // Set LF for the last action
  actions[actions.length - 1].LF = actions[actions.length - 1].EF;
  for (let i = actions.length - 1; i >= 0; i -= 1) {
    actions[i].LS = actions[i].LF! - actions[i].time;

    if (actions[i].predecessors.length !== 0) {
      // Set LF values for predecessors
      for (let j = 0; j < actions.length; j += 1) {
        if (actions[i].predecessors.includes(actions[j].name)) {
          if (actions[j].LF! > actions[i].LS! || !actions[j].LF) actions[j].LF = actions[i].LS;
        }
      }
    }
  }
  for (let i = 0; i < actions.length; i += 1) {
    actions[i].slack = actions[i].LS! - actions[i].ES!;
    actions[i].critical = actions[i].slack === 0;
  }
  // return all actions except the hidden one
  return actions.slice(0, -1);
}
