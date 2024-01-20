import { homedir } from 'os';
import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants';
import { ensureDir, readFile, readdir, stat } from 'fs-extra';
import { NoteInfo } from '@shared/models';
import { GetNotes, ReadNote } from '@shared/types';

export const getRootDir = () => {
  console.log('### HomeDir() : ', homedir());
  console.log('### pwd() : ', process.cwd());

  return `${process.cwd()}/${appDirectoryName}`;
};

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir();

  await ensureDir(rootDir);

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  });

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'));

  return Promise.all(notes.map(getNoteInfoFromFilename));
};

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`);

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  };
};

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir();

  return readFile(`${rootDir}/${filename}.md`, {
    encoding: fileEncoding
  });
};
