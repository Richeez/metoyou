import styled from "styled-components";

export const StyledEditor = styled.form`
width: clamp( 300px, 31rem, 50vw);
position: sticky;
padding: 1rem 1.5rem;
transition: var(--transition);
top: 2rem;
background: var(--primary-color);
transform: scale(0);
border-radius: 1rem;
.inputs-field{
    display: grid;
    gap: 1rem;
     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
     padding: 2rem .5rem 1rem .5rem;
     @media screen and (min-width: 45rem) {
        grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
}


     button{
        margin-left: auto;
        width: max-content;
        padding: .5rem  1rem;
        border: 2px solid var(--blueViolet);
        background: var(--color-gray);
        border-radius: 1rem;



     }

}

       .header{
        display: flex;
        align-items: center;
        grid-column: span 2;
        width: 100%;
        justify-content: space-between;
        h1{
         white-space: nowrap;
        }


.icon{
    font-size: 1.8rem;
    cursor: pointer;
}

       }
       
        
        input{
            width: 100%;
            /* text-transform: capitalize; */
            padding: .2rem;
            font-size: .9rem;
            outline: none;
            border: 1px solid var(--color-gray);
            border-radius: .5rem;
            &:focus-visible{
border: 1px solid var(--blueViolet-lyt);
            }
        }
       
        .upload-wrapper{
            width: 100%;
            position: relative;
            display: flex;
            gap: 1rem;
            padding-bottom: 1rem;
            container-type: inline-size;


            p{
            width: 100%;
            height: 30px;
            overflow-x: auto;
            overflow-y: hidden;

            padding: .2rem;
            font-size: 5cqw;
            
            @media screen and (min-width: 40rem) {
          font-size:3cqw;
    
    
    
          }                   
           border: 1px solid var(--blueViolet);
            border-radius: .5rem;
            }

            button{
                border: 1px solid var(--blueViolet);
            border-radius: .5rem;
            font-size: .8rem;
                        padding: .2rem;

            white-space: nowrap;
            background: var(--color-gray);
            &:focus-visible{
border: 1px solid var(--primary-color);
            }
            }
        }

       .btn{
        width: max-content;
        padding: .5rem  2rem;
        outline: none;
        border: none;
        margin-left: auto;
        cursor: pointer;
        border-radius: .5rem;
        color: var(--primary-color);
        background: linear-gradient( to  bottom left , var(--blueViolet) 30%, var(--blueViolet) 30% , var(--blueViolet-lyt) 80%) ;

       }
`;