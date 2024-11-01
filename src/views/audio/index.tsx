"use client";

import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

// Components
import { Header } from '@/components/common/Header';
import { Recorder } from '@/components/audio/Recorder';
import { SavedRecordings } from '@/components/audio/SavedRecordings';

// Types
import { RecordingInfo } from '@/types/audio';

// Shared
import { LocalStorageKey } from '@/shared/constants';

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
            <div className={classNames("flex gap-6 h-full flex-col items-center overflow-auto p-2 md:p-0 my-4")}>
                <Recorder onSave={handleSaveRecording} />
                <SavedRecordings recordings={recordings} setRecordings={setRecordings} />
            </div>
        </div>
    );
};

export default AudioView;
