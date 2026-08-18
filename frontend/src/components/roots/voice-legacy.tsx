"use client";

import * as React from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  CircleStop,
  Cloud,
  Heart,
  Lightbulb,
  Link2,
  Loader2,
  Lock,
  Mic,
  Music2,
  Plus,
  Quote,
  Share2,
  Sparkles,
  Trash2,
  Upload,
  Users,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { VoiceLesson } from "@/components/roots/voice-lesson";
import { VoicePlayer } from "@/components/roots/voice-player";
import { useTranslation } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";
import {
  useRoots,
  type Person,
  type VoiceCapsule,
  type VoiceCapsuleVisibility,
  type VoiceLegacyKind,
} from "@/lib/roots/store";
import {
  canRecordVoice,
  deleteVoiceAudio,
  getVoiceAudio,
  saveVoiceAudio,
} from "@/lib/roots/voice-audio";
import {
  deleteCloudVoice,
  signedVoiceUrl,
  uploadVoiceToCloud,
} from "@/lib/roots/voice-cloud";
import {
  buildVoiceLegacyUrl,
  capsuleSharePayload,
} from "@/lib/roots/voice-share";
import { useAuth } from "@/components/auth/auth-provider";

const KIND_META: Record<
  VoiceLegacyKind,
  { icon: LucideIcon; en: string; kn: string }
> = {
  blessing: { icon: Heart, en: "Blessing", kn: "ಆಶೀರ್ವಾದ" },
  proverb: { icon: Quote, en: "Proverb", kn: "ಗಾದೆ" },
  story: { icon: BookOpen, en: "Story", kn: "ಕಥೆ" },
  song: { icon: Music2, en: "Song", kn: "ಹಾಡು" },
  recipe: { icon: Utensils, en: "Recipe", kn: "ಪಾಕವಿಧಾನ" },
  advice: { icon: Lightbulb, en: "Advice", kn: "ಸಲಹೆ" },
};

const VISIBILITY_META: Record<
  VoiceCapsuleVisibility,
  { icon: LucideIcon; en: string; kn: string }
> = {
  private: { icon: Lock, en: "Only this device", kn: "ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ" },
  family: { icon: Users, en: "Family link", kn: "ಕುಟುಂಬದ ಲಿಂಕ್" },
  community: { icon: Cloud, en: "Community review", kn: "ಸಮುದಾಯ ಪರಿಶೀಲನೆ" },
};

const inputClass =
  "w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-base outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/15";

function demoWords(person: Person): { title: string; kannada: string; english: string } {
  const place = [person.village, person.district].filter(Boolean).join(", ");
  return {
    title: `A blessing from ${person.name}`,
    kannada:
      `ನನ್ನ ಪ್ರೀತಿಯ ಮಕ್ಕಳೇ, ನೀವು ಎಲ್ಲೇ ಬದುಕಿದರೂ ನಿಮ್ಮ ಬೇರುಗಳನ್ನು ಮರೆಯಬೇಡಿ. ` +
      `${place || "ನಮ್ಮ ಊರಿನ"} ಮಣ್ಣು, ನಮ್ಮ ಮನೆಯ ಪ್ರೀತಿ ಮತ್ತು ಕನ್ನಡದ ನುಡಿ ` +
      "ನಿಮ್ಮೊಳಗೆ ಸದಾ ಜೀವಂತವಾಗಿರಲಿ. ಒಬ್ಬರನ್ನೊಬ್ಬರು ಕಾಪಾಡಿಕೊಳ್ಳಿ, ನಮ್ಮ ಕಥೆಯನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಹೇಳಿ. ನನ್ನ ಆಶೀರ್ವಾದ ಸದಾ ನಿಮ್ಮೊಂದಿಗಿದೆ.",
    english:
      `My dear children, wherever you live, never forget your roots. May the ` +
      `soil of ${place || "our village"}, the love of our home, and the Kannada ` +
      "language always live within you. Care for one another and carry our story to the next generation. My blessing is always with you.",
  };
}

async function originalAudioBlob(capsule: VoiceCapsule): Promise<Blob | null> {
  if (capsule.audioId) {
    const local = await getVoiceAudio(capsule.audioId).catch(() => null);
    if (local) return local;
  }

  const remoteUrl = capsule.cloudAudioPath
    ? await signedVoiceUrl(capsule.cloudAudioPath).catch(() => null)
    : capsule.sharedAudioUrl;
  if (!remoteUrl) return null;

  const response = await fetch(remoteUrl).catch(() => null);
  return response?.ok ? response.blob() : null;
}

