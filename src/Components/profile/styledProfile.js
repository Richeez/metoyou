import styled from "styled-components";

export const StyledProfile = styled.div`
  width: fit-content;
  transition: 1s ease;

  &:nth-of-type(1) {
    position: relative;
    .img_wrapper {
      border: 1px solid var(--color-gray);
    }
  }
  .img_wrapper {
    margin: 0 auto;
    overflow: hidden;
    border: 2px solid var(--blueViolet);

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
      border: 2px solid var(--color-white);
      background: var(--color-white);
      object-position: top;
    }
  }

  .text {
    p {
      font-size: 0.8rem;
      width: 100%;
      font-weight: bold;
    }
  }
`;
