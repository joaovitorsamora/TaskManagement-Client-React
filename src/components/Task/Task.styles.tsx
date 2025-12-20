import styled from 'styled-components';

export const TaskWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.colors.text};
`;
