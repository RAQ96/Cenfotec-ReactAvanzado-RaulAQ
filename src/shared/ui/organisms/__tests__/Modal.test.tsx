import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modal } from '@/shared/ui/organisms/Modal';

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Content>
          <Modal.Title>Hola</Modal.Title>
          <div>Contenido</div>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Hola')).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });
});
