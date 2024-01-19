import { ElementRef, useRef } from 'react';
import { ActionButtonsRow } from './components/action-buttons-row';
import { Content, RootLayout, Sidebar } from './components/app-layout';
import FloatingNoteTitle from './components/floating-note-title';
import { MarkdownEditor } from './components/markdown-editor';
import { NotePreviewList } from './components/note-preview-list';

function App() {
  const contentContainerRef = useRef<ElementRef<'div'>>(null);

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <RootLayout>
      <Sidebar className="p-2">
        <ActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
      </Sidebar>

      <Content ref={contentContainerRef} className="border-l bg-zinc-900/90 border-l-white/20 ">
        <FloatingNoteTitle className="pt-2" />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  );
}

export default App;
