import { FooterContainer, Container, Link } from './Footer.styles';

const links = [
  { label: 'Privacidade', href: '/privacidade' },
  { label: 'Termos', href: '/termos' },
  { label: 'Contato', href: '/contato' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <span className="texto">© {year} Produtivo</span>
        <nav aria-label="Links do rodapé">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </FooterContainer>
  );
};
