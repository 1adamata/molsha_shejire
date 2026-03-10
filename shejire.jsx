import { useState, useRef } from "react";

const familyData = {
  id: "molsha",
  name: "Молша",
  spouse: "Қатша",
  years: "18**–1946",
  spouseYears: "18**–19**",
  generation: 0,
  children: [
    {
      id: "baken",
      name: "Бәкен",
      spouse: "Тәң Омар",
      years: "1900–1975",
      spouseYears: "1907–1985",
      tribe: "Айдабол",
      generation: 1,
      children: [
        {
          id: "abdiqapar",
          name: "Әбдіқапар",
          spouse: "Майра",
          years: "1938–2007",
          spouseYears: "1943–2020",
          tribe: "Айдабол",
          generation: 2,
          children: [
            {
              id: "qarlygash",
              name: "Қарлығаш",
              spouse: "Арсен",
              years: "1961",
              spouseYears: "1957–2010",
              tribe: "Қозған",
              gender: "f",
              generation: 3,
              children: [
                { id: "aruzhan", name: "Аружан", years: "1999", generation: 4 },
                {
                  id: "sanzhar",
                  name: "Санжар",
                  spouse: "Эльмира",
                  years: "2003",
                  spouseYears: "2004",
                  tribe: "Дәулет",
                  generation: 4,
                  children: [
                    { id: "tomiris", name: "Томирис", years: "2024", generation: 5 },
                  ],
                },
                { id: "abulhair", name: "Абулхаир", years: "2008", generation: 4 },
                { id: "inkar", name: "Іңкәр", years: "2010", generation: 4 },
              ],
            },
            {
              id: "muhtar",
              name: "Мұхтар",
              spouse: "Нұрбану",
              years: "1964",
              spouseYears: "1965",
              tribe: "Қаржас",
              generation: 3,
              children: [
                { id: "aldiyar", name: "Алдияр", years: "1998", generation: 4 },
                { id: "aisana", name: "Айсана", years: "2000", generation: 4 },
                { id: "alnur", name: "Алнұр", years: "2006", generation: 4 },
                { id: "aisultan", name: "Айсұлтан", years: "2012", generation: 4 },
              ],
            },
            {
              id: "asqar",
              name: "Асқар",
              spouse: "Меруерт",
              years: "1967",
              spouseYears: "1968",
              tribe: "Қаржас",
              generation: 3,
              children: [
                { id: "muhamedrakhim", name: "Мұхамедрахим", years: "2013", generation: 4 },
                { id: "ibrahim", name: "Ибрагим", years: "2016", generation: 4 },
                { id: "kausar", name: "Кәусар", years: "2016", generation: 4 },
                { id: "ahmet", name: "Ахмет", years: "2025", generation: 4 },
              ],
            },
            { id: "anar1", name: "Анар", years: "1969", gender: "f", generation: 3 },
            {
              id: "aitmuhamed",
              name: "Айтмұхамед",
              spouse: "Гүлнар",
              years: "1972",
              spouseYears: "1971",
              tribe: "Тұлпар",
              generation: 3,
              children: [
                { id: "aisar", name: "Айсар", years: "2017", generation: 4 },
                { id: "rabiya", name: "Рабия", years: "2019", generation: 4 },
                { id: "balausa", name: "Балауса", years: "2021", generation: 4 },
              ],
            },
            {
              id: "nurzhan",
              name: "Нұржан",
              spouse: "Алуа",
              years: "1976",
              spouseYears: "1976",
              tribe: "Айдабол",
              generation: 3,
              highlight: true,
              children: [
                {
                  id: "aidana",
                  name: "Айдана",
                  spouse: "Асхат",
                  years: "1992",
                  spouseYears: "1988",
                  tribe: "Орманшы",
                  gender: "f",
                  generation: 4,
                  children: [
                    { id: "aizara", name: "Айзара", years: "2013", generation: 5 },
                    { id: "nurislam", name: "Нұрислам", years: "2015", generation: 5 },
                    { id: "khasim", name: "Хасим", years: "2023", generation: 5 },
                  ],
                },
                {
                  id: "adiya",
                  name: "Адия",
                  spouse: "Ерлан",
                  years: "1996",
                  spouseYears: "1988",
                  tribe: "Найман",
                  gender: "f",
                  generation: 4,
                  children: [
                    { id: "ahmadi", name: "Ахмади", years: "2024", generation: 5 },
                    { id: "ailana", name: "Айлана", years: "2026", generation: 5 },
                  ],
                },
                { id: "zhanell", name: "Жанель", years: "2003", gender: "f", generation: 4 },
                {
                  id: "nurassyl",
                  name: "Нұрасыл",
                  years: "2005",
                  generation: 4,
                  isUser: true,
                },
              ],
            },
            {
              id: "aigerim",
              name: "Айгерім",
              spouse: "Мұрат",
              years: "1985",
              spouseYears: "1983",
              tribe: "Шапырашты",
              gender: "f",
              generation: 3,
              children: [],
            },
            {
              id: "mashur",
              name: "Машур",
              spouse: "Айнұр",
              years: "1989",
              spouseYears: "1990",
              tribe: "Беріш",
              generation: 3,
              children: [],
            },
            {
              id: "qanysh",
              name: "Қаныш",
              spouse: "Анар",
              years: "1989",
              spouseYears: "1988",
              tribe: "Уақ",
              generation: 3,
              children: [],
            },
            { id: "bibinur", name: "Бибінұр", years: "1992", gender: "f", generation: 3 },
            {
              id: "samal",
              name: "Самал",
              spouse: "Вадим",
              years: "1994",
              spouseYears: "1994",
              tribe: "Өзгеұлт",
              gender: "f",
              generation: 3,
              children: [],
            },
          ],
        },
        {
          id: "shamshipanu",
          name: "Шәмшіпәну",
          years: "",
          generation: 2,
          gender: "f",
        },
        {
          id: "zhanat",
          name: "Жанат",
          years: "",
          generation: 2,
        },
      ],
    },
    {
      id: "ybyrai",
      name: "Ыбырай",
      spouse: "Күлшіра",
      years: "18**–19**",
      spouseYears: "18**–19**",
      tribe: "Қозған",
      generation: 1,
      children: [],
    },
    {
      id: "zhanabai",
      name: "Жаңабай",
      spouse: "Рая",
      years: "19**–19**",
      spouseYears: "19**–19**",
      tribe: "Өзгеұлт",
      generation: 1,
      children: [],
    },
    {
      id: "kulshim",
      name: "Күлшім",
      spouse: "Қали",
      years: "19**–19**",
      spouseYears: "19**–19**",
      gender: "f",
      generation: 1,
      children: [],
    },
  ],
};

