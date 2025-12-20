import styled from 'styled-components';

export const FilterWrapper = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Group = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Legend = styled.legend`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  margin-bottom: 4px;
`;

export const CheckGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TagButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 6px 12px;
  font-size: 0.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    filter: brightness(1.1);
  }
`;
