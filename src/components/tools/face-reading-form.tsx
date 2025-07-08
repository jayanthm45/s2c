'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { faceReadingAction, type FormState } from '@/app/tools/face-reading/actions';
import type { FaceReadingOutput } from '@/ai/flows/face-reading-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Camera, Upload, Smile, RefreshCw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ReportDisplay } from '@/components/tools/report-display';

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        <>
          <Smile className="mr-2 h-4 w-4" /> Analyze My Face
        </>
      )}
    </Button>
  );
}

const initialState: FormState = { message: '' };

function ResultDisplay({ result }: { result: FaceReadingOutput }) {
    return (
        <ReportDisplay title="Face Reading Analysis" fileName="face-reading-report">
            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-center text-primary font-headline">Overall Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.overallAnalysis}</p>
                    </CardContent>
                </Card>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faceShape">
                        <AccordionTrigger><strong>Face Shape:</strong> {result.faceShape.shape}</AccordionTrigger>
                        <AccordionContent>{result.faceShape.interpretation}</AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="forehead">
                        <AccordionTrigger><strong>Forehead:</strong> {result.forehead.type}</AccordionTrigger>
                        <AccordionContent>{result.forehead.interpretation}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="eyes">
                        <AccordionTrigger><strong>Eyes:</strong> {result.eyes.type}</AccordionTrigger>
                        <AccordionContent>{result.eyes.interpretation}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="nose">
                        <AccordionTrigger><strong>Nose:</strong> {result.nose.type}</AccordionTrigger>
                        <AccordionContent>{result.nose.interpretation}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="lips">
                        <AccordionTrigger><strong>Lips:</strong> {result.lips.type}</AccordionTrigger>
                        <AccordionContent>{result.lips.interpretation}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ReportDisplay>
    );
}

export function FaceReadingForm() {
    const [state, formAction] = useActionState(faceReadingAction, initialState);
    const { toast } = useToast();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageData, setImageData] = useState<string>('');
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.message && !state.result) {
            toast({
                title: 'Error',
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state, toast]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUri = reader.result as string;
                setImagePreview(dataUri);
                setImageData(dataUri);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraToggle = async () => {
        if (isCameraOn) {
            // Turn camera off
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
            setIsCameraOn(false);
            setHasCameraPermission(null);
        } else {
            // Turn camera on
            setIsCameraOn(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings.',
                });
                setIsCameraOn(false);
            }
        }
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUri = canvas.toDataURL('image/jpeg');
            setImagePreview(dataUri);
            setImageData(dataUri);
            handleCameraToggle(); // Turn off camera after capture
        }
    };
    
    const resetAll = () => {
        setImagePreview(null);
        setImageData('');
        if(isCameraOn) handleCameraToggle();
        if(fileInputRef.current) fileInputRef.current.value = '';
    }

    if (state.result) {
        return (
            <div className="text-center">
                <ResultDisplay result={state.result} />
                <Button onClick={() => window.location.reload()} className="mt-8">
                    <RefreshCw className="mr-2" />
                    Try Another Photo
                </Button>
            </div>
        )
    }

    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="imageDataUri" value={imageData} />
                <div className="space-y-4">
                    {!imagePreview && !isCameraOn && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> Upload Photo
                            </Button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                            <Button type="button" onClick={handleCameraToggle}>
                                <Camera className="mr-2 h-4 w-4" /> Use Camera
                            </Button>
                        </div>
                    )}
                    
                    {isCameraOn && (
                        <Card>
                            <CardContent className="p-2">
                                <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                                <canvas ref={canvasRef} className="hidden" />
                                {hasCameraPermission === false && (
                                    <Alert variant="destructive" className="mt-2">
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                                    </Alert>
                                )}
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <Button type="button" variant="secondary" onClick={handleCameraToggle}>Cancel</Button>
                                    <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>Capture Photo</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    
                    {imagePreview && (
                        <Card>
                            <CardContent className="p-2">
                                <Image src={imagePreview} alt="Preview" width={500} height={400} className="rounded-md w-full object-contain max-h-80" />
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <Button variant="outline" type="button" onClick={resetAll}>
                                        <RefreshCw className="mr-2 h-4 w-4" /> Change Photo
                                    </Button>
                                    <SubmitButton disabled={!imageData} />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <CardDescription className="text-center text-xs">
                        Your privacy is important. Photos are not stored after analysis.
                    </CardDescription>
                </div>
            </form>
        </div>
    );
}
