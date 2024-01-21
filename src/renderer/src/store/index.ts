import { NoteContent, NoteInfo } from '@shared/models';
import { atom } from 'jotai';
import { unwrap } from 'jotai/utils';
import { notesMock } from './mocks';

const loadNotes = async () => {
  const notes = await window.context.getNotes();

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
};

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev);

export const selectedNoteIndexAtom = atom<number | null>(null);

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom);
  const selectedNoteIndex = get(selectedNoteIndexAtom);

  if (selectedNoteIndex === null || !notes) return null;

  const selectedNote = notes[selectedNoteIndex];

  const noteContetnt = await window.context.readNote(selectedNote.title);

  return {
    ...selectedNote,
    content: noteContetnt
  };
});

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
);

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);

  if (!notes) return;

  const title = `Note ${notes.length + 1}`;

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  };

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);

  set(selectedNoteIndexAtom, 0);
});

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);

  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  );

  set(selectedNoteIndexAtom, null);
});

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  console.log('아니 시발: ', newContent);

  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);

  if (!selectedNote || !notes) return;

  // save on disk
  await window.context.writeNote(selectedNote.title, newContent);

  // update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      // this is the note that we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        };
      }

      return note;
    })
  );
});
