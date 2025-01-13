// components/ImageUpload.tsx
import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
    onUpload: (file: File) => Promise<void>;
    maxSize?: number;
}

interface ImageDimensions {
    width: number;
    height: number;
}

export default function ImageUpload({
    onUpload,
    maxSize = 5242880, // 5MB default
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const [preview, setPreview] = useState<string>('');

    const resizeImage = useCallback(async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const targetWidth = 720;
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                // Calculate new height to maintain aspect ratio
                const scaleFactor = targetWidth / img.width;
                const targetHeight = img.height * scaleFactor;

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw resized image to canvas
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Convert canvas to blob
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Failed to create blob'));
                            return;
                        }

                        // Create new file from blob
                        const resizedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });

                        resolve(resizedFile);
                    },
                    'image/jpeg',
                    0.9
                );
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };
        });
    }, []);

    const validateAndResizeImage = async (file: File): Promise<File | null> => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return null;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
            return null;
        }

        try {
            const resizedImage = await resizeImage(file);
            setPreview(URL.createObjectURL(resizedImage));
            return resizedImage;
        } catch (error) {
            setError('Failed to process image');
            return null;
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setError('');

        const file = e.dataTransfer.files[0];
        const resizedFile = await validateAndResizeImage(file);
        if (resizedFile) {
            onUpload(resizedFile);
        }
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const file = e.target.files?.[0];
        if (file) {
            const resizedFile = await validateAndResizeImage(file);
            if (resizedFile) {
                onUpload(resizedFile);
            }
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                className={`border-2 border-dashed rounded-lg p-6 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    } ${error ? 'border-red-500' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div className="text-center">
                        <p className="text-lg">
                            Drag and drop your image here, or{' '}
                            <label className="text-blue-500 cursor-pointer hover:text-blue-600">
                                browse
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileInput}
                                    accept="image/*"
                                />
                            </label>
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Image will be resized to 720px width
                        </p>
                    </div>
                    {preview && (
                        <div className="mt-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-full h-auto rounded-lg"
                            />
                        </div>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

