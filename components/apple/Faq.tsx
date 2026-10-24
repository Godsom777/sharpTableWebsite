import { Plus } from './Bits';

export type QA = { q: string; a: string };

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}<Plus /></summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
