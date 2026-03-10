import { useCallback, useMemo, useRef, useState } from "react";
import treeData from "./family-tree.json";

// ─── Colors ───
const C = {
  crimson: "#8B1538",
  navy: "#1B365D",
  white: "#ffffff",
  bg: "#f8f8f6",
  black: "#000000",
  gray100: "#f5f5f5",
  gray200: "#e5e5e5",
  gray300: "#d1d1d1",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
};

// ─── Layout Constants ───
const CARD_W = 190;
const MARRIAGE_W = 66;

// ─── Editorial Person Card ───
function PersonCard({ person, onClick, isSelected }) {
  const isDeceased =
    person?.years &&
    person.years.includes("–") &&
    person.years.split("–")[1] &&
    person.years.split("–")[1] !== "";

  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(person)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: CARD_W,
        background: C.white,
        border: `2px solid ${hovered || isSelected ? C.black : C.gray300}`,
        padding: "28px 16px 16px",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: isSelected ? `0 0 0 3px ${C.navy}` : "none",
        fontFamily: "inherit",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: isSelected ? C.navy : C.crimson,
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontFamily: "'Advent Pro', sans-serif",
              fontWeight: 600,
              lineHeight: 1.2,
              color: C.black,
              marginBottom: 6,
            }}
          >
            {person.name}
          </div>
          {person.years && (
            <div
              style={{
                fontSize: 13,
                color: C.gray600,
                letterSpacing: "0.02em",
              }}
            >
              {person.years}
            </div>
          )}
        </div>
        {isDeceased && (
          <span style={{ fontSize: 24, color: C.gray400, lineHeight: 1, marginLeft: 8 }}>†</span>
        )}
      </div>

      {person.ru && (
        <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              color: C.gray700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              border: `1px solid ${C.gray300}`,
              background: C.gray100,
              padding: "3px 10px",
            }}
          >
            {person.ru}
          </span>
        </div>
      )}
    </button>
  );
}

// ─── Single Person Node ───
function SinglePersonNode({ person, onPersonClick, selectedPerson }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PersonCard
        person={person}
        onClick={onPersonClick}
        isSelected={selectedPerson?.id === person.id}
      />
    </div>
  );
}

