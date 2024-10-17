import styled from "styled-components";

/* // todo: MEDIA-QUERY FOR TABLET
@media screen and (max-width: 820px) {
  grid-column: span 1;
  
}*/

export const StyledHome = styled.div`
  width: 100%;
  & > section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: start;
    padding-top: 6rem;

    @media screen and (min-width: 45rem) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (min-width: 65rem) {
      gap: 2rem;
    }

    /* & > .item {
      max-width: 40rem;
      margin: 0 auto;
    } */
  }

  .dashboard {
    width: 100%;
    grid-area: 1;
    gap: 2rem;

    @media screen and (min-width: 45rem) {
      grid-area: unset;
      grid-column: span 2;
    }

    .item {
      /* padding: 2rem  1rem; */

      grid-column: span 2;
      &:not(:last-of-type) {
        width: 100%;
        padding: 2rem 1rem;
        border-radius: 1rem;
        background: var(--color-white);
        box-shadow: 2px 3px 5px var(--blueViolet);
      }

      & > {
        width: 100%;
      }

      .icon {
        cursor: pointer;
        font-size: 1.4rem;
      }

      &:nth-of-type(1) {
        max-width: 100%;
        margin: 0 auto;
        position: relative;
      }

      &:nth-of-type(2) {
        container-type: inline-size;
        max-height: max-content;
      }
      &:nth-of-type(3) {
        display: grid;
        position: relative;
        background: transparent;
        width: 100%;
        max-height: max-content;
        gap: 3rem;
      }
    }
  }
`;
