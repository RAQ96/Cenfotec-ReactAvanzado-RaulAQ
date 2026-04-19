// Server Component — solo renderiza HTML.
type Props = {
  children: React.ReactNode;
};

export const CardActions = ({ children }: Props) => {
  return <div className="flex justify-end">{children}</div>;
};
