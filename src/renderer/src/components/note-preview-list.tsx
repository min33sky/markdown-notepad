import { notesMock } from '@renderer/store/mocks';
import { ComponentProps } from 'react';
import { NotePreview } from './note-preview';
import { cn } from '@renderer/utils';
import { useNotesList } from '@renderer/hooks/useNotesList';

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void;
};

export const NotePreviewList = ({ className, onSelect, ...props }: NotePreviewListProps) => {
  const { handleNoteSelect, notes, selectedNoteIndex } = useNotesList({ onSelect });

  if (notes.length === 0) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    );
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={index === selectedNoteIndex}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  );
};
