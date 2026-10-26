import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

type V = 'y' | 'p' | 'n';
const cols = [
  { name: 'SharpTable', logo: '/assets/logos/logo-black.png' },
  { name: 'Rezta', logo: '/compare/rezta.png' },
  { name: 'Ordara', logo: '/compare/ordara.svg' },
  { name: 'Restoflow', logo: '/compare/restoflow.png' },
  { name: 'MyQR', logo: '/compare/myqr.png' },
  { name: 'SambaPOS', logo: '/compare/sambapos.png' },
];
const price = ['₦50,000/mo', '₦4,000/mo', '₦7,199/mo', '₦10,999/mo', 'Free', '$339 once'];
const rows: [string, V[]][] = [
  ['Guest QR ordering', ['y', 'y', 'y', 'y', 'y', 'p']],
  ['Built-in payments', ['y', 'y', 'y', 'y', 'y', 'y']],
  ['Kitchen display', ['y', 'y', 'y', 'y', 'n', 'y']],
  ['WhatsApp ordering bot', ['y', 'p', 'n', 'p', 'p', 'n']],
  ['Manager mobile app', ['y', 'n', 'n', 'n', 'n', 'n']],
  ['Auditing', ['y', 'n', 'y', 'n', 'n', 'y']],
  ['Multi-branch admin', ['y', 'y', 'y', 'y', 'y', 'y']],
  ['Hotel rooms', ['y', 'n', 'p', 'p', 'p', 'n']],
  ['No commission', ['y', 'y', 'n', 'n', 'n', 'n']],
  ['Every feature on every plan', ['y', 'n', 'n', 'n', 'n', 'n']],
];
const has = (src: string) => fs.existsSync(path.join(process.cwd(), 'public', src));

function Cell({ v }: { v: V }) {
  if (v === 'y') return <span role="img" aria-label="Yes" className="ck">✓</span>;
  if (v === 'p') return <span role="img" aria-label="Partial" className="pt">~</span>;
  return <span role="img" aria-label="Not stated" className="nd">—</span>;
}

export default function Compare() {
  return (
    <section className="tile cmp" aria-labelledby="cmp-h">
      <div className="head">
        <h2 id="cmp-h">Compare.</h2>
        <p className="sub">One system. Every feature. No upgrades.</p>
      </div>
      <div className="cmp-scroll" tabIndex={0} role="region" aria-label="Feature comparison, scroll sideways">
        <table>
          <caption className="sr">SharpTable compared with Rezta, Ordara, Restoflow, MyQR and SambaPOS</caption>
          <thead>
            <tr>
              <td />
              {cols.map((c, i) => (
                <th key={c.name} scope="col" className={i === 0 ? 'st' : undefined}>
                  <span className="lg">{has(c.logo) ? <img src={c.logo} alt="" loading="lazy" /> : null}</span>
                  <span className="nm">{c.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="pr">
              <th scope="row">Entry price</th>
              {price.map((t, i) => <td key={i} className={i === 0 ? 'st' : undefined}>{t}</td>)}
            </tr>
            {rows.map(([label, vals]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {vals.map((v, i) => <td key={i} className={i === 0 ? 'st' : undefined}><Cell v={v} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cmp-more"><Link className="lm" href="/pricing">Every plan includes every SharpTable feature. ›</Link></p>
      <p className="cmp-note">Logos and names are trademarks of their owners. Feature notes as of October 2026 from public sites.</p>
    </section>
  );
}
