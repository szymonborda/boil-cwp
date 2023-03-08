import { useState } from 'react';
import EdgeInput from './EdgeInput';

export interface Edge {
  name: string;
  from: number;
  to: number;
  time: number;
}

function Projekt1() {
  const [edges, setEdges] = useState<Edge[]>([]);
  return (
    <div className="projekt1">
      <h1>Strona pod projekt 1</h1>
      <EdgeInput edges={edges} setEdges={setEdges} />
    </div>
  );
}

export default Projekt1;
