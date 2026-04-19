import { ThemeProvider } from './ThemeContext';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
