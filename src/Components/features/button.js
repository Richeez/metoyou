import styled from "styled-components";

export const NavBtn = styled.button`
border: none;
padding: 1rem 2rem;
width: max-content;
background: var(--color-gray-dark);
color: var(--color-white);
border-radius: 1rem;
white-space: nowrap;
text-transform: uppercase;
font-weight: bold;
cursor: pointer;
text-align: center;
font-size: var(--default-font-size);
transition: var(--transition);
&:hover{
    color: var(--color-gray-dark);
    background: var(--color-white);

    &:hover{
a{
    color: var(--color-gray-dark);

}

}


}
@media screen and (min-width: 64rem) {
    padding: 1rem 2rem;

} 
a{
    color: var(--color-white);
white-space: nowrap;
text-transform: uppercase;
font-weight: bold;
cursor: pointer;
text-align: center;
font-size: var(--default-font-size);
transition: var(--transition);

    text-decoration: none;

} 

`;

export const CustomButton = styled.button`
  /* Add your custom button styles here */
  border: none;
  cursor: pointer;
  background: transparent;

`;
