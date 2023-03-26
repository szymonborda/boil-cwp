import {
  Gantt as GanttTaskReact,
  Task,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Action } from './types';

interface GanttProps {
  actions: Action[];
  startDate?: string;
}

function Gantt({ actions, startDate }: GanttProps) {
  const start = startDate ? new Date(startDate).getDate() : new Date().getDate()
  const tasks: Task[] = actions.map((action) => ({
    id: action.name,
    type: 'task' as const,
    name: action.name,
    start:  new Date(new Date(new Date().setDate(start + action.ES! || 0)).setHours(0,0,0,0)),
    end:  new Date(new Date(new Date().setDate(start + action.EF! || 0)).setHours(0,0,0,0)),
    dependencies: action.predecessors,
    progress: 100,
  }));
  return (  
    <GanttTaskReact
      tasks={tasks}
      listCellWidth=""
      locale="pl"
    />
  );
}

export default Gantt;
