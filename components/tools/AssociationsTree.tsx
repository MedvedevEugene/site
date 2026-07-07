"use client";

type AssociationsTreeProps = {
  level1: string[];
  level2: string[];
  level3: string[];
  level4: string[];
  finalWord: string;
  highlightDuplicates?: boolean;
};

const ROWS = 16;

function formatLeaf(word: string, index: number, highlightDuplicates?: boolean) {
  const label = word.trim() || `Слово ${index + 1}`;
  if (highlightDuplicates && word.includes("(повтор)")) {
    return <span className="assoc-tree__dup">{label}</span>;
  }
  return label;
}

function BracketConnector({
  rowStart,
  span,
  column,
}: {
  rowStart: number;
  span: number;
  column: number;
}) {
  return (
    <div
      className="assoc-bracket__connector"
      style={{ gridRow: `${rowStart} / span ${span}`, gridColumn: column }}
      aria-hidden
    />
  );
}

function BracketNode({
  word,
  rowStart,
  span,
  column,
  placeholder,
}: {
  word: string;
  rowStart: number;
  span: number;
  column: number;
  placeholder: string;
}) {
  return (
    <div
      className="assoc-bracket__node"
      style={{ gridRow: `${rowStart} / span ${span}`, gridColumn: column }}
    >
      {word.trim() || placeholder}
    </div>
  );
}

export function AssociationsTree({
  level1,
  level2,
  level3,
  level4,
  finalWord,
  highlightDuplicates,
}: AssociationsTreeProps) {
  return (
    <div className="assoc-bracket overflow-x-auto pb-2">
      <div
        className="assoc-bracket__grid"
        style={{ gridTemplateRows: `repeat(${ROWS}, minmax(28px, auto))` }}
      >
        {level1.map((word, index) => (
          <div
            key={`leaf-${index}`}
            className="assoc-bracket__leaf"
            style={{ gridRow: index + 1, gridColumn: 1 }}
          >
            {formatLeaf(word, index, highlightDuplicates)}
          </div>
        ))}

        {level2.map((_, index) => (
          <BracketConnector
            key={`c1-${index}`}
            rowStart={index * 2 + 1}
            span={2}
            column={2}
          />
        ))}
        {level2.map((word, index) => (
          <BracketNode
            key={`n2-${index}`}
            word={word}
            rowStart={index * 2 + 1}
            span={2}
            column={3}
            placeholder="Слово"
          />
        ))}

        {level3.map((_, index) => (
          <BracketConnector
            key={`c2-${index}`}
            rowStart={index * 4 + 1}
            span={4}
            column={4}
          />
        ))}
        {level3.map((word, index) => (
          <BracketNode
            key={`n3-${index}`}
            word={word}
            rowStart={index * 4 + 1}
            span={4}
            column={5}
            placeholder="Слово"
          />
        ))}

        {level4.map((_, index) => (
          <BracketConnector
            key={`c3-${index}`}
            rowStart={index * 8 + 1}
            span={8}
            column={6}
          />
        ))}
        {level4.map((word, index) => (
          <BracketNode
            key={`n4-${index}`}
            word={word}
            rowStart={index * 8 + 1}
            span={8}
            column={7}
            placeholder="Слово"
          />
        ))}

        <BracketConnector rowStart={1} span={16} column={8} />
        <BracketNode
          word={finalWord}
          rowStart={1}
          span={16}
          column={9}
          placeholder="Слово-результат"
        />
      </div>
    </div>
  );
}
