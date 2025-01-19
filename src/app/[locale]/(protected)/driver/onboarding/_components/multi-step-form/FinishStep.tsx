import React from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

import { File, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IOnBoardingFormData } from '../../_types';

const FinishStep = () => {
  const { watch, setValue } = useFormContext<IOnBoardingFormData>();
  const formData = watch();

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* Bus Name Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Bus Name
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.busName}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Bus Number Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Bus Number
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.busNumber}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Route Start Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Route Start
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.routeStart}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Route End Card */}
        <Card className='bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Route End
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-base text-foreground'>
              {formData.routeEnd}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Documents Card */}
        <Card className='col-span-2 bg-muted/50 shadow-md'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold text-muted-foreground'>
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {formData.documents && formData.documents.length > 0 ? (
                <ul className='flex flex-wrap gap-6'>
                  {formData.documents.map((doc, index) => (
                    <li
                      className='relative flex items-center space-x-2'
                      key={index}
                    >
                      {doc.type.startsWith('image/') ? (
                        <Image
                          alt={doc.name}
                          className='size-12 rounded object-cover'
                          height={48}
                          src={URL.createObjectURL(doc)}
                          width={48}
                        />
                      ) : (
                        <File className='size-6 text-muted-foreground' />
                      )}

                      <Button
                        className='absolute -right-2 -top-2 h-auto rounded-full bg-primary/70 p-0.5 backdrop-blur-sm'
                        onClick={() =>
                          setValue(
                            'documents',
                            formData.documents.filter(
                              file => file.name !== doc.name
                            )
                          )
                        }
                      >
                        <X className='size-2' />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-sm text-muted-foreground'>Not uploaded</p>
              )}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinishStep;
