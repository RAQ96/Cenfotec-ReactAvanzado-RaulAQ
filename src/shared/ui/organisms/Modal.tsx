'use client'; // Client Component — usa useContext
import { createContext, useContext, type ReactNode } from 'react';
import { Button } from '@/shared/ui/atoms';

interface ModalContextType {
  open: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <ModalContext.Provider value={{ open, onClose }}>
      <div className="fixed inset-0 z-50 pointer-events-none">{children}</div>
    </ModalContext.Provider>
  );
}

function Content({ children }: { children: ReactNode }) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal.Content must be used within Modal');
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto">
      <div
        className="relative bg-white rounded-lg border-2 border-blue-400 shadow-2xl min-w-[340px] max-w-full pt-8"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        <Button
          aria-label="Cerrar"
          onClick={ctx.onClose}
          variant="secondary"
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full p-0 text-lg border border-blue-200 bg-white text-blue-600 shadow hover:bg-blue-100"
        >
          ×
        </Button>
        <div className="p-6 pt-2">{children}</div>
      </div>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold mb-4 mt-2 text-blue-700">{children}</h2>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2 mt-4">{children}</div>;
}

Modal.Content = Content;
Modal.Title = Title;
Modal.Actions = Actions;

export { Modal };
