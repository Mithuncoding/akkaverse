"""Generate the Akkaverse pitch deck (10 slides) as a polished .pptx.

Run:  python docs/deck/build_deck.py
Output: docs/deck/Akkaverse-Pitch-Deck.pptx
"""

from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Pt

# ---------------------------------------------------------------- brand palette
INK = RGBColor(0x0E, 0x0B, 0x16)        # near-black ink background
INK_2 = RGBColor(0x1A, 0x14, 0x2C)      # panel purple
SAFFRON = RGBColor(0xFF, 0x9F, 0x1C)    # kunkuma saffron (primary accent)
MAGENTA = RGBColor(0xE0, 0x3E, 0x8A)    # festive magenta
TEAL = RGBColor(0x2E, 0xC4, 0xB6)       # peacock teal
CREAM = RGBColor(0xF7, 0xF2, 0xE7)      # cream text
MUTED = RGBColor(0xB9, 0xB0, 0xC8)      # muted lavender text
CARD = RGBColor(0x24, 0x1C, 0x3A)       # card fill

FONT_HEAD = "Georgia"
FONT_BODY = "Segoe UI"

# 16:9 canvas
EMU = 914400
W = int(13.333 * EMU)
H = int(7.5 * EMU)

prs = Presentation()
prs.slide_width = W
prs.slide_height = H
BLANK = prs.slide_layouts[6]


def slide():
    return prs.slides.add_slide(BLANK)


def _no_line(shape):
    shape.line.fill.background()


def bg(s, color=INK):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    r.fill.solid()
    r.fill.fore_color.rgb = color
    _no_line(r)
    r.shadow.inherit = False
    s.shapes._spTree.remove(r._element)
    s.shapes._spTree.insert(2, r._element)
    return r


def band(s, x, y, w, h, color, alpha=None):
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, y, w, h)
    r.fill.solid()
    r.fill.fore_color.rgb = color
    _no_line(r)
    r.shadow.inherit = False
    if alpha is not None:
        _set_alpha(r, alpha)
    return r


def _set_alpha(shape, pct):
    """pct = opacity 0..100."""
    sp = shape.fill._xPr.find(qn("a:solidFill"))
    srgb = sp.find(qn("a:srgbClr"))
    a = srgb.makeelement(qn("a:alpha"), {"val": str(int(pct * 1000))})
    srgb.append(a)


def rounded(s, x, y, w, h, color):
    r = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h)
    r.adjustments[0] = 0.08
    r.fill.solid()
    r.fill.fore_color.rgb = color
    _no_line(r)
    r.shadow.inherit = False
    return r


def text(s, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
         space_after=6, line_spacing=1.0):
    """runs: list of (string, size, color, bold, font, italic)."""
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    for i, item in enumerate(runs):
        txt, size, color, bold, font, italic = (list(item) + [False, FONT_BODY, False])[:6]
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(space_after)
        p.space_before = Pt(0)
        p.line_spacing = line_spacing
        r = p.add_run()
        r.text = txt
        r.font.size = Pt(size)
        r.font.bold = bold
        r.font.italic = italic
        r.font.name = font
        r.font.color.rgb = color
    return tb


def kicker(s, label, color=SAFFRON):
    bar = band(s, Emu(int(0.9 * EMU)), Emu(int(0.86 * EMU)), Emu(int(0.09 * EMU)),
               Emu(int(0.34 * EMU)), color)
    text(s, Emu(int(1.12 * EMU)), Emu(int(0.82 * EMU)), Emu(int(9 * EMU)),
         Emu(int(0.5 * EMU)), [(label, 15, color, True, FONT_BODY)])
    return bar


def dot(s, x, y, color, d=0.12):
    c = s.shapes.add_shape(MSO_SHAPE.OVAL, x, y, Emu(int(d * EMU)), Emu(int(d * EMU)))
    c.fill.solid()
    c.fill.fore_color.rgb = color
    _no_line(c)
    c.shadow.inherit = False
    return c


IN = lambda v: Emu(int(v * EMU))

