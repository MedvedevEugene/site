"use client";

const BRANCHES = [
  { id: "causes", label: "Причины", angle: -90 },
  { id: "consequences", label: "Последствия", angle: -18 },
  { id: "composition", label: "Состав", angle: 54 },
  { id: "criteria", label: "Критерии", angle: 126 },
  { id: "values", label: "Ценности", angle: 198 },
] as const;

type BlockData = Record<string, string[]>;

export function InsightographMap({ pso, blocks }: { pso: string; blocks: BlockData }) {
  return (
    <>
      <div className="insight-map hidden md:block">
        <svg viewBox="0 0 400 400" className="w-full max-w-[420px] mx-auto">
          <circle cx="200" cy="200" r="150" fill="none" stroke="#efefef" strokeWidth="1" />
          {BRANCHES.map((branch) => {
            const rad = (branch.angle * Math.PI) / 180;
            const x2 = 200 + Math.cos(rad) * 150;
            const y2 = 200 + Math.sin(rad) * 150;
            const lx = 200 + Math.cos(rad) * 175;
            const ly = 200 + Math.sin(rad) * 175;
            const items = (blocks[branch.id] || []).filter(Boolean).slice(0, 2);
            return (
              <g key={branch.id}>
                <line x1="200" y1="200" x2={x2} y2={y2} stroke="#3b3758" strokeWidth="1.5" opacity="0.35" />
                <text x={lx} y={ly} textAnchor="middle" className="fill-[#3b3758] text-[11px] font-medium">
                  {branch.label}
                </text>
                {items.map((item, i) => {
                  const ty = ly + 14 + i * 12;
                  const short = item.length > 28 ? `${item.slice(0, 28)}…` : item;
                  return (
                    <text key={item} x={lx} y={ty} textAnchor="middle" className="fill-[#5d5d7b] text-[9px]">
                      {short}
                    </text>
                  );
                })}
              </g>
            );
          })}
          <circle cx="200" cy="200" r="56" fill="#f9f8e8" stroke="#3b3758" strokeWidth="1.5" />
          <text x="200" y="196" textAnchor="middle" className="fill-[#272344] text-[12px] font-medium">
            {pso.length > 16 ? `${pso.slice(0, 16)}…` : pso}
          </text>
        </svg>
      </div>
      <div className="insight-map-mobile md:hidden flex flex-col gap-3">
        {BRANCHES.map((branch) => (
          <div key={branch.id} className="tool-mini-card">
            <div className="font-medium text-sm text-[#3b3758] mb-2">{branch.label}</div>
            <ul className="m-0 pl-4 text-sm text-muted space-y-1">
              {(blocks[branch.id] || []).filter(Boolean).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
