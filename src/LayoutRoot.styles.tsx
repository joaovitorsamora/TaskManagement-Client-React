import styled from 'styled-components';

export const AppGrid = styled.div`
  display: grid;
  min-height: 100vh;

  grid-template-areas:
    'header header header'
    'aside section section'
    'footer footer footer';

  grid-template-columns: 260px 1fr 1fr;
  grid-template-rows: auto 1fr auto;

  padding: 20px;
  gap: 20px;

  background: ${({ theme }) => theme.colors.background};
  transition: ${({ theme }) => theme.transition};

  @media (max-width: 880px) {
    grid-template-areas:
      'header'
      'section'
      'footer';

    grid-template-columns: 1fr;
  }
`;

export const HeaderArea = styled.header`
  grid-area: header;
`;

export const AsideArea = styled.aside`
  grid-area: aside;

  @media (max-width: 880px) {
    display: none;
  }
`;

export const SectionArea = styled.section`
  grid-area: section;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FooterArea = styled.footer`
  grid-area: footer;
`;
