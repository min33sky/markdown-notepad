import { FaRegTrashCan } from 'react-icons/fa6';
import { ActionButton, ActionButtonProps } from './action-button';
import { useSetAtom } from 'jotai';
import { deleteNoteAtom } from '@renderer/store';

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom);

  const handleDelete = () => {
    deleteNote();
  };

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  );
};
