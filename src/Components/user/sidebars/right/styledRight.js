import styled from "styled-components";

export const StyledRightSideBar = styled.aside`
  display: none;
  width: 100%;
  height: calc(100vh - 81.4px);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  overflow-x: hidden;
  overflow-y: auto;
  align-items: start;
  ::-webkit-scrollbar {
    display: none;
  }
  gap: 20px;
  position: sticky;
  top: 81.4px;
  @media screen and (min-width: 45rem) {
    display: grid;
  }

  .grid {
    align-items: start;
    width: 100%;

    .item {
      width: 100%;
      padding: 2rem 1rem;

      background: var(--color-white);
      box-shadow: 2px 3px 5px var(--blueViolet);
      border-radius: 1rem;
    }
    @media screen and (min-width: 45rem) {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    /* @media screen and (min-width: 65rem) {
      display: grid;
      grid-template-columns: unset;
    } */
  }
`;
