import styled from "styled-components";


export const StyledPostField = styled.form`

width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: .5rem;
              padding-bottom: 2rem;

              
              .combine{
                width: 100%;
                display: flex;
                align-items: center;
                gap: 2rem;


              }

              .img_wrapper {
                img {
                  width: 100%;
                  aspect-ratio: 1/1;
                  border-radius: 50%;
                  object-fit: cover;
                  object-position: center;
                }
              }
.input_cont{
  width: 100%;

  input{
    width: 100%;
    background-color: var(--color-gray-lyt);
      border: 1px inset var(--blueViolet);
      outline: none;
      transition: var(--transition);
      /* font-size: 1rem; */
      border-radius: 2rem;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      container-type: inline-size;
      font-size:3cqw;

      &::placeholder {
        font-size: 5cqw;
            
        @media screen and (min-width: 40rem) {
      font-size:3cqw;



      }        
            @media screen and (min-width: 64rem) {
          font-size:4cqw;



          }        
      }
}

            }
     .actions_cont{
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.7rem;

      .icons_cont{
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

        .icon_wrapper{
          width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          position: relative;

  /* display: inline-block; */


          
          

          .icon{
            font-size: 1.3rem;
          }
          .desc{
            text-transform: capitalize;
          font-size: 4cqw;
          /* display: inline-block; */


            
            @media screen and (min-width: 64rem) {
          font-size: 3cqw;



          }
        }
  
        }

        .icon_wrapper:nth-of-type(1){
          .icon{
            transform: rotate(90deg);
          }
        }
      }

     } 

     .previewImg{
      position: relative;
      width: 100%;

      .icon{
        position: absolute;
        top: 5%;
        right: 3%;
        background-color: var(--blueViolet);
        width: 1.5rem;
        height: 1.5rem;
        padding:.2rem;
        border-radius: 50%;
        color: var(--color-white);
        /* font-size: 1rem; */

      }
     }

`;