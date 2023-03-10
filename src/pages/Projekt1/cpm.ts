import { Action } from './types';

export default function calculateCPM(actions: Action[]) {
  for(let i in actions) {
    if(actions[i].predecessors.length === 0) {
      actions[i].ES = 0;
      actions[i].EF = actions[i].time;
    }
    else if(actions[i].predecessors.length === 1) {
      // search for predecessor and extract time
      for(let j in actions) {
        if(actions[i].predecessors[0] === actions[j].name) {
          actions[i].ES = actions[j].time + actions[j].ES;
          actions[i].EF = actions[i].ES + actions[i].time;
          break;
        }
      }
    }
    else {
      // search for predecessors and calculate every possible ES
      // from gathered results select the maximum
      let arr: number[] = []
      for(let a in actions[i].predecessors) {
        for(let b in actions) {
          if(actions[i].predecessors[a] === actions[b].name) {
            arr.push(actions[b].time + actions[b].ES);
          }
        }
      }
      actions[i].ES = Math.max(...arr);
      actions[i].EF = actions[i].ES + actions[i].time;
    }
  }
  return actions;
}
