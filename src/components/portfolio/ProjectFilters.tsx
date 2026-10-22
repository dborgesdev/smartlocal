export default function ProjectFilters({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  const labels: Record<string, string> = { Institucional: "Institucionais" };
  return (
    <div
      className="project-filters"
      role="group"
      aria-label="Filtrar projetos por categoria"
    >
      {["Todos", ...categories].map((category) => (
        <button
          key={category}
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {labels[category] || category}
        </button>
      ))}
    </div>
  );
}
