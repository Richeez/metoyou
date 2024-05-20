import styled from "styled-components";

export const StyledLeftSideBar = styled.aside`
  width: 100%;
  /* width: fit-content; */
  display: none;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: start;
  height: calc(100vh - 81.4px);
  overflow-x: hidden;
  overflow-y: auto;

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
    width: 100%;
    align-items: start;

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
