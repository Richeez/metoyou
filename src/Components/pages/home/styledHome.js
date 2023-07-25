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

    & > .item{
      max-width: 40rem;
      margin: 0 auto;      

    }


  }

  .wrapper {
      width: 100%;
       grid-area: 1;

        @media screen and (min-width: 45rem) {
          grid-area: unset;
          grid-column: span 2;
          
        }

        .item {
          width: 100%;
          grid-column: span 2;
          padding: 2rem 1rem;
        border-radius: 1rem;
        background: var(--color-white);
      box-shadow: 2px 3px 5px var(--blueViolet);
      /* padding: 2rem  1rem; */


      & >{
      width: 100%;
    }

        .icon {
          cursor: pointer;
          font-size: 1.4rem;
        }


          &:nth-of-type(1) {
            position: relative;
            max-width: 100%;
            margin: 0 auto;
            /* background: transparent; */

          }

          &:nth-of-type(2){
         container-type: inline-size;

      
        }
          &:nth-of-type(3) {
            position: relative;


          }
        }
      

    }

  `;
