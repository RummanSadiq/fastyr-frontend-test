"use client";

import classNames from 'classnames';
import { FunctionComponent, useCallback } from 'react';

//Types
import { RecordingInfo } from '@/types/audio';

// Shared
import { LocalStorageKey } from '@/shared/constants';

type Props = {
    recordings: RecordingInfo[];
    setRecordings: (recordings: RecordingInfo[]) => void;
};

export const SavedRecordings: FunctionComponent<Props> = ({ recordings, setRecordings }) => {

    const handleDeleteRecordings = useCallback((index: number) => {
        const updatedRecordings = recordings.filter((_, i) => i !== index);
        setRecordings(updatedRecordings);
        localStorage.setItem(LocalStorageKey.Recordings, JSON.stringify(updatedRecordings));
    }, [recordings, setRecordings]);

    return (
        <>
            <h2 className={classNames("text-xl font-bold mb-4 text-center")}>Saved Recordings</h2>
            <div className={classNames("space-y-6 w-full max-w-md mx-auto")}>
                {recordings.length === 0 ? (
                    <p className="text-center text-gray-500">No recordings saved.</p>
                ) : (
                    recordings.map((recording, index) => (
                        <div
                            key={index}
                            className={classNames("flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm bg-white")}
                        >
                            <div className={classNames("flex items-center justify-between")}>
                                <audio controls src={recording.data} className="w-full mb-3" />
                            </div>

                            <div className={classNames("flex items-center justify-between text-sm text-gray-600 mt-2")}>
                                <div className={classNames("flex items-center space-x-1")}>
                                    <span className={classNames("font-semibold")}>Date:</span>
                                    <span>{recording.date}</span>
                                </div>
                                <div className={classNames("flex items-center space-x-1")}>
                                    <span className={classNames("font-semibold")}>Time:</span>
                                    <span>{recording.time}</span>
                                </div>
                                <div className={classNames("flex items-center space-x-1")}>
                                    <span className={classNames("font-semibold")}>Length:</span>
                                    <span>{recording.length}</span>
                                </div>
                            </div>

                            <button
                                className={classNames("px-4 py-2 mt-4 bg-red-500 text-white rounded-md w-full hover:bg-red-600")}
                                onClick={() => handleDeleteRecordings(index)}
                            >
                                Delete Recording
                            </button>
                        </div>
                    ))
                )}
            </div>

        </>
    );
};

export default SavedRecordings;
