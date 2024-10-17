import styled from "styled-components";

export const StyledExplore = styled.div`
  width: 100%;
  .explore-head {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    & h2 {
      font-size: 1.2rem;
      width: 100%;
      text-transform: capitalize;
    }
    .see-all {
      color: grey;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.07 ease-in;
      white-space: nowrap;

      &:hover {
        color: rgb(26, 25, 25);
      }
    }
  }

  nav {
    width: 100%;
    margin: 0.5rem 0;

    position: relative;

    ul {
      /* max-width: calc(350px * 0.7); */
      display: flex;

      flex-direction: row;
      margin: 0 auto;
      max-width: 100%;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      gap: 1rem;
      overflow-y: hidden;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-snap-align: center;

      li {
        list-style: none;

        padding: 0.2rem 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        width: fit-content;
        background: var(--color-gray-lyt);
        border-radius: 20px;
        text-transform: capitalize;
        transition: 0.6s ease;
        cursor: pointer;
        &:hover {
          background: var(--blueViolet);
          color: var(--color-white);
        }
      }

      .next,
      .prev {
        background: rgba(0, 0, 0, 0.354);
        color: var(--color-white);
        top: 50%;
        // left: 50%;
        transform: translate(-50%, -50%);

        &:hover {
          background: var(--color-white);
          color: var(--color-gray-dark);
        }
      }
      .next {
        right: -8%;
      }
      .prev {
        left: 1%;
      }
    }
  }

  .all-exp-images {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }

  .upp-img-div {
    display: grid;
    width: 100%;
    grid-template-areas:
      "up mid right"
      "down bot right";
    grid-template-rows: 85px 85px;
    grid-template-columns: 70px 70px;
    gap: 10px;
  }

  .botm-exp-images {
    display: grid;
    width: 100%;

    grid-template-areas:
      "right up mid"
      "right down bot";
    grid-template-rows: 85px 85px;
    grid-template-columns: 70px 70px;
    gap: 10px;
  }

  .exp-images-cont {
    border-radius: 8px;
    cursor: pointer;
  }

  .exp-images-cont > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }

  .col1 {
    grid-area: up;
  }

  .col2 {
    grid-area: mid;
  }

  .right-image,
  .left-image {
    grid-area: right;
  }

  .col4 {
    grid-area: down;
  }

  .col5 {
    grid-area: bot;
  }
`;
