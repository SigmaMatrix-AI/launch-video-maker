import type React from 'react';

export type StudyVariant = 'good' | 'bad';
export type StudyProps = {frame: number; variant: StudyVariant};
export type StudyDefinition = {
  id: string;
  durationInFrames: number;
  markers: Record<string, number>;
  Frame: React.ComponentType<StudyProps>;
};
