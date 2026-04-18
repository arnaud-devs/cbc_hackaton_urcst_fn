import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Link,
  Image,
  Type,
  Minus
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

interface FormatButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

const FormatButton: React.FC<FormatButtonProps> = ({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  children, 
  title 
}) => (
  <Button
    type="button"
    variant={isActive ? "default" : "ghost"}
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className="h-8 w-8 p-0"
    title={title}
  >
    {children}
  </Button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  className = "",
  disabled = false
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Update history when value changes
  useEffect(() => {
    if (value !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(value);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [value, history, historyIndex]);

  // Update undo/redo states
  useEffect(() => {
    setCanUndo(historyIndex > 0);
    setCanRedo(historyIndex < history.length - 1);
  }, [historyIndex, history.length]);

  const execCommand = useCallback((command: string, value?: string) => {
    if (disabled) return;
    
    setIsUserInput(true);
    document.execCommand(command, false, value);
    const newContent = editorRef.current?.innerHTML || '';
    onChange(newContent);
    editorRef.current?.focus();
  }, [disabled, onChange]);

  const handleUndo = useCallback(() => {
    if (canUndo && historyIndex > 0) {
      setIsUserInput(true);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
      }
    }
  }, [canUndo, historyIndex, history, onChange]);

  const handleRedo = useCallback(() => {
    if (canRedo && historyIndex < history.length - 1) {
      setIsUserInput(true);
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
      }
    }
  }, [canRedo, historyIndex, history, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handleRedo();
          } else {
            handleUndo();
          }
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
      }
    }
  }, [disabled, execCommand, handleUndo, handleRedo]);

  const handleInput = useCallback(() => {
    if (disabled) return;
    setIsUserInput(true);
    const newContent = editorRef.current?.innerHTML || '';
    onChange(newContent);
  }, [disabled, onChange]);

  // Initialize editor content only once
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  // Track if the change is from user input to avoid conflicts
  const [isUserInput, setIsUserInput] = useState(false);

  // Update content only when value changes externally (not from user input)
  useEffect(() => {
    if (editorRef.current && !isUserInput && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    setIsUserInput(false);
  }, [value, isUserInput]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, [disabled]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  }, [execCommand]);

  const insertHorizontalRule = useCallback(() => {
    execCommand('insertHorizontalRule');
  }, [execCommand]);

  const isFormatActive = useCallback((format: string) => {
    if (!editorRef.current) return false;
    return document.queryCommandState(format);
  }, []);

  return (
    <div className={`border border-input rounded-md bg-background rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-input bg-muted/30 rounded-t-md">
        {/* Undo/Redo */}
        <FormatButton
          onClick={handleUndo}
          disabled={!canUndo || disabled}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={handleRedo}
          disabled={!canRedo || disabled}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </FormatButton>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Text Formatting */}
        <FormatButton
          onClick={() => execCommand('bold')}
          isActive={isFormatActive('bold')}
          disabled={disabled}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('italic')}
          isActive={isFormatActive('italic')}
          disabled={disabled}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('underline')}
          isActive={isFormatActive('underline')}
          disabled={disabled}
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('strikeThrough')}
          isActive={isFormatActive('strikeThrough')}
          disabled={disabled}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </FormatButton>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Alignment */}
        <FormatButton
          onClick={() => execCommand('justifyLeft')}
          isActive={isFormatActive('justifyLeft')}
          disabled={disabled}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('justifyCenter')}
          isActive={isFormatActive('justifyCenter')}
          disabled={disabled}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('justifyRight')}
          isActive={isFormatActive('justifyRight')}
          disabled={disabled}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('justifyFull')}
          isActive={isFormatActive('justifyFull')}
          disabled={disabled}
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </FormatButton>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Lists and Block Elements */}
        <FormatButton
          onClick={() => execCommand('insertUnorderedList')}
          isActive={isFormatActive('insertUnorderedList')}
          disabled={disabled}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('insertOrderedList')}
          isActive={isFormatActive('insertOrderedList')}
          disabled={disabled}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('formatBlock', 'blockquote')}
          disabled={disabled}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </FormatButton>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Links and Media */}
        <FormatButton
          onClick={insertLink}
          disabled={disabled}
          title="Insert Link"
        >
          <Link className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={insertImage}
          disabled={disabled}
          title="Insert Image"
        >
          <Image className="h-4 w-4" />
        </FormatButton>
        <FormatButton
          onClick={insertHorizontalRule}
          disabled={disabled}
          title="Insert Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </FormatButton>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        {/* Headings */}
        <FormatButton
          onClick={() => execCommand('formatBlock', 'h1')}
          disabled={disabled}
          title="Heading 1"
        >
          <span className="text-sm font-bold">H1</span>
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('formatBlock', 'h2')}
          disabled={disabled}
          title="Heading 2"
        >
          <span className="text-sm font-bold">H2</span>
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('formatBlock', 'h3')}
          disabled={disabled}
          title="Heading 3"
        >
          <span className="text-sm font-bold">H3</span>
        </FormatButton>
        <FormatButton
          onClick={() => execCommand('formatBlock', 'p')}
          disabled={disabled}
          title="Normal Text"
        >
          <Type className="h-4 w-4" />
        </FormatButton>
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="min-h-[300px] p-4 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 prose prose-sm max-w-none"
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
    </div>
  );
};

export default RichTextEditor;
