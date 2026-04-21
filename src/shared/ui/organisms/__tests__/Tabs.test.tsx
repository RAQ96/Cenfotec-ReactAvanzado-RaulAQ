import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '@/shared/ui/organisms/Tabs';

describe('Tabs', () => {
  it('renders tabs and switches', () => {
    render(
      <Tabs defaultId="home" activeId={'home'}>
        <Tabs.Header>
          <Tabs.Tab id="home">
            <p>Uno</p>
          </Tabs.Tab>
          <Tabs.Tab id="projects">
            <p>Dos</p>
          </Tabs.Tab>
          <Tabs.Tab id="tasks">
            <p>Tres</p>
          </Tabs.Tab>
        </Tabs.Header>
      </Tabs>
    );
    expect(screen.getByText('Uno')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dos'));
    expect(screen.getByText('Dos')).toBeInTheDocument();
  });
});