# ============================================================ SLIDE 1 — TITLE
s = slide()
bg(s)
band(s, 0, 0, IN(0.28), H, SAFFRON)
band(s, IN(0.28), 0, IN(0.10), H, MAGENTA)
# glow panels
band(s, IN(8.4), IN(-1.2), IN(6), IN(6), INK_2)
dot(s, IN(11.1), IN(1.1), SAFFRON, 1.6)
dot(s, IN(10.2), IN(4.9), MAGENTA, 1.1)
dot(s, IN(12.1), IN(3.6), TEAL, 0.7)
text(s, IN(0.95), IN(1.5), IN(9), IN(1),
     [("\u0c85\u0c95\u0ccd\u0c95 \u00b7 AKKAVERSE", 20, TEAL, True, FONT_BODY)])
text(s, IN(0.9), IN(2.2), IN(10.5), IN(2.6),
     [("Preserve. Teach.\nCelebrate.", 66, CREAM, True, FONT_HEAD)],
     line_spacing=1.0)
text(s, IN(0.95), IN(4.75), IN(10.5), IN(1),
     [("A bilingual (English + \u0c95\u0ca8\u0ccd\u0ca8\u0ca1) local-first platform that keeps Kannada "
       "language, family memory, and heritage alive \u2014 one voice at a time.",
       19, MUTED, False, FONT_BODY)], line_spacing=1.15)
text(s, IN(0.95), IN(6.35), IN(11.4), IN(0.7),
     [("akkaverse.vercel.app   \u00b7   github.com/Mithuncoding/akkaverse   \u00b7   "
       "youtu.be/lXtAyZyDumM", 14, SAFFRON, True, FONT_BODY)])

# =========================================================== SLIDE 2 — PROBLEM
s = slide()
bg(s)
kicker(s, "01  \u00b7  THE PROBLEM", MAGENTA)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1.4),
     [("Culture doesn't disappear overnight.\nIt fades one generation at a time.",
       38, CREAM, True, FONT_HEAD)], line_spacing=1.05)
gen = [
    ("\u0c85\u0c9c\u0ccd\u0c9c\u0cbF", "Grandparent", "Speaks Kannada fluently", SAFFRON),
    ("Parent", "Understands", "But rarely speaks it", MAGENTA),
    ("Child", "A few words", "The thread is breaking", TEAL),
]
cx = 0.9
for hd, sub, body, col in gen:
    c = rounded(s, IN(cx), IN(3.2), IN(3.7), IN(2.5), CARD)
    band(s, IN(cx), IN(3.2), IN(3.7), IN(0.14), col)
    text(s, IN(cx + 0.32), IN(3.55), IN(3.1), IN(0.7),
         [(hd, 24, col, True, FONT_HEAD)])
    text(s, IN(cx + 0.32), IN(4.3), IN(3.1), IN(0.6),
         [(sub, 18, CREAM, True, FONT_BODY)])
    text(s, IN(cx + 0.32), IN(4.95), IN(3.1), IN(0.8),
         [(body, 14, MUTED, False, FONT_BODY)])
    cx += 3.95
text(s, IN(0.9), IN(6.15), IN(11.5), IN(1),
     [("When an elder is gone, their voice, blessings, proverbs, recipes and "
       "stories go too. Existing heritage apps are static encyclopedias \u2014 they "
       "store facts, not living family memory.", 16, MUTED, False, FONT_BODY)],
     line_spacing=1.15)

# ========================================================== SLIDE 3 — SOLUTION
s = slide()
bg(s)
kicker(s, "02  \u00b7  THE SOLUTION", SAFFRON)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1.2),
     [("Start with your family \u2014 not a textbook.", 38, CREAM, True, FONT_HEAD)])
steps = [
    ("Preserve", "Capture an elder's words (blessing, story, song, recipe, advice) "
     "in Kannada + English, with their original recording.", SAFFRON),
    ("Teach", "Akkaverse auto-generates a bilingual micro-lesson \u2014 a phrase to "
     "repeat, key vocabulary, and a meaning check for the next generation.", MAGENTA),
    ("Celebrate", "Explore the wider culture with a grounded AI guide, an interactive "
     "map, a cinematic timeline, festivals, stories and quizzes.", TEAL),
]
y = 2.7
for i, (hd, body, col) in enumerate(steps, 1):
    rounded(s, IN(0.9), IN(y), IN(11.5), IN(1.28), CARD)
    d = s.shapes.add_shape(MSO_SHAPE.OVAL, IN(1.2), IN(y + 0.32), IN(0.66), IN(0.66))
    d.fill.solid(); d.fill.fore_color.rgb = col; _no_line(d); d.shadow.inherit = False
    text(s, IN(1.2), IN(y + 0.34), IN(0.66), IN(0.66),
         [(str(i), 24, INK, True, FONT_HEAD)], align=PP_ALIGN.CENTER,
         anchor=MSO_ANCHOR.MIDDLE)
    text(s, IN(2.15), IN(y + 0.16), IN(2.4), IN(1),
         [(hd, 23, col, True, FONT_HEAD)], anchor=MSO_ANCHOR.MIDDLE)
    text(s, IN(4.5), IN(y + 0.12), IN(7.6), IN(1.05),
         [(body, 15, CREAM, False, FONT_BODY)], anchor=MSO_ANCHOR.MIDDLE,
         line_spacing=1.1)
    y += 1.5

