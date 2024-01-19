import { ActionButtonsRow } from './components/action-buttons-row';
import { Content, RootLayout, Sidebar } from './components/app-layout';
import FloatingNoteTitle from './components/floating-note-title';
import { MarkdownEditor } from './components/markdown-editor';
import { NotePreviewList } from './components/note-preview-list';

function App() {
  return (
    <RootLayout>
      <Sidebar className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-1" />
      </Sidebar>
      <Content className="border-l bg-zinc-900/80 border-l-white/20 ">
        <FloatingNoteTitle className="pt-2" />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  );
}

export default App;
