// Server Component — solo renderiza HTML.
type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Text = ({ className = '', ...props }: TextProps) => {
  return <p className={`text-gray-700 ${className}`} {...props} />;
};