// ─── Couple Node ───
function CoupleNode({ husband, wife, children, expanded, toggle, onPersonClick, selectedPerson, unionId }) {
  const nodeId = `${husband?.id || "unknown"}_${wife?.id || "unknown"}`;
  const isOpen = expanded[nodeId] === true;
  const hasChildren = children && children.length > 0;
  const coupleRef = useRef(null);
  const primaryPerson = husband || wife;
  const hasBothSpouses = Boolean(husband && wife);
  const rowWidth = hasBothSpouses ? CARD_W * 2 + MARRIAGE_W : CARD_W;

  // Determine bloodline descendant based on union ID convention
  const husbandIsDescendant = unionId?.startsWith(husband?.id + "_");
  const wifeIsDescendant = !husbandIsDescendant && unionId?.startsWith(wife?.id + "_");
  const isRoot = !husbandIsDescendant && !wifeIsDescendant;
  const descendCX = hasBothSpouses
    ? husbandIsDescendant
      ? CARD_W / 2
      : CARD_W + MARRIAGE_W + CARD_W / 2
    : CARD_W / 2;
  const coupleCX = rowWidth / 2;
  const connectorLeft = Math.min(descendCX, coupleCX);
  const connectorWidth = Math.abs(descendCX - coupleCX);

  const handleToggle = useCallback(() => {
    const wasOpen = isOpen;
    toggle(nodeId);
    if (wasOpen) {
      // After collapsing, wait for DOM update then scroll the couple into center
      setTimeout(() => {
        coupleRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }, 50);
    }
  }, [isOpen, nodeId, toggle]);

  return (
    <div ref={coupleRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {/* L-shaped connector from parent line to bloodline descendant */}
      {!isRoot && (
        <div style={{ position: "relative", width: rowWidth, height: 10 }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: connectorLeft,
            width: connectorWidth,
            height: 2,
            background: C.black,
          }} />
          <div style={{
            position: "absolute",
            top: 0,
            left: descendCX - 1,
            width: 2,
            height: 10,
            background: C.black,
          }} />
        </div>
      )}

      {/* Couple row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0, position: "relative" }}>
        {hasBothSpouses ? (
          <>
            <PersonCard
              person={husband}
              onClick={onPersonClick}
              isSelected={selectedPerson?.id === husband.id}
            />

            {/* Marriage connection line with diamond */}
            <div style={{ display: "flex", alignItems: "center", paddingTop: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ width: 28, height: 2, background: C.black }} />
                <div
                  style={{
                    width: 10,
                    height: 10,
                    background: C.crimson,
                    transform: "rotate(45deg)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ width: 28, height: 2, background: C.black }} />
              </div>
            </div>

            <PersonCard
              person={wife}
              onClick={onPersonClick}
              isSelected={selectedPerson?.id === wife.id}
            />
          </>
        ) : (
          <PersonCard
            person={primaryPerson}
            onClick={onPersonClick}
            isSelected={selectedPerson?.id === primaryPerson?.id}
          />
        )}
      </div>

      {/* Expand/Collapse toggle */}
      {hasChildren && (
        <button
          onClick={handleToggle}
          style={{
            marginTop: 10,
            background: C.white,
            border: `2px solid ${C.black}`,
            color: C.black,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "4px 14px",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.black; e.target.style.color = C.white; }}
          onMouseLeave={(e) => { e.target.style.background = C.white; e.target.style.color = C.black; }}
        >
          {isOpen ? "Свернуть" : "Открыть"}
        </button>
      )}

      {/* Children */}
      {hasChildren && isOpen && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
          {/* Vertical line from couple down */}
          <div style={{ width: 2, height: 30, background: C.black }} />

          {/* Children container */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-start", gap: 24, paddingTop: children.length > 1 ? 20 : 0 }}>
            {/* Horizontal bar connecting children */}
            {children.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 80,
                  right: 80,
                  height: 2,
                  background: C.black,
                }}
              />
            )}

            {children.map((child) => (
              <div
                key={child.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
              >
                {/* Vertical line from bar to child */}
                <div style={{ width: 2, height: 20, background: C.black }} />
                <FamilyNode
                  node={child}
                  expanded={expanded}
                  toggle={toggle}
                  onPersonClick={onPersonClick}
                  selectedPerson={selectedPerson}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Family Node Dispatcher ───
function FamilyNode({ node, expanded, toggle, onPersonClick, selectedPerson }) {
  if (node.type === "person" || (!node.type && node.name)) {
    return <SinglePersonNode person={node} onPersonClick={onPersonClick} selectedPerson={selectedPerson} />;
  }

  if (node.type === "union") {
    return (
      <CoupleNode
        unionId={node.id}
        husband={node.husband}
        wife={node.wife}
        children={node.children || []}
        expanded={expanded}
        toggle={toggle}
        onPersonClick={onPersonClick}
        selectedPerson={selectedPerson}
      />
    );
  }

  return null;
}

function collectUnionIds(node, acc = []) {
  if (!node) return acc;
  if (node.type === "union") {
    const id = `${node.husband?.id || "unknown"}_${node.wife?.id || "unknown"}`;
    acc.push(id);
  }
  if (node.children) {
    node.children.forEach((child) => collectUnionIds(child, acc));
  }
  return acc;
}

function countPeople(node) {
  if (!node) return 0;

  if (node.type === "person") return 1;

  if (node.type === "union") {
    let total = 0;
    if (node.husband) total += 1;
    if (node.wife) total += 1;
    if (node.children) {
      total += node.children.reduce((sum, child) => sum + countPeople(child), 0);
    }
    return total;
  }

  return 0;
}

// ─── Detail Sidebar ───
function DetailSidebar({ person, onClose }) {
  if (!person) {
    return (
      <div style={{ textAlign: "center", color: C.gray400, marginTop: 80 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px", opacity: 0.3 }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.6 }}>
          Таңдаңыз<br />мүшені көру үшін
        </p>
      </div>
    );
  }

  const isDeceased =
    person?.years &&
    person.years.includes("–") &&
    person.years.split("–")[1] &&
    person.years.split("–")[1] !== "";

  return (
    <div>
      {/* Avatar */}
      <div
        style={{
          width: 100,
          height: 100,
          background: `linear-gradient(135deg, ${C.navy}, ${C.crimson})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* Name */}
      <h2
        style={{
          fontFamily: "'Advent Pro', sans-serif",
          fontSize: 26,
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 6,
          color: C.black,
        }}
      >
        {person.name}
      </h2>

      {/* Years */}
      {person.years && (
        <p style={{ textAlign: "center", color: C.gray600, fontSize: 16, marginBottom: 16 }}>
          {person.years}
          {isDeceased && " †"}
        </p>
      )}

      {/* Details */}
      <div style={{ borderTop: `2px solid ${C.gray200}`, paddingTop: 20, marginTop: 20 }}>
        {person.ru && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: C.gray500, marginBottom: 6 }}>
              Ру / Тайпа
            </h3>
            <p style={{ fontSize: 16, fontFamily: "'Advent Pro', sans-serif", fontWeight: 500, color: C.black }}>
              {person.ru}
            </p>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: C.gray500, marginBottom: 6 }}>
            Мәліметтер
          </h3>
          <p style={{ fontSize: 13, color: C.gray700, lineHeight: 1.6 }}>
            {person.bio || `${person.name} — біздің отбасы тарихымыздың маңызды мүшесі.`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Search Icon SVG ───
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ─── User Icon SVG ───
function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function ShejireTree() {
  const initialExpanded = useMemo(() => {
    const rootId = `${treeData.husband?.id || "unknown"}_${treeData.wife?.id || "unknown"}`;
    return { [rootId]: true };
  }, []);

  const [expanded, setExpanded] = useState(initialExpanded);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const ids = collectUnionIds(treeData);
    setExpanded(Object.fromEntries(ids.map((id) => [id, true])));
  };

  const collapseAll = () => {
    const rootId = `${treeData.husband.id}_${treeData.wife.id}`;
    setExpanded({ [rootId]: true });
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setIsSidebarOpen(true);
  };

  const totalPeople = countPeople(treeData);
  const totalGenerations = 4;

  return (
    <div
      style={{
        height: "100vh",
        background: C.white,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Accent Strip ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, ${C.crimson}, ${C.navy}, ${C.crimson})`,
          zIndex: 50,
        }}
      />

      {/* ── Header ── */}
      <header
        style={{
          borderBottom: `2px solid ${C.black}`,
          padding: "18px 40px",
          background: C.white,
          flexShrink: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left: Title */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: C.navy,
                marginBottom: 4,
              }}
            >
              ОТБАСЫЛЫҚ ШЕЖІРЕ
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                fontFamily: "'Advent Pro', sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: C.black,
              }}
            >
              Молша — Қатша
            </h1>
          </div>

          {/* Right: Stats + Controls */}
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {/* Stats */}
            <div style={{ textAlign: "right", borderRight: `2px solid ${C.black}`, paddingRight: 20 }}>
              <p style={{ fontSize: 26, fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, margin: 0, lineHeight: 1, color: C.black }}>{totalPeople}</p>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.gray600, marginTop: 2 }}>Мүшелер</p>
            </div>
            <div style={{ textAlign: "right", paddingRight: 20 }}>
              <p style={{ fontSize: 26, fontFamily: "'Advent Pro', sans-serif", fontWeight: 600, margin: 0, lineHeight: 1, color: C.black }}>{totalGenerations}</p>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.gray600, marginTop: 2 }}>Ұрпақ</p>
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.gray400 }}>
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Іздеу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: 200,
                  paddingLeft: 32,
                  paddingRight: 10,
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: `2px solid ${C.gray300}`,
                  fontSize: 13,
                  fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.black)}
                onBlur={(e) => (e.target.style.borderColor = C.gray300)}
              />
            </div>

            {/* Expand / Collapse */}
            <button
              onClick={expandAll}
              style={{
                padding: "7px 14px",
                border: `2px solid ${C.black}`,
                background: C.white,
                color: C.black,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.target.style.background = C.black; e.target.style.color = C.white; }}
              onMouseLeave={(e) => { e.target.style.background = C.white; e.target.style.color = C.black; }}
            >
              Ашу
            </button>
            <button
              onClick={() => {
                collapseAll();
                // Scroll tree canvas back to center after full collapse
                requestAnimationFrame(() => {
                  const canvas = document.getElementById('tree-canvas');
                  if (canvas) {
                    canvas.scrollTo({ left: (canvas.scrollWidth - canvas.clientWidth) / 2, top: 0, behavior: 'smooth' });
                  }
                });
              }}
              style={{
                padding: "7px 14px",
                border: `2px solid ${C.black}`,
                background: C.white,
                color: C.black,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.target.style.background = C.black; e.target.style.color = C.white; }}
              onMouseLeave={(e) => { e.target.style.background = C.white; e.target.style.color = C.black; }}
            >
              Жасыру
            </button>

            {/* Details toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: "7px 14px",
                border: `2px solid ${C.black}`,
                background: isSidebarOpen ? C.black : C.white,
                color: isSidebarOpen ? C.white : C.black,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <UserIcon />
              {isSidebarOpen ? "Жабу" : "Мәлімет"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {/* Tree Canvas */}
        <div
          id="tree-canvas"
          style={{
            flex: 1,
            overflow: "auto",
            background: C.bg,
            minWidth: 0,
          }}
        >
          <div
            style={{
              minWidth: "max-content",
              display: "inline-flex",
              justifyContent: "center",
              padding: "60px 40px 60px",
              minHeight: "100%",
            }}
          >
            <FamilyNode
              node={treeData}
              expanded={expanded}
              toggle={toggle}
              onPersonClick={handlePersonClick}
              selectedPerson={selectedPerson}
            />
          </div>
        </div>

        {/* ── Collapsible Sidebar ── */}
        {isSidebarOpen && (
          <div
            style={{
              width: 340,
              background: C.white,
              borderLeft: `2px solid ${C.black}`,
              overflowY: "auto",
              flexShrink: 0,
              padding: 28,
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${C.gray300}`,
                background: C.white,
                cursor: "pointer",
                fontSize: 14,
                color: C.gray600,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = C.black)}
              onMouseLeave={(e) => (e.target.style.borderColor = C.gray300)}
            >
              ✕
            </button>
            <DetailSidebar person={selectedPerson} onClose={() => setIsSidebarOpen(false)} />
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          flexShrink: 0,
          background: C.white,
          borderTop: `2px solid ${C.black}`,
          padding: "12px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: C.gray600,
          zIndex: 30,
        }}
      >
        <div>Біздің Шежіре © 2026</div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span>Modern Editorial Heritage</span>
          <span>•</span>
          <span>Молша — Қатша</span>
        </div>
      </div>
    </div>
  );
}
