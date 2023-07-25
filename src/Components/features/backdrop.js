import styled from "styled-components";

export const BackDrop = styled.div`
position: absolute;
inset: 0;
  backdrop-filter: blur(1px);
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;