import { useRef } from 'react';
import type { Edge } from './Projekt1';

interface EdgeInputProps {
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;
}

export default function EdgeInput({
  edges,
  setEdges,
}: EdgeInputProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const addEdge = () => {
    const name = nameRef.current?.value;
    const time = timeRef.current?.value;
    const from = fromRef.current?.value;
    const to = toRef.current?.value;

    if (name && time && from && to && !edges.some((edge) => edge.name === name)) {
      setEdges([...edges, {
        name,
        time: Number(time),
        from: Number(from),
        to: Number(to),
      }]);
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Czas</th>
            <th>Start</th>
            <th>Koniec</th>
          </tr>
        </thead>
        <tbody>
          { edges.map((edge) => (
            <tr key={edge.name}>
              <td>{edge.name}</td>
              <td>{edge.time}</td>
              <td>{edge.from}</td>
              <td>{edge.to}</td>
            </tr>
          )) }
        </tbody>
        <tfoot>
          <tr>
            <td><input type="text" ref={nameRef} /></td>
            <td><input type="number" ref={timeRef} /></td>
            <td><input type="number" ref={fromRef} /></td>
            <td><input type="text" ref={toRef} /></td>
          </tr>
        </tfoot>
      </table>
      <button onClick={addEdge} type="button">Add</button>
    </div>
  );
}
