import styled from 'styled-components';

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  gap: 16px;
  min-height: 400px;
`;

export const ListItem = styled.li`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  width: 100%;
`;

export const Card = styled.article`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const InfoArea = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  align-items: center;
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.8rem;
`;

export const Priority = styled.span<{ level: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: bold;

  ${({ level }) =>
    ({
      Todas: `
      background: #6663;
      color: #ccc;
      border: 1px solid #777;
    `,
      Alta: `
      background: rgba(255, 0, 0, 0.15);
      color: #ff4d4d;
      border: 1px solid #ff4d4d;
    `,
      Media: `
      background: rgba(255, 255, 0, 0.15);
      color: #fcdc5c;
      border: 1px solid #fcdc5c;
    `,
      Baixa: `
      background: rgba(0, 255, 0, 0.15);
      color: #2ecc71;
      border: 1px solid #2ecc71;
    `,
    })[level]}
`;
