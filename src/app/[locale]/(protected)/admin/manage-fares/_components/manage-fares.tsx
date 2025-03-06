'use client';

import React, { useState } from 'react';

import { Loader2, Pencil, Plus, Save, Trash2, X } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useDeleteFare } from '../_hooks/useDeleteFare';
import { useGetAllFares } from '../_hooks/useGetAllFares';
import { useStoreFare } from '../_hooks/useStoreFare';
import { useUpdateFare } from '../_hooks/useUpdateFare';

interface IFare {
  id: number;
  distance_range_start: string;
  distance_range_end: string;
  fare: string;
  created_at: string;
  updated_at: string;
}

const ManageFares: React.FC = () => {
  const { data: fares, isLoading, error } = useGetAllFares();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedFare, setEditedFare] = useState<IFare | null>(null);
  const [newFare, setNewFare] = useState<IFare | null>(null);
  const [deletingLoadingId, setDeletingLoadingId] = useState<number | null>(
    null
  );
  const [editingLoadingId, setEditingLoadingId] = useState<number | null>(null);

  const storeFareMutation = useStoreFare();
  const updateFareMutation = useUpdateFare();
  const deleteFareMutation = useDeleteFare();

  const handleEdit = (fare: IFare) => {
    setEditingId(fare.id);
    setEditedFare(fare);
  };

  const handleSave = () => {
    if (editedFare) {
      setEditingLoadingId(editedFare.id);
      updateFareMutation.mutate(
        {
          distance_range_start: parseFloat(editedFare.distance_range_start),
          distance_range_end: parseFloat(editedFare.distance_range_end),
          fare: parseFloat(editedFare.fare),
          fareId: editedFare.id,
        },
        {
          onSettled: () => setEditingLoadingId(null),
          onSuccess: () => {
            setEditingId(null);
            setEditedFare(null);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedFare(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedFare) {
      setEditedFare({ ...editedFare, [e.target.name]: e.target.value });
    }
  };

  const handleAddNewFare = () => {
    if (newFare) {
      storeFareMutation.mutate({
        distance_range_start: parseFloat(newFare.distance_range_start),
        distance_range_end: parseFloat(newFare.distance_range_end),
        fare: parseFloat(newFare.fare),
      });
      setNewFare(null);
    }
  };

  const handleDelete = (fareId: number) => {
    setDeletingLoadingId(fareId);
    deleteFareMutation.mutate(
      { fareId },
      { onSettled: () => setDeletingLoadingId(null) }
    );
  };

  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardContent className='pt-6'>
          <div className='flex items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <p className='ml-2 text-lg font-medium'>Loading fares...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant='destructive'>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load fares. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Manage Fares</CardTitle>
        <CardDescription>
          View and edit standard fares for different distance ranges.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Start Range (km)</TableHead>
                <TableHead>End Range (km)</TableHead>
                <TableHead>Fare (Rs.)</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fares?.map(fare => (
                <TableRow key={fare.id}>
                  <TableCell className='font-medium'>{fare.id}</TableCell>
                  <TableCell>
                    {editingId === fare.id ? (
                      <Input
                        className='w-24'
                        name='distance_range_start'
                        value={editedFare?.distance_range_start}
                        onChange={handleChange}
                      />
                    ) : (
                      fare.distance_range_start
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === fare.id ? (
                      <Input
                        className='w-24'
                        name='distance_range_end'
                        value={editedFare?.distance_range_end}
                        onChange={handleChange}
                      />
                    ) : (
                      fare.distance_range_end
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === fare.id ? (
                      <Input
                        className='w-24'
                        name='fare'
                        value={editedFare?.fare}
                        onChange={handleChange}
                      />
                    ) : (
                      fare.fare
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {editingId === fare.id ? (
                      <>
                        <Button
                          className='mr-2'
                          isLoading={editingLoadingId === fare.id}
                          size='sm'
                          onClick={handleSave}
                        >
                          <Save className='mr-2 h-4 w-4' />
                          Save
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={handleCancel}
                        >
                          <X className='mr-2 h-4 w-4' />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className='mr-2'
                          isLoading={editingLoadingId === fare.id}
                          size='sm'
                          variant='outline'
                          onClick={() => handleEdit(fare)}
                        >
                          <Pencil className='mr-2 h-4 w-4' />
                          Edit
                        </Button>
                        <Button
                          isLoading={deletingLoadingId === fare.id}
                          size='sm'
                          variant='destructive'
                          onClick={() => handleDelete(fare.id)}
                        >
                          <Trash2 className='mr-2 h-4 w-4' />
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='mt-4'>
          <Input
            className='mb-2'
            placeholder='Start Range (km)'
            value={newFare?.distance_range_start || ''}
            onChange={e =>
              setNewFare({
                ...newFare,
                distance_range_start: e.target.value,
              } as IFare)
            }
          />
          <Input
            className='mb-2'
            placeholder='End Range (km)'
            value={newFare?.distance_range_end || ''}
            onChange={e =>
              setNewFare({
                ...newFare,
                distance_range_end: e.target.value,
              } as IFare)
            }
          />
          <Input
            className='mb-2'
            placeholder='Fare (Rs.)'
            value={newFare?.fare || ''}
            onChange={e =>
              setNewFare({
                ...newFare,
                fare: e.target.value,
              } as IFare)
            }
          />
          <Button
            isLoading={storeFareMutation.isPending}
            onClick={handleAddNewFare}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add New Fare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageFares;
