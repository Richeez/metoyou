import styled from "styled-components";


export const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: yellow; */
  /* width: 15px; */
  z-index: -1;
  display: none;
  cursor: pointer;


  &[title]{
position: relative;
&::after{
    content: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
}
`;


