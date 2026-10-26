import type { Film } from "../core.js";
export const dimensions = [
  "风格还原",
  "创意与惊艳",
  "动效工艺",
  "设计与排版",
  "质感与细节",
  "声音与同步",
  "技术规格",
] as const;
export type Dimension = (typeof dimensions)[number];
export type ReviewScope = "visual" | "audiovisual";
export type ReviewStatus = "passed" | "failed" | "incomplete";
export type FrameRange = { start: number; end: number };
export type Evidence = {
  id: string;
  path: string;
  kind: "frame" | "context" | "mix" | "playback" | "probe" | "history";
  sha256: string;
  bytes: number;
  frame?: number;
  range?: FrameRange;
};
export type Target =
  | { kind: "preview"; version: string; runtimeHash: string }
  | { kind: "mp4"; version: string; file: string; sha256: string };
export type SamplingPlan = {
  frames: number[];
  windows: FrameRange[];
  overviewFrames: number[];
};
export type ReviewContext = {
  documents: {
    role: "brief" | "direction" | "storyboard" | "brand" | "reference";
    path: string;
  }[];
  actionRanges: FrameRange[];
};
export type PlaybackTrace = {
  completed: boolean;
  samples: { elapsedMs: number; frame: number; playing: boolean }[];
  errors: string[];
  elapsedMs: number;
};
export type Observation = {
  mode: "static" | "sequence" | "continuous-playback" | "listening";
  range: FrameRange;
  evidenceIds: string[];
  method: string;
  notes: string;
};
export type Finding = {
  id: string;
  dimension: Dimension;
  severity: "blocking" | "advisory";
  sceneId: string | null;
  range: FrameRange | null;
  description: string;
  fixTarget: string;
  evidenceIds: string[];
  state: "open" | "resolved" | "not-reproduced";
  resolution: string | null;
};
export type Score = {
  state: "rated" | "unverified" | "deferred";
  score: number | null;
  reason: string;
  evidenceIds: string[];
};
export type ReviewManifest = {
  schemaVersion: 2;
  target: Target;
  film: Film;
  createdAt: string;
  tools: Record<string, unknown>;
  sampling: SamplingPlan;
  files: Evidence[];
  missingContext: string[];
  previous?: { reportEvidenceId: string; manifestEvidenceId: string };
};
export type ReviewReport = {
  schemaVersion: 2;
  scope: ReviewScope;
  target: Target;
  manifestSha256: string;
  reviewer: {
    id: string | null;
    independent: boolean;
    capabilities: { continuousVisual: boolean; audio: boolean };
  };
  observations: Observation[];
  scores: Record<Dimension, Score>;
  findings: Finding[];
};
export type ReviewResult = {
  scope: ReviewScope | null;
  scopeStatus: ReviewStatus;
  commercialStatus: ReviewStatus;
  reasons: { code: string; path: string; message: string }[];
};
export type PackOptions = {
  scope?: ReviewScope;
  mp4?: string;
  previous?: string;
  signal?: AbortSignal;
};
export type PackResult = {
  directory: string;
  manifestPath: string;
  reportPath: string;
};
