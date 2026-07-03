"use client";

import * as React from "react";
import {
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize2,
  User,
  X,
  UserPlus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { useRoots } from "@/lib/roots/store";
import type { Person, Relation } from "@/lib/roots/store";
import {
  PersonForm,
  RELATION_LABEL,
  type PersonDraft,
} from "@/components/roots/person-form";

const CARD_W = 208;
const CARD_H = 150;
const GAP_X = 40;
const ROW_Y: Record<number, number> = { 0: 40, 1: 280, 2: 520, 3: 760 };
const CANVAS_W = 3400;
const CANVAS_H = 980;
const CX = CANVAS_W / 2;

type Pos = { x: number; y: number };

function layout(people: Person[]): Map<string, Pos> {
  const byGen: Record<number, Person[]> = { 0: [], 1: [], 2: [], 3: [] };
  for (const p of people) (byGen[p.gen] ?? (byGen[p.gen] = [])).push(p);
  const pos = new Map<string, Pos>();
  for (const g of [0, 1, 2, 3]) {
    const row = byGen[g] ?? [];
    const total = row.length * CARD_W + Math.max(0, row.length - 1) * GAP_X;
    const start = CX - total / 2 + CARD_W / 2;
    row.forEach((p, i) => {
      pos.set(p.id, { x: start + i * (CARD_W + GAP_X), y: ROW_Y[g] });
    });
  }
  return pos;
}

type Edge = { type: "marriage" | "descent"; from: string; to: string };

/** Accurate family edges: marriages between partners, descent to children. */
function links(people: Person[]): Edge[] {
  const ids = new Set(people.map((p) => p.id));
  const edges: Edge[] = [];
  const seen = new Set<string>();
  for (const p of people) {
    if (p.spouseId && ids.has(p.spouseId)) {
      const key = [p.id, p.spouseId].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ type: "marriage", from: p.id, to: p.spouseId });
      }
    }
    if (p.parentId && ids.has(p.parentId)) {
      edges.push({ type: "descent", from: p.parentId, to: p.id });
    }
  }
  return edges;
}

