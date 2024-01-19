import { LuFileSignature } from 'react-icons/lu';
import { ActionButton, ActionButtonProps } from './action-button';
import { useSetAtom } from 'jotai';
import { createEmptyNoteAtom } from '@renderer/store';

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom);

  const handleCreation = () => {
    createEmptyNote();
  };

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
