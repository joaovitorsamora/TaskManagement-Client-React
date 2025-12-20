import { AsideContainer, AsideGroup } from './Aside.styles';

interface AsideProps {
  children?: React.ReactNode;
}
export const Aside = ({ children }: AsideProps) => {
  return (
    <AsideContainer>
      <AsideGroup>{children}</AsideGroup>
    </AsideContainer>
  );
};
