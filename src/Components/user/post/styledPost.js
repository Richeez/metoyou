import styled from "styled-components";

export const StyledPost = styled.div`
  .profile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;
    position: relative;

    .text {
      display: flex;
      flex-direction: column;
      margin-right: auto;
      p {
        width: 100%;
        font-weight: bold;
        opacity: 0.6;
        /* color:var(--color-gray-dark); */
        font-size: var(--sm-font-size);
        &:nth-of-type(1) {
          opacity: 1;

          text-transform: unset;

          font-size: 1rem;
        }
      }
    }

    .icon {
      /* align-self: flex-start; */
      position: absolute;
      top: 2%;
      right: 3%;
    }

    .post_options {
      position: absolute;
      bottom: -15%;
      /* top: auto; */
      right: 1%;
      display: flex;
      flex-direction: column;
      padding: 5px 0.5rem;
      border-radius: 10px;
      height: fit-content;
      background: var(--color-white);
      box-shadow: 2px 3px 5px var(--blueViolet);
      gap: 0.5rem;
      list-style: none;
      text-transform: capitalize;
      z-index: 5;
      li {
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
        font-size: var(--sm-font-size);
        transition: var(--transition);
        &:hover {
          background: var(--color-gray-lyt);
        }
      }
    }
  }
  .post {
    width: 100%;

    .desc {
      padding-top: 1rem;
    }

    .icons_wrapper {
      display: flex;
      padding: 1rem 1rem 1.5rem;
      align-items: center;
      justify-content: space-between;

      .left-icons,
      .like {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: fit-content;
        gap: 2rem;

        & {
          .icon {
            font-size: 1.6rem;
          }
          .icon:nth-of-type(1) {
            font-size: 1.8rem;
          }
        }
      }

      .like {
        gap: 0.5rem;
        p {
          margin-top: auto;
        }
        .icon {
          color: var(--color-gray);
        }
      }
    }

    .engagements {
      .items_wrapper {
        display: grid;
        grid-template-columns: 80px 1fr;
        width: fit-content;

        .img_cont {
          display: flex;
          width: max-content;
          position: relative;
          align-items: center;
          & > div {
            position: absolute;
            top: 0;
            left: 0;
            transform: translateY(-100%);
          }
          & > div .img_wrapper {
            /* border: 2px solid var(--color-white); */
          }

          & > div:nth-of-type(1) {
            transform: translateX(0%);
          }

          & > div:nth-of-type(2) {
            transform: translateX(50%);
          }

          & > div:nth-of-type(3) {
            transform: translateX(110%);
          }
        }

        .text_cont {
          padding: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-gray-dark);
        }
      }
    }
  }
`;
