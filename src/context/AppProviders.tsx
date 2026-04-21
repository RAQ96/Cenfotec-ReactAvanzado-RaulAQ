import { ThemeProvider } from './ThemeContext';
import { FiltersProvider } from './FiltersContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <FiltersProvider>{children}</FiltersProvider>
    </ThemeProvider>
  );
};
