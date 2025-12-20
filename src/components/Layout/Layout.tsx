import { InnerLayout } from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <InnerLayout>{children}</InnerLayout>;
};
