import {
  Gantt as GanttTaskReact,
  Task,
} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Action } from './types';

interface GanttProps {
  actions: Action[];
}

function Gantt({ actions }: GanttProps) {
  const tasks: Task[] = actions.map((action) => ({
    id: action.name,
    type: 'task' as const,
    name: action.name,
    start: new Date(new Date().setDate(new Date().getDate() + action.ES! || 0)),
    end: new Date(new Date().setDate(new Date().getDate() + action.EF! || 0)),
    dependencies: action.predecessors,
    progress: 100,
  }));
  return (
    <GanttTaskReact
      tasks={tasks}
    />
  );
}

export default Gantt;