# ============================================================ SLIDE 4 — DEMO
s = slide()
bg(s)
kicker(s, "03  \u00b7  PRODUCT DEMO", TEAL)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("Four surfaces. One heritage universe.", 38, CREAM, True, FONT_HEAD)])
cards = [
    ("Ask Akka", "AI guide with cited Wikipedia answers in EN / \u0c95\u0ca8\u0ccd\u0ca8\u0ca1.", SAFFRON),
    ("Voice Legacy", "Preserve a voice \u2192 auto bilingual lesson \u2192 pass it on.", MAGENTA),
    ("Explore Map", "Interactive Karnataka district map + photos.", TEAL),
    ("Timeline", "Cinematic scroll through 2,500 years of history.", SAFFRON),
]
positions = [(0.9, 2.75), (6.75, 2.75), (0.9, 5.0), (6.75, 5.0)]
for (hd, body, col), (px, py) in zip(cards, positions):
    rounded(s, IN(px), IN(py), IN(5.65), IN(1.95), CARD)
    band(s, IN(px), IN(py), IN(0.14), IN(1.95), col)
    text(s, IN(px + 0.4), IN(py + 0.28), IN(5), IN(0.6),
         [(hd, 23, col, True, FONT_HEAD)])
    text(s, IN(px + 0.4), IN(py + 0.98), IN(5), IN(0.9),
         [(body, 15, CREAM, False, FONT_BODY)], line_spacing=1.1)
text(s, IN(0.9), IN(7.02), IN(11.5), IN(0.4),
     [("Fully bilingual  \u00b7  no login  \u00b7  works offline (PWA)", 14, MUTED, True, FONT_BODY)])

# ========================================================= SLIDE 5 — HOW IT WORKS
s = slide()
bg(s)
kicker(s, "04  \u00b7  HOW IT WORKS", SAFFRON)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("Grounded AI \u2014 not a chatbot wrapper.", 38, CREAM, True, FONT_HEAD)])
flow = [
    ("User asks", "EN or \u0c95\u0ca8\u0ccd\u0ca8\u0ca1", MUTED),
    ("Retrieve", "Wikipedia REST\n+ PageImages", TEAL),
    ("Ground", "Inject context\n+ citations", SAFFRON),
    ("NVIDIA NIM", "Llama 3.1 8B \u2192\nNemotron 49B", MAGENTA),
    ("Cited answer", "Streamed with\nsources", TEAL),
]
x = 0.9
for i, (hd, body, col) in enumerate(flow):
    rounded(s, IN(x), IN(2.9), IN(2.15), IN(1.75), CARD)
    band(s, IN(x), IN(2.9), IN(2.15), IN(0.12), col)
    text(s, IN(x + 0.2), IN(3.16), IN(1.8), IN(0.6),
         [(hd, 16, col, True, FONT_BODY)])
    text(s, IN(x + 0.2), IN(3.75), IN(1.8), IN(0.9),
         [(body, 12.5, CREAM, False, FONT_BODY)], line_spacing=1.05)
    if i < len(flow) - 1:
        text(s, IN(x + 2.15), IN(3.35), IN(0.4), IN(0.8),
             [("\u2192", 26, SAFFRON, True, FONT_BODY)], align=PP_ALIGN.CENTER)
    x += 2.42
rounded(s, IN(0.9), IN(5.1), IN(11.5), IN(1.7), INK_2)
text(s, IN(1.25), IN(5.35), IN(11), IN(1.3),
     [("Server-only API key \u2014 never shipped to the browser. Local-first storage: "
       "family data in localStorage, original audio in IndexedDB. Nothing is "
       "uploaded. If the key or network is missing, curated fallbacks still answer.",
       16, CREAM, False, FONT_BODY)], line_spacing=1.2, anchor=MSO_ANCHOR.MIDDLE)

