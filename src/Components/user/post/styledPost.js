import styled from "styled-components";


export const StyledPost = styled.div`
              
            .profile {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 2rem;

              .img_wrapper {

                &:hover{
                  img{
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
                  text-transform: capitalize;
                  font-size: 0.8rem;
                  &:nth-of-type(1) {
                    opacity: 1;

                    text-transform: unset;

                    font-size: 1rem;
                  }
                }
              }
            }
.post{
    
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

    .icons_wrapper {
      display: flex;
      padding: 1rem 1rem 1.5rem;
      align-items: center;
      justify-content: space-between;

      .left-icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: fit-content;
        gap: 2rem;

        &{
          .icon:nth-of-type(1){
          color: var(--blueViolet);
          font-size: 1.5rem;

          }
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
          padding: .5rem;
          color:var(--color-gray-dark);

        }
      }
    }
  }


`;