function audioFile(blob: Blob, title: string): File {
  const mime = blob.type.split(";")[0];
  const extension =
    {
      "audio/mpeg": "mp3",
      "audio/mp4": "m4a",
      "audio/wav": "wav",
      "audio/ogg": "ogg",
      "audio/webm": "webm",
    }[mime] ?? "webm";
  const name = title
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return new File([blob], `${name || "voice-legacy"}.${extension}`, {
    type: mime || "audio/webm",
  });
}

export function VoiceLegacy({ people }: { people: Person[] }) {
  const { bi } = useTranslation();
  const { voiceCapsules } = useRoots();
  const [createOpen, setCreateOpen] = React.useState(false);

  const familyMembers = new Set(voiceCapsules.map((capsule) => capsule.personId));
  const originalCount = voiceCapsules.filter(
    (capsule) =>
      capsule.audioId || capsule.cloudAudioPath || capsule.sharedAudioUrl,
  ).length;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-card/70 shadow-soft">
      <div className="relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Mic className="h-4 w-4" />
              {bi("Voice Legacy", "ಧ್ವನಿ ಪರಂಪರೆ")}
            </div>
            <h3 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
              {bi(
                "Preserve the voice behind the memory",
                "ನೆನಪಿನ ಹಿಂದಿರುವ ಧ್ವನಿಯನ್ನು ಉಳಿಸಿ",
              )}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {bi(
                "Attach a blessing, story, song, or recipe to an elder. Use temporary AI narration today, then replace it with their original recording when it is ready.",
                "ಹಿರಿಯರ ಆಶೀರ್ವಾದ, ಕಥೆ, ಹಾಡು ಅಥವಾ ಪಾಕವಿಧಾನವನ್ನು ಉಳಿಸಿ. ಈಗ ತಾತ್ಕಾಲಿಕ AI ನಿರೂಪಣೆ ಬಳಸಿ; ಮೂಲ ಧ್ವನಿ ಸಿದ್ಧವಾದಾಗ ಅದನ್ನು ಸೇರಿಸಿ.",
              )}
            </p>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            className="h-auto min-h-12 w-full gap-2 whitespace-normal rounded-2xl px-5 py-3 text-center text-sm leading-tight sm:w-auto sm:rounded-full sm:px-6 sm:text-base"
          >
            <Plus className="h-4 w-4" />
            {bi("Create a voice capsule", "ಧ್ವನಿ ಸಂಪುಟ ರಚಿಸಿ")}
          </Button>
        </div>

        <div className="relative mt-7 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-background/65">
          <ImpactStat value={voiceCapsules.length} en="Capsules" kn="ಸಂಪುಟಗಳು" />
          <ImpactStat value={familyMembers.size} en="Family voices" kn="ಕುಟುಂಬ ಧ್ವನಿಗಳು" />
          <ImpactStat value={originalCount} en="Original recordings" kn="ಮೂಲ ಧ್ವನಿಗಳು" />
        </div>
        <p className="relative mt-2 text-right text-[11px] text-muted-foreground">
          {bi("Private counts on this device", "ಈ ಸಾಧನದಲ್ಲಿರುವ ಖಾಸಗಿ ಎಣಿಕೆ")}
        </p>
      </div>

      {voiceCapsules.length === 0 ? (
        <div className="border-t border-border px-5 py-10 text-center sm:px-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Mic className="h-5 w-5" />
          </span>
          <p className="mt-4 font-semibold">
            {bi("No family voices preserved yet", "ಇನ್ನೂ ಕುಟುಂಬದ ಧ್ವನಿ ಉಳಿಸಿಲ್ಲ")}
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            {bi(
              "Start with the demo blessing. It is already bilingual and uses a clearly labeled synthesized Kannada voice.",
              "ಮಾದರಿ ಆಶೀರ್ವಾದದಿಂದ ಆರಂಭಿಸಿ. ಇದು ದ್ವಿಭಾಷೆಯಲ್ಲಿದ್ದು, ಸಂಶ್ಲೇಷಿತ ಕನ್ನಡ ಧ್ವನಿಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸುತ್ತದೆ.",
            )}
          </p>
        </div>
      ) : (
        <div className="grid gap-px border-t border-border bg-border md:grid-cols-2">
          {voiceCapsules.map((capsule) => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))}
        </div>
      )}

      {createOpen && (
        <CreateCapsuleDialog
          people={people}
          onClose={() => setCreateOpen(false)}
        />
      )}
    </div>
  );
}