# ============================================================ SLIDE 6 — TECH STACK
s = slide()
bg(s)
kicker(s, "05  \u00b7  TECH STACK & TRUST", TEAL)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("Lean stack. Serious guarantees.", 38, CREAM, True, FONT_HEAD)])
stack = [
    ("Frontend", "Next.js (App Router), React, TypeScript, Tailwind, shadcn/ui"),
    ("AI / LLMs", "NVIDIA NIM \u2014 Llama 3.1 8B \u2192 Nemotron Super 49B (language-aware)"),
    ("Grounding", "Wikipedia REST + PageImages retrieval with citations"),
    ("Voice & OCR", "Keyless Kannada TTS + browser fallback; Tesseract.js in-browser"),
    ("Storage", "localStorage + IndexedDB \u2014 local-first, no login, offline PWA"),
    ("Deploy", "Vercel \u2014 single deployment, one free NIM key, no database"),
]
y = 2.75
for hd, body in stack:
    text(s, IN(0.95), IN(y), IN(2.6), IN(0.5),
         [(hd, 17, SAFFRON, True, FONT_BODY)])
    text(s, IN(3.7), IN(y), IN(8.6), IN(0.5),
         [(body, 16, CREAM, False, FONT_BODY)])
    band(s, IN(0.95), IN(y + 0.52), IN(11.4), IN(0.012), INK_2)
    y += 0.72

# ========================================================== SLIDE 7 — DIFFERENT
s = slide()
bg(s)
kicker(s, "06  \u00b7  WHY IT'S DIFFERENT", MAGENTA)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("Not another encyclopedia app.", 38, CREAM, True, FONT_HEAD)])
diff = [
    ("Family-first", "Begins with your elder's voice, not a textbook.", SAFFRON),
    ("Shows its sources", "Grounded AI cites Wikipedia \u2014 no invented history.", TEAL),
    ("Private by design", "No account, no upload; data stays on your device.", MAGENTA),
    ("Truly bilingual", "Every string in EN, \u0c95\u0ca8\u0ccd\u0ca8\u0ca1, or both at once.", TEAL),
    ("Works offline", "Core pages run without a network (PWA).", SAFFRON),
    ("Zero-friction demo", "No login \u2014 judges use every feature instantly.", MAGENTA),
]
positions = [(0.9, 2.75), (6.75, 2.75), (0.9, 4.05), (6.75, 4.05),
             (0.9, 5.35), (6.75, 5.35)]
for (hd, body, col), (px, py) in zip(diff, positions):
    rounded(s, IN(px), IN(py), IN(5.65), IN(1.1), CARD)
    dot(s, IN(px + 0.32), IN(py + 0.42), col, 0.26)
    text(s, IN(px + 0.85), IN(py + 0.18), IN(4.6), IN(0.5),
         [(hd, 18, col, True, FONT_BODY)])
    text(s, IN(px + 0.85), IN(py + 0.6), IN(4.6), IN(0.5),
         [(body, 13.5, MUTED, False, FONT_BODY)])

# ========================================================= SLIDE 8 — VIABILITY
s = slide()
bg(s)
kicker(s, "07  \u00b7  BUSINESS VIABILITY & SCALE", SAFFRON)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("High margin. Real Karnataka impact.", 38, CREAM, True, FONT_HEAD)])
# scale path
rounded(s, IN(0.9), IN(2.7), IN(11.5), IN(1.05), INK_2)
text(s, IN(1.2), IN(2.72), IN(11), IN(1.05),
     [("Scale path:  Diaspora families  \u2192  Kannada schools & cultural associations  "
       "\u2192  other Indian languages (same engine, swap datasets)",
       16, CREAM, True, FONT_BODY)], anchor=MSO_ANCHOR.MIDDLE)
cols = [
    ("Karnataka angle", "Tourism via the district Explore layer; a discovery surface "
     "for local MSMEs & artisans through festivals and stories.", TEAL),
    ("Cost model", "Near-zero infra \u2014 one Vercel deploy + free NIM tier, no database. "
     "High margin by construction.", SAFFRON),
    ("Revenue", "School / institution licences and an optional opt-in cloud-sync tier "
     "for families across devices.", MAGENTA),
]
x = 0.9
for hd, body, col in cols:
    rounded(s, IN(x), IN(4.0), IN(3.7), IN(2.7), CARD)
    band(s, IN(x), IN(4.0), IN(3.7), IN(0.14), col)
    text(s, IN(x + 0.32), IN(4.32), IN(3.1), IN(0.6),
         [(hd, 18, col, True, FONT_HEAD)])
    text(s, IN(x + 0.32), IN(5.05), IN(3.1), IN(1.5),
         [(body, 14, CREAM, False, FONT_BODY)], line_spacing=1.15)
    x += 3.95

