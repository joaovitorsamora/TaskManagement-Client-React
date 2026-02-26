import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderSearch } from './HeaderSearch';
import { HeaderContainer, HeaderActions } from './Header.styles';
import { HeaderRight } from './HeaderRight';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderActions>
        <HeaderLogo />
        <HeaderSearch />
        <HeaderNav />
        <HeaderRight />
      </HeaderActions>
    </HeaderContainer>
  );
};
