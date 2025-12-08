import { useGenerateAudio } from "@/hooks/useGenerateAudio";
import { useDeleteAudio } from "@/hooks/useDeleteAudio";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2, RotateCcw } from "lucide-react";
import { SelectStoryTag } from "./SelectStoryTag";
import type { GenerateAudioProps } from "@/types/props";

export const GenerateAudio: React.FC<GenerateAudioProps> = ({
    voiceType,
    transcript,
    languageId,
    languages,
    generatedAudio,
    isSubmitting,
    setSelectedTags,
    setVoiceType,
    setTranscript,
    setGeneratedAudio,
    setAudioDuration,
}) => {
    const {
        isLoading: isGenerating,
        handleGenerateAudio,
    } = useGenerateAudio({ setGeneratedAudio });
    const {
        isLoading: isDeleting,
        handleDeleteAudio,
    } = useDeleteAudio({ setGeneratedAudio });

    return (
        <div className="flex flex-col gap-[30px]">
            <SelectStoryTag 
                name="Language"
                value={languageId}
                allValues={languages}
                valueType="id"
                onChange={(val: string) => setSelectedTags(prev => ({
                    ...prev,
                    languageId: val,
                }))}
                disabled={isGenerating || !!generatedAudio}
            />
            <SelectStoryTag 
                name="Voice Type"
                value={voiceType}
                allValues={[{ id: "1", name: "Male" }, { id: "2", name: "Female" }]}
                valueType="name"
                onChange={(val: string) => setVoiceType(val as typeof voiceType)}
                disabled={isGenerating || !!generatedAudio}
            />

            <div className="flex flex-col gap-2.5">
                <Label className="text-[16px] leading-normal font-bold">
                    Transcript to generate audio
                </Label>
                <Textarea
                    className="text-[16px] leading-normal placeholder:text-[16px] placeholder:leading-normal resize-none max-h-60 max-w-full bg-background-300 rounded-[6px] border-none font-light focus-visible:ring-offset-primary-300"
                    placeholder="Provide text to generate audio"
                    rows={5}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    disabled={isGenerating || !!generatedAudio}
                />
            </div>
            <div className="w-full">
                {
                    !generatedAudio
                    ? (
                        <Button 
                            type="submit" 
                            onClick={() => handleGenerateAudio({ transcript, languageId, voiceType })}
                            className="text-[16px] leading-normal bg-primary-300 py-4 font-bold max-w-[200px] cursor-pointer hover:bg-primary-400"
                            disabled={isGenerating || !transcript || !languageId || !voiceType}
                        >
                            {isGenerating ? (
                                <>
                                    Generating
                                    <Loader2 className="size-4 animate-spin ml-2" />
                                </>
                            ) : (
                                "Generate audio"
                            )}
                        </Button>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Label className="text-[16px] leading-normal font-bold">
                                Generated audio preview
                            </Label>
                            <div className="flex items-center gap-8">
                                <audio 
                                    controls
                                    src={generatedAudio.audioUrl}
                                    autoPlay
                                    className="rounded-4xl border-2 border-background-400"
                                    onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
                                />
                                <Button 
                                    type="reset" 
                                    onClick={() => handleDeleteAudio(generatedAudio.audioId)}
                                    className="text-[16px] leading-normal bg-primary-300 py-4 font-bold cursor-pointer hover:bg-primary-400"
                                    disabled={isDeleting || isSubmitting} 
                                >
                                    {isDeleting ? (
                                        <>
                                            Clearing preview
                                            <Loader2 className="size-4 animate-spin ml-2" />
                                        </>
                                    ) : (
                                        <>
                                            <RotateCcw className="size-4" />
                                            Generate new audio
                                        </>
                                    )}
                                </Button>
                            </div>
                            <p className="text-[14px] leading-normal text-muted-foreground">
                                Generating new audio will discard the current preview
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
