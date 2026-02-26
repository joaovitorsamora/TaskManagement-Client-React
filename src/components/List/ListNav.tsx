import { Link, Lista, ListaItem, ListaNav } from './ListNav.styles';

const navItems = [
  { label: 'Hoje', to: '/hoje' },
  { label: 'Próximo', to: '/proximo' },
  { label: 'Inbox', to: '/inbox' },
  { label: 'Arquivadas', to: '/arquivadas' },
];

export const ListNav = () => {
  return (
    <ListaNav aria-label="Lista de Tarefas">
      <Lista>
        {navItems.map((item) => (
          <ListaItem key={item.to}>
            <Link href={item.to}>{item.label}</Link>
          </ListaItem>
        ))}
      </Lista>
    </ListaNav>
  );
};
