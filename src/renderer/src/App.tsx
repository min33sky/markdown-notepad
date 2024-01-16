import { ActionButtonsRow } from './components/action-buttons-row';
import { Content, RootLayout, Sidebar } from './components/app-layout';
import { NotePreviewList } from './components/note-preview-list';

function App() {
  return (
    <RootLayout>
      <Sidebar className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-1" />
      </Sidebar>
      <Content className="border-l bg-zinc-900/50 border-l-white/20 ">Content</Content>
    </RootLayout>
  );
}

export default App;