function ImpactStat({ value, en, kn }: { value: number; en: string; kn: string }) {
  const { bi } = useTranslation();
  return (
    <div className="px-2 py-3 text-center sm:px-5">
      <p className="text-xl font-bold text-primary sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground sm:text-xs">
        {bi(en, kn)}
      </p>
    </div>
  );
}

function CapsuleCard({ capsule }: { capsule: VoiceCapsule }) {
  const { bi } = useTranslation();
  const auth = useAuth();
  const { removeVoiceCapsule, updateVoiceCapsule } = useRoots();
  const [lessonOpen, setLessonOpen] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [audioSaving, setAudioSaving] = React.useState(false);
  const [audioError, setAudioError] = React.useState("");
  const kind = KIND_META[capsule.kind];
  const visibility = VISIBILITY_META[capsule.visibility];
  const KindIcon = kind.icon;
  const VisibilityIcon = visibility.icon;

  const share = async () => {
    if (capsule.visibility === "private") return;
    const url = buildVoiceLegacyUrl(capsuleSharePayload(capsule));
    const text = bi(
      `${capsule.personName} left a family voice for you through Akkaverse.`,
      `${capsule.personName} ಅವರು ಅಕ್ಕವರ್ಸ್ ಮೂಲಕ ಕುಟುಂಬದ ಧ್ವನಿಯನ್ನು ನಿಮಗಾಗಿ ಉಳಿಸಿದ್ದಾರೆ.`,
    );
    try {
      if (navigator.share) {
        const original = await originalAudioBlob(capsule);
        const file = original ? audioFile(original, capsule.title) : null;
        const files = file ? [file] : [];
        await navigator.share({
          title: capsule.title,
          text,
          url,
          ...(file && navigator.canShare?.({ files }) ? { files } : {}),
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      // Cancelling the native share sheet needs no error state.
    }
  };

  const remove = async () => {
    if (
      !window.confirm(
        bi(
          "Remove this voice capsule from this device?",
          "ಈ ಸಾಧನದಿಂದ ಈ ಧ್ವನಿ ಸಂಪುಟವನ್ನು ತೆಗೆದುಹಾಕುವುದೇ?",
        ),
      )
    ) {
      return;
    }
    if (capsule.audioId) await deleteVoiceAudio(capsule.audioId).catch(() => {});
    if (capsule.cloudAudioPath) {
      await deleteCloudVoice(capsule.cloudAudioPath).catch(() => {});
    }
    removeVoiceCapsule(capsule.id);
  };

  const attachOriginal = async (file?: File) => {
    setAudioError("");
    if (!file) return;
    if (!file.type.startsWith("audio/") || file.size > 15 * 1024 * 1024) {
      setAudioError(
        bi(
          "Choose an audio file under 15 MB.",
          "15 MB ಗಿಂತ ಕಡಿಮೆ ಧ್ವನಿ ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
        ),
      );
      return;
    }
    setAudioSaving(true);
    const audioId = capsule.audioId ?? `voice-${capsule.id}`;
    try {
      await saveVoiceAudio(audioId, file);
      let cloudAudioPath = capsule.cloudAudioPath;
      if (auth.user) {
        try {
          cloudAudioPath = await uploadVoiceToCloud(
            auth.user.id,
            capsule.id,
            file,
          );
        } catch {
          setAudioError(
            bi(
              "Saved on this device, but cloud audio sync failed.",
              "ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ, ಆದರೆ ಕ್ಲೌಡ್ ಧ್ವನಿ ಸಿಂಕ್ ವಿಫಲವಾಗಿದೆ.",
            ),
          );
        }
      }
      updateVoiceCapsule(capsule.id, { audioId, cloudAudioPath });
    } catch {
      setAudioError(
        bi(
          "This browser could not store the recording.",
          "ಈ ಬ್ರೌಸರ್ ಧ್ವನಿಯನ್ನು ಉಳಿಸಲಿಲ್ಲ.",
        ),
      );
    } finally {
      setAudioSaving(false);
    }
  };

  return (
    <article className="bg-card">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <KindIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold">{capsule.title}</p>
              <p className="text-xs text-muted-foreground">
                {bi(kind.en, kind.kn)} · {capsule.personName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={remove}
            aria-label={bi("Delete capsule", "ಸಂಪುಟ ಅಳಿಸಿ")}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <blockquote lang="kn" className="mt-5 line-clamp-4 font-serif leading-relaxed">
          “{capsule.kannada}”
        </blockquote>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {capsule.english}
        </p>

        <div className="mt-5">
          <VoicePlayer
            key={`${capsule.audioId ?? "ai"}-${capsule.cloudAudioPath ?? "local"}-${capsule.sharedAudioUrl ?? "private"}`}
            text={capsule.kannada || capsule.english}
            audioId={capsule.audioId}
            cloudAudioPath={capsule.cloudAudioPath}
            originalAudioUrl={capsule.sharedAudioUrl}
            compact
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
            <VisibilityIcon className="h-3 w-3" />
            {bi(visibility.en, visibility.kn)}
          </span>
          <button
            type="button"
            onClick={() => setLessonOpen((open) => !open)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            <BookOpen className="h-3 w-3" />
            {bi("Child lesson", "ಮಕ್ಕಳ ಪಾಠ")}
            <ChevronDown
              className={cn("h-3 w-3 transition-transform", lessonOpen && "rotate-180")}
            />
          </button>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-primary/40 hover:text-primary">
            {audioSaving ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Upload className="h-3 w-3" />
            )}
            {capsule.audioId || capsule.cloudAudioPath
              ? bi("Replace original", "ಮೂಲ ಧ್ವನಿ ಬದಲಿಸಿ")
              : bi("Add original voice", "ಮೂಲ ಧ್ವನಿ ಸೇರಿಸಿ")}
            <input
              type="file"
              accept="audio/*"
              className="sr-only"
              disabled={audioSaving}
              onChange={(event) => attachOriginal(event.target.files?.[0])}
            />
          </label>
          {capsule.visibility !== "private" && (
            <button
              type="button"
              onClick={share}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-[11px] font-medium text-primary"
            >
              {shared ? <Check className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
              {shared
                ? bi("Link copied", "ಲಿಂಕ್ ನಕಲಾಯಿತು")
                : bi("Pass it on", "ಮುಂದಕ್ಕೆ ಕಳುಹಿಸಿ")}
            </button>
          )}
        </div>
        {(capsule.audioId || capsule.cloudAudioPath || capsule.sharedAudioUrl) &&
          capsule.visibility !== "private" && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            {capsule.sharedAudioUrl
              ? bi(
                  "The family link includes this original recording with permission.",
                  "ಕುಟುಂಬದ ಲಿಂಕ್ ಅನುಮತಿಯೊಂದಿಗೆ ಈ ಮೂಲ ಧ್ವನಿಯನ್ನು ಒಳಗೊಂಡಿದೆ.",
                )
              : bi(
                  "On supported devices, Pass it on includes the original recording; the link itself uses AI narration.",
                  "ಬೆಂಬಲಿತ ಸಾಧನಗಳಲ್ಲಿ, ಮುಂದಕ್ಕೆ ಕಳುಹಿಸಿ ಮೂಲ ಧ್ವನಿಯನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ; ಲಿಂಕ್ ಸ್ವತಃ AI ನಿರೂಪಣೆಯನ್ನು ಬಳಸುತ್ತದೆ.",
                )}
          </p>
        )}
        {audioError && (
          <p className="mt-2 text-[11px] text-destructive">{audioError}</p>
        )}
        {capsule.visibility === "community" && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            {bi(
              "Saved locally for future moderated community review; it is not publicly uploaded.",
              "ಭವಿಷ್ಯದ ಸಮುದಾಯ ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ಥಳೀಯವಾಗಿ ಉಳಿಸಲಾಗಿದೆ; ಸಾರ್ವಜನಿಕವಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗಿಲ್ಲ.",
            )}
          </p>
        )}
      </div>
      {lessonOpen && <VoiceLesson payload={capsuleSharePayload(capsule)} />}
    </article>
  );
}

function CreateCapsuleDialog({
  people,
  onClose,
}: {
  people: Person[];
  onClose: () => void;
}) {
  const { bi } = useTranslation();
  const auth = useAuth();
  const { addVoiceCapsule, updateVoiceCapsule } = useRoots();
  const preferred =
    people.find((person) => person.relation === "parent") ??
    people.find((person) => person.gen < 2) ??
    people[0];
  const [personId, setPersonId] = React.useState(preferred?.id ?? "");
  const [kind, setKind] = React.useState<VoiceLegacyKind>("blessing");
  const [title, setTitle] = React.useState("");
  const [kannada, setKannada] = React.useState("");
  const [english, setEnglish] = React.useState("");
  const [source, setSource] = React.useState<"ai" | "original">("ai");
  const [recording, setRecording] = React.useState<Blob | null>(null);
  const [recordingUrl, setRecordingUrl] = React.useState<string | null>(null);
  const [recordingActive, setRecordingActive] = React.useState(false);
  const [visibility, setVisibility] =
    React.useState<VoiceCapsuleVisibility>("family");
  const [consent, setConsent] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const selected = people.find((person) => person.id === personId) ?? preferred;

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [onClose]);

  React.useEffect(() => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    const nextUrl = recording ? URL.createObjectURL(recording) : null;
    setRecordingUrl(nextUrl);
    return () => {
      if (nextUrl) URL.revokeObjectURL(nextUrl);
    };
    // The current preview URL is deliberately replaced when the blob changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);

  const useDemo = () => {
    if (!selected) return;
    const sample = demoWords(selected);
    setKind("blessing");
    setTitle(sample.title);
    setKannada(sample.kannada);
    setEnglish(sample.english);
  };

  const startRecording = async () => {
    setError("");
    if (!canRecordVoice()) {
      setError(bi("Recording is unavailable in this browser.", "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ದಾಖಲಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ."));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "";
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        setRecording(blob.size > 0 ? blob : null);
        setRecordingActive(false);
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.start();
      setRecordingActive(true);
    } catch {
      setError(
        bi(
          "Microphone permission was not granted. You can upload an audio file instead.",
          "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ದೊರೆಯಲಿಲ್ಲ. ಬದಲಿಗೆ ಧ್ವನಿ ಕಡತವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು.",
        ),
      );
    }
  };

  const stopRecording = () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  };

  const upload = (file?: File) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      setError(bi("Choose an audio file.", "ಧ್ವನಿ ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ."));
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError(bi("Audio must be under 15 MB.", "ಧ್ವನಿ 15 MB ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು."));
      return;
    }
    setRecording(file);
  };

  const valid =
    !!selected &&
    !!title.trim() &&
    !!kannada.trim() &&
    !!english.trim() &&
    consent &&
    (source === "ai" || !!recording);

  const save = async () => {
    if (!valid || !selected || saving) return;
    setSaving(true);
    setError("");
    const capsule = addVoiceCapsule({
      personId: selected.id,
      personName: selected.name,
      kind,
      title: title.trim(),
      kannada: kannada.trim(),
      english: english.trim(),
      village: selected.village,
      district: selected.district,
      visibility,
      consentConfirmed: consent,
    });
    if (source === "original" && recording) {
      const audioId = `voice-${capsule.id}`;
      try {
        await saveVoiceAudio(audioId, recording);
        let cloudAudioPath: string | undefined;
        if (auth.user) {
          try {
            cloudAudioPath = await uploadVoiceToCloud(
              auth.user.id,
              capsule.id,
              recording,
            );
          } catch {
            setError(
              bi(
                "The recording is safe on this device, but cloud audio sync failed.",
                "ಧ್ವನಿ ಈ ಸಾಧನದಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿದೆ, ಆದರೆ ಕ್ಲೌಡ್ ಸಿಂಕ್ ವಿಫಲವಾಗಿದೆ.",
              ),
            );
          }
        }
        updateVoiceCapsule(capsule.id, { audioId, cloudAudioPath });
      } catch {
        updateVoiceCapsule(capsule.id, { visibility: "private" });
        setError(
          bi(
            "The words were saved, but this browser could not store the recording.",
            "ಪದಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ, ಆದರೆ ಈ ಬ್ರೌಸರ್ ಧ್ವನಿಯನ್ನು ಉಳಿಸಲಿಲ್ಲ.",
          ),
        );
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={bi("Create a voice capsule", "ಧ್ವನಿ ಸಂಪುಟ ರಚಿಸಿ")}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="glass relative max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border shadow-glow sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {bi("Voice Legacy", "ಧ್ವನಿ ಪರಂಪರೆ")}
            </p>
            <h2 className="mt-1 text-xl font-bold">
              {bi("Create a family voice capsule", "ಕುಟುಂಬದ ಧ್ವನಿ ಸಂಪುಟ ರಚಿಸಿ")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={bi("Close", "ಮುಚ್ಚಿ")}
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-8 p-5 sm:p-7">
          <FormSection number="1" title={bi("Whose voice and words?", "ಯಾರ ಧ್ವನಿ ಮತ್ತು ಪದಗಳು?")}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                {bi("Family member", "ಕುಟುಂಬದ ಸದಸ್ಯ")}
                <select
                  value={personId}
                  onChange={(event) => setPersonId(event.target.value)}
                  className={cn(inputClass, "mt-1.5")}
                >
                  {people.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name} · {person.village || person.district || bi("Family", "ಕುಟುಂಬ")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-medium">
                {bi("Kind of memory", "ನೆನಪಿನ ವಿಧ")}
                <select
                  value={kind}
                  onChange={(event) => setKind(event.target.value as VoiceLegacyKind)}
                  className={cn(inputClass, "mt-1.5")}
                >
                  {Object.entries(KIND_META).map(([id, meta]) => (
                    <option key={id} value={id}>
                      {bi(meta.en, meta.kn)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {bi(
                  "Type the words exactly as your family remembers them.",
                  "ನಿಮ್ಮ ಕುಟುಂಬ ನೆನಪಿಟ್ಟಂತೆ ಪದಗಳನ್ನು ಬರೆಯಿರಿ.",
                )}
              </p>
              <button
                type="button"
                onClick={useDemo}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1.5 text-xs font-medium text-primary"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {bi("Fill demo blessing", "ಮಾದರಿ ಆಶೀರ್ವಾದ ತುಂಬಿ")}
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={bi("Title, e.g. Appa's advice", "ಶೀರ್ಷಿಕೆ")}
                className={inputClass}
                maxLength={140}
              />
              <label className="block text-sm font-medium">
                {bi("Kannada caption", "ಕನ್ನಡ ಶೀರ್ಷಿಕೆ ಮತ್ತು ಪಠ್ಯ")}
                <textarea
                  lang="kn"
                  value={kannada}
                  onChange={(event) => setKannada(event.target.value)}
                  rows={5}
                  maxLength={2400}
                  placeholder="ಅವರ ಮಾತುಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಬರೆಯಿರಿ…"
                  className={cn(inputClass, "mt-1.5 resize-y font-serif leading-relaxed")}
                />
              </label>
              <label className="block text-sm font-medium">
                {bi("English meaning", "ಇಂಗ್ಲಿಷ್ ಅರ್ಥ")}
                <textarea
                  value={english}
                  onChange={(event) => setEnglish(event.target.value)}
                  rows={4}
                  maxLength={2400}
                  placeholder={bi("Write the meaning for the next generation…", "ಮುಂದಿನ ಪೀಳಿಗೆಗಾಗಿ ಅರ್ಥ ಬರೆಯಿರಿ…")}
                  className={cn(inputClass, "mt-1.5 resize-y leading-relaxed")}
                />
              </label>
            </div>
          </FormSection>

          <FormSection number="2" title={bi("Choose the voice", "ಧ್ವನಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ")}>
            <div className="grid gap-3 sm:grid-cols-2">
              <SourceButton
                active={source === "ai"}
                icon={Sparkles}
                title={bi("AI narration for now", "ಈಗ AI ನಿರೂಪಣೆ")}
                description={bi("Synthesized Kannada; never presented as your elder's real voice.", "ಸಂಶ್ಲೇಷಿತ ಕನ್ನಡ; ಹಿರಿಯರ ನಿಜ ಧ್ವನಿ ಎಂದು ತೋರಿಸುವುದಿಲ್ಲ.")}
                onClick={() => setSource("ai")}
              />
              <SourceButton
                active={source === "original"}
                icon={Mic}
                title={bi("Original family recording", "ಕುಟುಂಬದ ಮೂಲ ಧ್ವನಿ")}
                description={bi("Record now or upload your parents' audio later.", "ಈಗ ದಾಖಲಿಸಿ ಅಥವಾ ನಂತರ ಪೋಷಕರ ಧ್ವನಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.")}
                onClick={() => setSource("original")}
              />
            </div>

            {source === "ai" ? (
              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/[0.05] p-4">
                <VoicePlayer text={kannada || english} compact />
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-border bg-secondary/25 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={recordingActive ? stopRecording : startRecording}
                    className={cn(
                      "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium",
                      recordingActive
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    {recordingActive ? (
                      <CircleStop className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                    {recordingActive
                      ? bi("Stop recording", "ದಾಖಲೆ ನಿಲ್ಲಿಸಿ")
                      : bi("Record voice", "ಧ್ವನಿ ದಾಖಲಿಸಿ")}
                  </button>
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    {bi("Upload audio", "ಧ್ವನಿ ಅಪ್‌ಲೋಡ್")}
                    <input
                      type="file"
                      accept="audio/*"
                      className="sr-only"
                      onChange={(event) => upload(event.target.files?.[0])}
                    />
                  </label>
                </div>
                {recordingActive && (
                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-destructive">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                    {bi("Recording original voice…", "ಮೂಲ ಧ್ವನಿ ದಾಖಲಾಗುತ್ತಿದೆ…")}
                  </p>
                )}
                {recordingUrl && (
                  <div className="mt-4">
                    <audio controls src={recordingUrl} className="h-10 w-full" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {bi(
                        "Stored only in this browser. Family links use AI narration until cloud audio storage is connected.",
                        "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಯುತ್ತದೆ. ಕ್ಲೌಡ್ ಧ್ವನಿ ಸಂಗ್ರಹ ಸಂಪರ್ಕಿಸುವವರೆಗೆ ಕುಟುಂಬದ ಲಿಂಕ್ AI ನಿರೂಪಣೆ ಬಳಸುತ್ತದೆ.",
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </FormSection>

          <FormSection number="3" title={bi("Consent and privacy", "ಒಪ್ಪಿಗೆ ಮತ್ತು ಗೌಪ್ಯತೆ")}>
            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(VISIBILITY_META) as VoiceCapsuleVisibility[]).map((id) => {
                const meta = VISIBILITY_META[id];
                return (
                  <SourceButton
                    key={id}
                    active={visibility === id}
                    icon={meta.icon}
                    title={bi(meta.en, meta.kn)}
                    description={
                      id === "private"
                        ? bi("Cannot be shared", "ಹಂಚಲಾಗುವುದಿಲ್ಲ")
                        : id === "family"
                          ? bi("Text in a private URL", "ಖಾಸಗಿ URL ನಲ್ಲಿ ಪಠ್ಯ")
                          : bi("Local queue; not public yet", "ಸ್ಥಳೀಯ ಸರತಿ; ಇನ್ನೂ ಸಾರ್ವಜನಿಕವಲ್ಲ")
                    }
                    onClick={() => setVisibility(id)}
                  />
                );
              })}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/60 p-4">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 accent-primary"
              />
              <span>
                <span className="block text-sm font-semibold">
                  {bi("I confirm family permission", "ಕುಟುಂಬದ ಅನುಮತಿಯನ್ನು ದೃಢೀಕರಿಸುತ್ತೇನೆ")}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {bi(
                    "I have permission to preserve these words and, if included, this recording. I understand the selected sharing level.",
                    "ಈ ಪದಗಳನ್ನು ಮತ್ತು ಸೇರಿಸಿದರೆ ಈ ಧ್ವನಿಯನ್ನು ಉಳಿಸಲು ನನಗೆ ಅನುಮತಿ ಇದೆ. ಆಯ್ಕೆಮಾಡಿದ ಹಂಚಿಕೆ ಮಟ್ಟವನ್ನು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.",
                  )}
                </span>
              </span>
            </label>
          </FormSection>

          {error && <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose} className="rounded-full">
              {bi("Cancel", "ರದ್ದು")}
            </Button>
            <Button
              onClick={save}
              disabled={!valid || saving}
              className="gap-2 rounded-full px-6"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              {bi("Preserve this voice", "ಈ ಧ್ವನಿ ಉಳಿಸಿ")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {number}
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="sm:pl-10">{children}</div>
    </section>
  );
}

function SourceButton({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex min-h-[94px] items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
        active
          ? "border-primary bg-primary/[0.07] ring-1 ring-primary/20"
          : "border-border bg-background/50 hover:border-primary/35",
      )}
    >
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}