export function FamilyTree({
  people,
  selectedId,
  onSelect,
}: {
  people: Person[];
  selectedId: string | null;
  onSelect: (p: Person) => void;
}) {
  const { bi } = useTranslation();
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [view, setView] = React.useState({ tx: 0, ty: 0, scale: 0.8 });
  const drag = React.useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null,
  );
  const [addOpen, setAddOpen] = React.useState(false);

  const pos = React.useMemo(() => layout(people), [people]);
  const edges = React.useMemo(() => links(people), [people]);
  const byId = React.useMemo(
    () => new Map(people.map((p) => [p.id, p] as const)),
    [people],
  );

  // Scale + centre so the whole tree fits the viewport.
  const computeFit = React.useCallback(() => {
    const el = wrapRef.current;
    if (!el) return null;
    const { width, height } = el.getBoundingClientRect();
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    pos.forEach((p) => {
      minX = Math.min(minX, p.x - CARD_W / 2);
      maxX = Math.max(maxX, p.x + CARD_W / 2);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y + CARD_H);
    });
    if (!isFinite(minX)) {
      minX = CX - CARD_W / 2;
      maxX = CX + CARD_W / 2;
      minY = 0;
      maxY = CARD_H;
    }
    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const pad = 56;
    const scale = Math.max(
      0.32,
      Math.min(1, (width - pad) / contentW, (height - pad) / contentH),
    );
    const tx = (width - contentW * scale) / 2 - minX * scale;
    const ty = (height - contentH * scale) / 2 - minY * scale;
    return { scale, tx, ty };
  }, [pos]);

  // Fit once on mount.
  React.useEffect(() => {
    const f = computeFit();
    if (f) setView(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-card]")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    setView((v) => ({ ...v, tx: d.tx + dx, ty: d.ty + dy }));
  };
  const endDrag = () => {
    drag.current = null;
  };

  const zoom = (dir: 1 | -1) =>
    setView((v) => ({
      ...v,
      scale: Math.min(1.6, Math.max(0.4, +(v.scale + dir * 0.15).toFixed(2))),
    }));

  const fit = () => {
    const f = computeFit();
    if (f) setView(f);
  };

  return (
    <div className="relative">
      {/* toolbar */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => setAddOpen(true)}
          className="gap-1.5 rounded-full shadow-glow"
        >
          <UserPlus className="h-4 w-4" />
          {bi("Add family", "ಕುಟುಂಬ ಸೇರಿಸಿ")}
        </Button>
        <div className="glass flex items-center gap-1 rounded-full p-1 shadow-soft">
          <IconBtn label={bi("Zoom out", "ಕಿರಿದು")} onClick={() => zoom(-1)}>
            <ZoomOut className="h-4 w-4" />
          </IconBtn>
          <IconBtn label={bi("Fit", "ಹೊಂದಿಸಿ")} onClick={fit}>
            <Maximize2 className="h-4 w-4" />
          </IconBtn>
          <IconBtn label={bi("Zoom in", "ಹಿಗ್ಗಿಸಿ")} onClick={() => zoom(1)}>
            <ZoomIn className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      {/* canvas */}
      <div
        ref={wrapRef}
        className="relative h-[64vh] min-h-[460px] cursor-grab touch-none overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-primary/[0.04] to-transparent active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-60" />
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
          }}
        >
          {/* branches */}
          <svg
            className="pointer-events-none absolute inset-0"
            width={CANVAS_W}
            height={CANVAS_H}
            aria-hidden="true"
          >
            {edges.map((e, i) => {
              const a = pos.get(e.from);
              const b = pos.get(e.to);
              if (!a || !b) return null;

              if (e.type === "marriage") {
                // A short horizontal band between partners (hidden behind the
                // cards, visible in the gap → reads as "married to").
                const y = a.y + CARD_H * 0.5;
                const len = Math.abs(b.x - a.x) + 40;
                return (
                  <path
                    key={`m-${e.from}-${e.to}`}
                    className="roots-link roots-branch"
                    style={
                      {
                        "--len": len,
                        "--delay": `${i * 0.05}s`,
                        strokeWidth: 2.5,
                      } as React.CSSProperties
                    }
                    d={`M ${a.x} ${y} L ${b.x} ${y}`}
                  />
                );
              }

              // Descent: children fall from the couple's midpoint.
              const parent = byId.get(e.from);
              let ox = a.x;
              let oy = a.y + CARD_H;
              if (parent?.spouseId) {
                const sp = pos.get(parent.spouseId);
                if (sp) {
                  ox = (a.x + sp.x) / 2;
                  oy = Math.max(a.y, sp.y) + CARD_H;
                }
              }
              const x2 = b.x;
              const y2 = b.y;
              const my = (oy + y2) / 2;
              const len = Math.hypot(x2 - ox, y2 - oy) + 120;
              return (
                <path
                  key={`d-${e.from}-${e.to}`}
                  className="roots-link roots-branch"
                  style={
                    {
                      "--len": len,
                      "--delay": `${0.2 + i * 0.05}s`,
                    } as React.CSSProperties
                  }
                  d={`M ${ox} ${oy} C ${ox} ${my}, ${x2} ${my}, ${x2} ${y2}`}
                />
              );
            })}
          </svg>

          {/* cards */}
          {people.map((p) => {
            const pt = pos.get(p.id);
            if (!pt) return null;
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                data-card
                onClick={() => onSelect(p)}
                style={{
                  left: pt.x - CARD_W / 2,
                  top: pt.y,
                  width: CARD_W,
                  height: CARD_H,
                }}
                className={cn(
                  "group absolute flex flex-col rounded-2xl border p-3 text-left transition-all duration-300",
                  "glass shadow-soft hover:-translate-y-1 hover:shadow-glow",
                  active
                    ? "border-primary ring-2 ring-primary/40 shadow-glow"
                    : "border-border",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-primary/25 bg-muted">
                    {p.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photo} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-primary/70" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-semibold leading-tight">
                      {p.name}
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-primary/80">
                      {RELATION_LABEL[p.relation](bi)}
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 space-y-0.5 text-xs text-muted-foreground">
                  {(p.village || p.district) && (
                    <div className="truncate">
                      📍 {[p.village, p.district].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {p.occupation && <div className="truncate">🪔 {p.occupation}</div>}
                  {p.birthYear && <div>🕮 {p.birthYear}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* hint */}
        <div className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-muted-foreground">
          {bi("Drag to pan · pinch/zoom buttons", "ಎಳೆದು ಸರಿಸಿ · ಜೂಮ್ ಬಟನ್")}
        </div>
      </div>

      {addOpen && (
        <AddFamilyDialog onClose={() => setAddOpen(false)} />
      )}
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function AddFamilyDialog({ onClose }: { onClose: () => void }) {
  const { bi } = useTranslation();
  const { addPerson } = useRoots();
  const [draft, setDraft] = React.useState<PersonDraft>({ relation: "grandparent" });
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const save = () => {
    if (!valid) return;
    addPerson({
      ...draft,
      relation: (draft.relation as Relation) ?? "relative",
      parentId: null,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={bi("Add a family member", "ಕುಟುಂಬ ಸದಸ್ಯ ಸೇರಿಸಿ")}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass animate-fade-up relative w-full max-w-lg rounded-t-3xl border shadow-glow sm:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          aria-label={bi("Close", "ಮುಚ್ಚಿ")}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="max-h-[86vh] overflow-y-auto p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {bi("Add a family member", "ಕುಟುಂಬ ಸದಸ್ಯ ಸೇರಿಸಿ")}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {bi(
              "Honour an elder, a sibling, or the next generation.",
              "ಹಿರಿಯರು, ಒಡಹುಟ್ಟಿದವರು ಅಥವಾ ಮುಂದಿನ ಪೀಳಿಗೆಯನ್ನು ಗೌರವಿಸಿ.",
            )}
          </p>
          <div className="mt-6">
            <PersonForm
              onChange={(d, v) => {
                setDraft(d);
                setValid(v);
              }}
            />
          </div>
          <Button
            className="mt-6 h-12 w-full gap-2 rounded-full text-base"
            disabled={!valid}
            onClick={save}
          >
            <Plus className="h-4 w-4" />
            {bi("Add to the tree", "ಮರಕ್ಕೆ ಸೇರಿಸಿ")}
          </Button>
        </div>
      </div>
    </div>
  );
}