const GEN_COLORS = [
  { bg: "#1a1410", border: "#c9a84c", text: "#c9a84c" },
  { bg: "#1e1814", border: "#b8944a", text: "#d4b66a" },
  { bg: "#221c16", border: "#a68040", text: "#c9a555" },
  { bg: "#261f18", border: "#947038", text: "#b89448" },
  { bg: "#2a221a", border: "#826030", text: "#a6833c" },
  { bg: "#2e2520", border: "#705028", text: "#947030" },
];

function PersonCard({ person, isExpanded, onToggle, depth }) {
  const hasChildren = person.children && person.children.length > 0;
  const gc = GEN_COLORS[Math.min(person.generation, 5)];
  const isDeceased =
    person.years &&
    person.years.includes("–") &&
    !person.years.endsWith("–") &&
    person.years.split("–")[1] !== "";
  const spouseDeceased =
    person.spouseYears &&
    person.spouseYears.includes("–") &&
    !person.spouseYears.endsWith("–") &&
    person.spouseYears.split("–")[1] !== "";

  return (
    <div
      onClick={(e) => {
        if (hasChildren) {
          e.stopPropagation();
          onToggle(person.id);
        }
      }}
      style={{
        background: person.isUser
          ? "linear-gradient(135deg, #2a1f10 0%, #3d2a10 100%)"
          : gc.bg,
        border: `1.5px solid ${person.isUser ? "#e8c34a" : gc.border}`,
        borderRadius: "10px",
        padding: "10px 14px",
        cursor: hasChildren ? "pointer" : "default",
        position: "relative",
        minWidth: "140px",
        maxWidth: "220px",
        boxShadow: person.isUser
          ? "0 0 20px rgba(232,195,74,0.3), inset 0 1px 0 rgba(232,195,74,0.15)"
          : `0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "all 0.25s ease",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = person.isUser
          ? "0 0 28px rgba(232,195,74,0.45), inset 0 1px 0 rgba(232,195,74,0.2)"
          : "0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = person.isUser
          ? "0 0 20px rgba(232,195,74,0.3), inset 0 1px 0 rgba(232,195,74,0.15)"
          : "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      {person.isUser && (
        <div
          style={{
            position: "absolute",
            top: "-9px",
            right: "10px",
            background: "#e8c34a",
            color: "#1a1410",
            fontSize: "9px",
            fontWeight: 700,
            padding: "1px 8px",
            borderRadius: "4px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Сіз
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: person.isUser ? "#e8c34a" : gc.text,
            letterSpacing: "0.3px",
          }}
        >
          {person.name}
        </span>
        {isDeceased && (
          <span style={{ fontSize: "9px", color: "#665a48", fontStyle: "italic" }}>✝</span>
        )}
      </div>

      {person.spouse && (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "2px" }}>
          <span style={{ fontSize: "10px", color: "#665a48" }}>∞</span>
          <span
            style={{
              fontSize: "13px",
              color: person.isUser ? "#c9a84c" : "#a89070",
              fontStyle: "italic",
            }}
          >
            {person.spouse}
          </span>
          {spouseDeceased && (
            <span style={{ fontSize: "9px", color: "#665a48", fontStyle: "italic" }}>✝</span>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px", flexWrap: "wrap" }}>
        {person.years && (
          <span style={{ fontSize: "10px", color: "#7a6e5e", fontFamily: "'JetBrains Mono', monospace" }}>
            {person.years}
          </span>
        )}
        {person.tribe && (
          <span
            style={{
              fontSize: "9px",
              color: "#8a7a62",
              background: "rgba(201,168,76,0.1)",
              padding: "1px 6px",
              borderRadius: "3px",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {person.tribe}
          </span>
        )}
      </div>

      {hasChildren && (
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: gc.bg,
            border: `1px solid ${gc.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            color: gc.text,
            zIndex: 2,
          }}
        >
          {isExpanded ? "−" : "+"}
        </div>
      )}
    </div>
  );
}

