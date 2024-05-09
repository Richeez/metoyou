import styled from "styled-components";

export const StyledPostField = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 0.4rem;
  padding-bottom: 0rem;
  container-type: inline-size;
  height: max-content;

  //         .icon_wrapper{
  //           width: 100%;
  //           display: grid;
  //           place-items: center;

  // }
  // .icon_wrapper > .desc {

  // }

  .combine {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }

  .input_cont {
    width: 100%;
    height: max-content;

    input {
      width: 100%;
      background-color: var(--color-gray-lyt);
      border: 1px solid var(--color-gray);
      outline: none;
      min-height: 40px; /* Minimum height */
      transition: var(--transition);
      border-radius: 2rem;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      font-size: 1rem;
      overflow: hidden; /* Ensure overflow is hidden to prevent scrolling */
      resize: none; /* Disable manual resizing */
      white-space: pre-wrap;

      &::placeholder {
        font-size: 0.85rem;
        font-weight: bold;
        font-style: italic;

        //   @media screen and (min-width: 40rem) {
        // font-size:3cqw;

        // }
        //       @media screen and (min-width: 64rem) {
        //     font-size:4cqw;

        //     }
      }
      &:focus {
        border: 1px inset var(--blueViolet);
      }
    }
  }
  .actions_cont {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.7rem;

    .icons_cont {
      width: max-content;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-left: 3%;
      flex-direction: row-reverse;
      gap: 1rem;
      @media screen and (max-width: 280px) {
        flex-wrap: wrap;
      }

      .icon_wrapper {
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        position: relative;

        .icon {
          font-size: 1rem;
        }
        .desc {
          text-transform: capitalize;
          font-size: 0.8rem;

          @media screen and (max-width: 360px) {
            font-size: clamp(0.3rem, 8cqi, 0.8rem);
          }
        }
      }

      .icon_wrapper:nth-of-type(1) {
        .icon {
          transform: rotate(90deg);
        }
      }
    }
  }

  .previewFiles {
    position: relative;
    width: 100%;
    height: 100%;

    .icon {
      --color-red: red;
      position: absolute;
      top: 5%;
      right: 3%;
      background-color: var(--color-red);
      width: 1.3rem;
      height: 1.3rem;
      padding: 0.2rem;
      border-radius: 50%;
      color: var(--color-white);
    }
  }
`;
