import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

import { File, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IOnBoardingFormData } from '../../_types';

const UploadDocuments = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { setValue, watch } = useFormContext<IOnBoardingFormData>();
  const currentDocuments = watch('documents');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true); // Highlight the drop area
  };

  const handleDragLeave = () => {
    setIsDragOver(false); // Reset when the file is no longer dragged over
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false); // Reset drag over state
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setValue('documents', [...currentDocuments, ...Array.from(files)]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setValue('documents', [...currentDocuments, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setValue(
      'documents',
      currentDocuments.filter((file: File) => file.name !== fileName)
    );
  };

  return (
    <div className='space-y-4'>
      <Label>Upload Documents</Label>
      <Label
        className={`relative flex h-40 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 transition-all ${
          isDragOver ? 'bg-muted/30' : 'bg-muted/10'
        }`}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          multiple
          className='absolute inset-0 opacity-0'
          type='file'
          onChange={handleFileChange}
        />
        <div className='flex items-center space-x-2'>
          <Upload className='text-muted-foreground' />
          <p className='text-center text-muted-foreground'>
            Drag & Drop or Browse
          </p>
        </div>
      </Label>

      {currentDocuments && currentDocuments.length > 0 && (
        <div className='mt-4 grid grid-cols-1 gap-2 md:grid-cols-2'>
          {currentDocuments.map(document => (
            <div
              className='relative flex items-center justify-between space-x-2 rounded-lg bg-muted/50 px-2 py-1 text-sm text-muted-foreground'
              key={document.name}
            >
              <div className='flex items-center gap-2'>
                {document.type.startsWith('image/') ? (
                  <Image
                    alt={document.name}
                    className='h-12 w-12 rounded object-cover'
                    height={48}
                    src={URL.createObjectURL(document)}
                    width={48}
                  />
                ) : (
                  <File className='h-6 w-6 text-muted-foreground' />
                )}
                <p className='max-w-md'>
                  <strong>{document.name}</strong>
                </p>
              </div>
              <Button
                className='h-auto rounded-full bg-primary/70 p-0.5 backdrop-blur-sm'
                onClick={() => handleRemoveFile(document.name)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
