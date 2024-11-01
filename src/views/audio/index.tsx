"use client";

import { FunctionComponent, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import dynamic from "next/dynamic";

// Components
import { Header } from "@/components/common/Header";
// Dynamic import with ssr: false to ensure Web Worker code used in mic package only runs in browser
const Recorder = dynamic(
  () => import("@/components/audio/Recorder").then((mod) => mod.Recorder),
  {
    ssr: false,
    loading: () => <div>Loading recorder...</div>,
  },
);
import { SavedRecordings } from "@/components/audio/SavedRecordings";

// Types
import { RecordingInfo } from "@/types/audio";

// Shared
import { LocalStorageKey } from "@/shared/constants";

export const AudioView: FunctionComponent = () => {
  const [recordings, setRecordings] = useState<RecordingInfo[]>([]);

  const handleSaveRecording = useCallback((newRecording: RecordingInfo) => {
    setRecordings((prev) => [...prev, newRecording]);
  }, []);

  useEffect(() => {
    const storageRecordings = localStorage.getItem(LocalStorageKey.Recordings);
    if (!storageRecordings) return;

    setRecordings(JSON.parse(storageRecordings));
  }, []);

  return (
    <div className={classNames("flex h-screen flex-col")}>
      <Header label="Audio" />
      <div
        className={classNames(
          "my-4 flex h-full flex-col items-center gap-6 overflow-auto p-2 md:p-0",
        )}
      >
        <Recorder onSave={handleSaveRecording} />
        <SavedRecordings
          recordings={recordings}
          setRecordings={setRecordings}
        />
      </div>
    </div>
  );
};

export default AudioView;