function TreeNode({ person, expanded, onToggle, depth = 0 }) {
  const isExp = expanded[person.id] !== false;
  const hasChildren = person.children && person.children.length > 0;
  const parentColor = GEN_COLORS[Math.min(person.generation, 5)].border;
  const childColor = GEN_COLORS[Math.min(person.generation + 1, 5)].border;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <PersonCard person={person} isExpanded={isExp} onToggle={onToggle} depth={depth} />

      {hasChildren && isExp && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "28px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "2px",
              height: "22px",
              background: `linear-gradient(to bottom, ${parentColor}, ${childColor})`,
              opacity: 0.55,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "18px",
              paddingTop: "18px",
            }}
          >
            {person.children.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: `calc(50% / ${person.children.length})`,
                  right: `calc(50% / ${person.children.length})`,
                  height: "2px",
                  background: childColor,
                  opacity: 0.4,
                }}
              />
            )}

            {person.children.map((child) => (
              <div
                key={child.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {person.children.length > 1 && (
                  <div
                    style={{
                      width: "2px",
                      height: "18px",
                      background: childColor,
                      opacity: 0.4,
                    }}
                  />
                )}

                <TreeNode
                  person={child}
                  expanded={expanded}
                  onToggle={onToggle}
                  depth={depth + 1}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function countDescendants(node) {
  if (!node.children || node.children.length === 0) return 0;
  return node.children.reduce((sum, c) => sum + 1 + countDescendants(c), 0);
}

export default function ShejireTree() {
  const [expanded, setExpanded] = useState({
    molsha: true,
    baken: true,
    abdiqapar: true,
    ybyrai: true,
    zhanabai: true,
    kulshim: true,
  });

  const containerRef = useRef(null);

  const toggleNode = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: prev[id] === false ? true : false }));
  };

  const expandAll = () => {
    const allIds = {};
    const walk = (node) => {
      allIds[node.id] = true;
      if (node.children) node.children.forEach(walk);
    };
    walk(familyData);
    setExpanded(allIds);
  };

  const collapseAll = () => {
    setExpanded({
      molsha: true,
      baken: true,
      ybyrai: true,
      zhanabai: true,
      kulshim: true,
    });
  };

  const total = countDescendants(familyData) + 1;

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0d0b08 0%, #15120e 40%, #1a1610 100%)",
        minHeight: "100vh",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        color: "#d4c4a0",
        overflow: "auto",
      }}
    >
      {/* Background ornament */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.03) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.02) 0%, transparent 50%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "linear-gradient(to bottom, #0d0b08 0%, #0d0b08ee 70%, transparent 100%)",
          padding: "24px 32px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#8a7a5a",
            marginBottom: "8px",
          }}
        >
          Отбасылық Шежіре
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700,
            color: "#c9a84c",
            margin: "0 0 6px",
            letterSpacing: "2px",
            textShadow: "0 0 30px rgba(201,168,76,0.2)",
          }}
        >
          Молша — Қатша
        </h1>
        <div
          style={{
            width: "60px",
            height: "1.5px",
            background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
            margin: "12px auto",
          }}
        />
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "#7a6e5e" }}>
            {total} адам · 6 ұрпақ
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={expandAll}
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#c9a84c",
                padding: "4px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(201,168,76,0.2)")}
              onMouseLeave={(e) => (e.target.style.background = "rgba(201,168,76,0.1)")}
            >
              Барлығын ашу
            </button>
            <button
              onClick={collapseAll}
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#c9a84c",
                padding: "4px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(201,168,76,0.2)")}
              onMouseLeave={(e) => (e.target.style.background = "rgba(201,168,76,0.1)")}
            >
              Жабу
            </button>
          </div>
        </div>
      </div>

      {/* Tree */}
      <div
        ref={containerRef}
        style={{
          overflowX: "auto",
          overflowY: "auto",
          padding: "0 32px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            minWidth: "100%",
            paddingBottom: "40px",
          }}
        >
          <TreeNode person={familyData} expanded={expanded} onToggle={toggleNode} />
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          background: "rgba(13,11,8,0.92)",
          border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "10px",
          color: "#7a6e5e",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          backdropFilter: "blur(8px)",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px" }}>∞</span> <span>жұбайы</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "9px", fontStyle: "italic" }}>✝</span> <span>қайтыс болған</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "3px",
              border: "1px solid #e8c34a",
              background: "#3d2a10",
            }}
          />
          <span>сіз</span>
        </div>
      </div>
    </div>
  );
}
