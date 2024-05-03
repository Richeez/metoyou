import styled from "styled-components";

export const StyledPost = styled.div`
  .profile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2rem;

    .img_wrapper {
      &:hover {
        img {
          transform: scale(1.1);
          transition: var(--transition);
        }
      }
      img {
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        object-fit: cover;
        /* border: 2px solid var(--color-white); */
        object-position: center;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      margin-right: auto;
      p {
        width: 100%;
        font-weight: bold;
        opacity: 0.6;
        /* color:var(--color-gray-dark); */
        font-size: 0.8rem;
        &:nth-of-type(1) {
          opacity: 1;

          text-transform: unset;

          font-size: 1rem;
        }
      }
    }

    .icon {
      align-self: flex-start;
    }
  }
  .post {
    width: 100%;
    .img-wrapper {
      background: var(--color-white);
      width: 100%;
      height: 400px;
      img {
        aspect-ratio: 1/1;
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* border: 2px solid var(--color-white); */
        object-position: center;
      }
    }
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
        /* background-color: yellow; */
        gap: 2rem;

        & {
          .icon {
            font-size: 1.6rem;
          }
          .icon:nth-of-type(1) {
            font-size: 1.8rem;
            /* color: var(--blueViolet); */
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
        display: flex;
        gap: 1rem;
        width: fit-content;
        padding-bottom: 1rem;

        .img_cont {
          display: flex;
          width: max-content;
          align-items: center;
          position: relative;

          .img-wrapper {
            width: 40px;
            height: 40px;
            cursor: pointer;
            position: absolute;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid var(--color-white);

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }
          }

          .img-wrapper:nth-of-type(1) {
            transform: translateX(0%);
          }

          .img-wrapper:nth-of-type(2) {
            transform: translateX(50%);
          }

          .img-wrapper:nth-of-type(3) {
            transform: translateX(110%);
          }
        }

        .text_cont {
          margin-left: 5rem;
          padding: 0.5rem;
          color: var(--color-gray-dark);
        }
      }
    }
  }
`;