# ============================================================ SLIDE 9 — IMPACT
s = slide()
bg(s)
kicker(s, "08  \u00b7  IMPACT & FEEDBACK", TEAL)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("Every preserved voice becomes a lesson.", 38, CREAM, True, FONT_HEAD)])
stats = [
    ("1 min", "to preserve a voice\nand auto-build a lesson", SAFFRON),
    ("0", "logins, uploads, or\ncredentials required", MAGENTA),
    ("EN + \u0c95\u0ca8\u0ccd\u0ca8\u0ca1", "every screen,\nfully bilingual", TEAL),
]
x = 0.9
for hd, body, col in stats:
    rounded(s, IN(x), IN(2.75), IN(3.7), IN(1.9), CARD)
    text(s, IN(x + 0.3), IN(2.95), IN(3.1), IN(0.9),
         [(hd, 34, col, True, FONT_HEAD)])
    text(s, IN(x + 0.32), IN(3.85), IN(3.2), IN(0.8),
         [(body, 13.5, CREAM, False, FONT_BODY)], line_spacing=1.05)
    x += 3.95
rounded(s, IN(0.9), IN(4.95), IN(11.5), IN(1.75), INK_2)
text(s, IN(1.25), IN(5.15), IN(11), IN(1.4),
     [("Inclusive by design \u2014 usable by non-technical elders on any device. The "
       "preserve-and-teach loop turns a passive \u201csomeday I'll record grandpa\u201d "
       "intention into a finished, shareable bilingual lesson.",
       17, CREAM, False, FONT_BODY),
      ("Add tester quotes / feedback gathered during the build phase here.",
       13, MUTED, False, FONT_BODY, True)],
     line_spacing=1.2, anchor=MSO_ANCHOR.MIDDLE, space_after=8)

# ============================================================ SLIDE 10 — ROADMAP
s = slide()
bg(s)
band(s, 0, 0, IN(0.28), H, SAFFRON)
band(s, IN(0.28), 0, IN(0.10), H, MAGENTA)
kicker(s, "09  \u00b7  6-MONTH ROADMAP & THE ASK", SAFFRON)
text(s, IN(0.9), IN(1.35), IN(11.5), IN(1),
     [("If we had six more months\u2026", 38, CREAM, True, FONT_HEAD)])
road = [
    ("Opt-in cloud sync", "RLS-protected accounts + cross-device audio."),
    ("Voice-cloning narration", "Preserved recordings speak new text in the elder's own voice (with consent)."),
    ("Community oral-history wall", "Moderated public archive of shared voices."),
    ("School mode", "Teacher dashboards + assignments from Voice Legacy lessons."),
    ("Kannada literary retrieval", "Grounding beyond Wikipedia into curated Kannada sources."),
]
y = 2.7
for hd, body in road:
    dot(s, IN(1.0), IN(y + 0.16), SAFFRON, 0.2)
    text(s, IN(1.4), IN(y), IN(4.0), IN(0.6),
         [(hd, 17, CREAM, True, FONT_BODY)])
    text(s, IN(5.4), IN(y), IN(6.9), IN(0.6),
         [(body, 15, MUTED, False, FONT_BODY)])
    y += 0.62
rounded(s, IN(0.9), IN(6.05), IN(11.5), IN(1.0), INK_2)
text(s, IN(1.25), IN(6.07), IN(11), IN(1.0),
     [("The ask:  a pilot with a Kannada school or cultural association \u2014 and support "
       "to bring family heritage preservation to every diaspora home.",
       16, SAFFRON, True, FONT_BODY)], anchor=MSO_ANCHOR.MIDDLE)

# --------------------------------------------------------------------- save
out = Path(__file__).with_name("Akkaverse-Pitch-Deck.pptx")
prs.save(out)
print(f"Saved {out}  ({len(prs.slides.__iter__.__self__._sldIdLst)} slides)")
