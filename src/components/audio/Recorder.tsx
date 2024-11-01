"use client";

import { useState, useEffect, useRef, useCallback, FunctionComponent } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import classNames from 'classnames';

//Types
import { RecordingInfo } from '@/types/audio';

// Shared
import { LocalStorageKey } from '@/shared/constants';

type RecordingState = {
    isRecording: boolean;
    seconds: number;
    minutes: number;
}

type Props = {
    onSave: (newRecording: RecordingInfo) => void;
};

const INITIAL_RECORDING_STATE: RecordingState = {
    isRecording: false,
    seconds: 0,
    minutes: 0,
};

export const Recorder: FunctionComponent<Props> = ({ onSave }) => {
    const [recordingState, setRecordingState] = useState<RecordingState>(INITIAL_RECORDING_STATE);
    const [recordingLength, setRecordingLength] = useState<string | null>(null);

    const timerInterval = useRef<NodeJS.Timeout | null>(null);
    const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
        video: false,
        audio: true,
    });

    const handleToggleRecording = useCallback(() => {
        if (recordingState.isRecording) {
            stopRecording();
            const formattedLength = `${formatTime(recordingState.minutes)}:${formatTime(recordingState.seconds)}`;
            setRecordingLength(formattedLength);
            setRecordingState(INITIAL_RECORDING_STATE);
        } else {
            startRecording();
            setRecordingLength(null);
            setRecordingState({ seconds: 0, minutes: 0, isRecording: true });
        }
    }, [recordingState, startRecording, stopRecording]);

    const handleSaveRecording = useCallback(async () => {
        if (!mediaBlobUrl) return;

        try {

            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result as string;
                const now = new Date();
                const recordingInfo: RecordingInfo = {
                    data: base64data,
                    date: now.toLocaleDateString(),
                    time: now.toLocaleTimeString(),
                    length: recordingLength || "00:00",
                };

                const recordings = JSON.parse(localStorage.getItem(LocalStorageKey.Recordings) || '[]');
                recordings.push(recordingInfo);
                localStorage.setItem(LocalStorageKey.Recordings, JSON.stringify(recordings));

                onSave(recordingInfo);
                clearBlobUrl();
            }
        } catch (error) {
            console.error(error)
        }


    }, [mediaBlobUrl, recordingLength, onSave, clearBlobUrl]);

    const formatTime = (value: number): string => {
        return String(value).padStart(2, '0');
    };

    useEffect(() => {
        if (recordingState.isRecording) {
            timerInterval.current = setInterval(() => {
                setRecordingState((prevState) => {
                    const newSeconds = (prevState.seconds + 1) % 60;
                    const newMinutes = newSeconds === 0 ? prevState.minutes + 1 : prevState.minutes;
                    return {
                        ...prevState,
                        seconds: newSeconds,
                        minutes: newMinutes,
                    };
                });
            }, 1000);
        } else {
            clearInterval(timerInterval.current!);
        }

        return () => clearInterval(timerInterval.current!);
    }, [recordingState.isRecording]);

    return (
        <div className={classNames("w-full max-w-xs p-4 bg-white rounded-lg shadow-lg border border-gray-200")}>
            <h2 className={classNames("text-xl font-semibold text-gray-700 mb-4 text-center")}>
                Audio Recorder
            </h2>
            <div className={classNames("flex flex-col items-center space-y-4")}>
                <button
                    onClick={handleToggleRecording}
                    className={classNames(
                        "p-4 rounded-full shadow-md text-white transition-colors duration-200",
                        recordingState.isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    )}
                    aria-label={recordingState.isRecording ? "Stop Recording" : "Start Recording"}
                >
                    {recordingState.isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
                </button>
                <div className={classNames(
                    "text-2xl font-bold text-gray-800 mt-2 bg-gray-100 p-3 rounded-lg shadow-inner w-28 mx-auto text-center"
                )}>
                    {formatTime(recordingState.minutes)}:{formatTime(recordingState.seconds)}
                </div>
                {mediaBlobUrl && !recordingState.isRecording && (
                    <div className={classNames("flex flex-col items-center space-y-4 mt-4")}>
                        <audio controls src={mediaBlobUrl} className={classNames("w-full")} />
                        <div className={classNames("flex space-x-4")}>
                            <button
                                className={classNames(
                                    "px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
                                )}
                                onClick={handleSaveRecording}
                            >
                                Save Recording
                            </button>
                            <button
                                className={classNames(
                                    "px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-200"
                                )}
                                onClick={clearBlobUrl}
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recorder;
