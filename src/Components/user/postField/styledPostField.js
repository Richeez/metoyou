import styled from "styled-components";

export const StyledPostField = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.4rem;
  padding-bottom: 0rem;
  container-type: inline-size;

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

  .img_wrapper {
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }
  .input_cont {
    width: 100%;

    input {
      width: 100%;
      background-color: var(--color-gray-lyt);
      border: 1px inset var(--blueViolet);
      outline: none;
      transition: var(--transition);
      border-radius: 2rem;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      font-size: 1rem;

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
    }
  }
  .actions_cont {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    /* background-color: aliceblue; */
    gap: 0.7rem;

    .icons_cont {
      width: max-content;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-left: 3%;
      /* background-color: yellow; */
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
        /* background-color: gray; */
        position: relative;

        /* display: inline-block; */

        .icon {
          font-size: 1rem;
        }
        .desc {
          text-transform: capitalize;
          font-size: 0.8rem;
          /* display: inline-block; */

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

  .previewImg {
    position: relative;
    width: 100%;
    height: 100%;

    .icon {
      position: absolute;
      top: 5%;
      right: 3%;
      background-color: var(--blueViolet);
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.2rem;
      border-radius: 50%;
      color: var(--color-white);
    }
  }
`;
