"use client";

type Column = { title: string; words: string[] };

export function AssociationsTree({ columns }: { columns: Column[] }) {
  return (
    <div className="assoc-tree overflow-x-auto pb-2">
      <div className="assoc-tree__grid">
        {columns.map((col, index) => (
          <div key={col.title} className="assoc-tree__col">
            <div className="assoc-tree__col-title">{col.title}</div>
            <div className="assoc-tree__col-num">{index + 1}</div>
            <ul className="assoc-tree__list">
              {col.words.map((word) => (
                <li key={word} className={word.includes("(повтор)") ? "assoc-tree__dup" : ""}>
                  {word}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
