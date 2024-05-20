import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,*::before,*::after, html, body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    line-height: 1.6;
    scroll-padding-top: 2rem;


}


:root {
--primary-color: #ffff;
--lg-font-size: 3rem;
--md-font-size: 2rem;
--sm-font-size:0.8rem;
--df-font-size: 1rem;
/* --primary-color: #000000; */
--color-gray: #cccccc;
--transparent-color: rgba(0, 0, 0, 0.514);
--color-gray-lyt: #eeeeee;
--dim-gray: rgb(94, 92, 92);
--aliceblue: #eff4ff;
--color-gray-dark: #181818;
--color-white: #ffffff;
--secondary-color: linear-gradient( to bottom left, var(--color-gray-lyt),var(--color-gray), var(--blueViolet-lyt) );
--default-font: 'Inter', sans-serif;
// --default-font: 'Space Grotesk', sans-serif; 
--transition: all .5s ease-in-out;
--default-font-size: 1rem;
--blueViolet: blueviolet;
--blueViolet-lyt: rgba(137, 43, 226, 0.514);
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background:var(--color-white);  
}



::-webkit-scrollbar-track {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  /* -webkit-margin-before: 4.5rem; */
  /* margin-block-start: 4.5rem; */
  box-shadow: inset 0 0 6px var(--color-white);
}



::-webkit-scrollbar-thumb {
  background-color:var(--blueViolet);
  border-radius: 1rem;
  border: 2px inset var(--blueViolet);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}  


::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.2rem;
  background:var(--color-white);  
}

.textarea-container {
  position: relative;
}

.textarea {
  width: 100%;
  min-height: 40px; /* Minimum height */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: height 0.5s ease-in-out; /* Transition for height changes */
  overflow: hidden; /* Ensure overflow is hidden to prevent scrolling */
  resize: none; /* Disable manual resizing */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  white-space: pre-wrap; /* Allow text wrapping */
}



body {
    -webkit-font-smoothing: antialised;
    font-family: var(--default-font);
background: var(--secondary-color);
background-color: var(--color-gray-lyt);
font-size:var(--default-font-size);
background-position: center;
background-size:cover;
background-repeat:no-repeat;

/* &::before,&::after{
  content: "";
  position:absolute;
  inset: 0;
  
} */
/* &::after{
  z-index: -2;
  background-image: linear-gradient(30deg , var(--color-gray) 12%, transparent 12.5%, transparent 87%, var(--color-gray) 87.5%, var(--color-gray)),
  linear-gradient(150deg , var(--color-gray) 12%, transparent 12.5%, transparent 87%, var(--color-gray) 87.5%, var(--color-gray)),
   linear-gradient(30deg , var(--color-gray) 12%, transparent 12.5%, transparent 87%, var(--color-gray) 87.5%, var(--color-gray)),
   linear-gradient(150deg , var(--color-gray) 12%, transparent 12.5%, transparent 87%, var(--color-gray) 87.5%, var(--color-gray)),
   linear-gradient(60deg , var(--dim-gray) 25%, transparent 25.5%, transparent 75%, var(--dim-gray) 75%, var(--dim-gray)),
   linear-gradient(60deg , var(--dim-gray) 25%, transparent 25.5%, transparent 75%, var(--dim-gray) 75%, var(--dim-gray));
   background-size: 20px 80px;
   background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
   opacity: 0.5;
   /* background-blend-mode: multiply; 
  }
  
  &::before{
    z-index: -1; 
    background-color: rgba(137, 43, 226, 0.514);
}*/

}

.loader{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
  svg path,
  svg rect{
    fill: #8a2be2;
  }
}

/*
  Set the color of the icon
*/

/* sign up page and login page are sharing this style*/
.loading-effect {
    animation: identifier 1s ease infinite;
    font-size: 60px;
    color: rgb(34, 98, 170);
}

@keyframes identifier {
    from{
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}


.loading-div {
  position: absolute;
  height: 100%;
  width: 100%;
  inset: 0;
  backdrop-filter: blur(2px);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
}





.pop-up{
  transform: scale(1) !important;
  transition: all .5s ease-in-out;

}

.offSet {
  transform: scale(0);
  transition: all .5s ease-in-out;

}


.df{
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 45rem) {
        justify-content: space-between;
    }

}
.cap{
  text-transform: capitalize;
}

.unactive-screen{
position: relative;
  &::before{
    content: '';
    z-index: 15;
    position: absolute;
    inset: 0;
    user-select: none;
    background: rgba(0, 0, 0, 0.514) ;

  }

}

 .fdirc{
    flex-direction: column;
    
} 
 .jsb{
     flex-direction: column;
     @media screen and (min-width: 45rem) {
    justify-content: space-between;
    flex-direction: row;

    }

} 
.jcc{
justify-content: center;
} 

 .aic{
    align-items: center;

}
 .ais{
    align-items: flex-start;

}
 .tac{
text-align: center;
}


.hamburger{
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 100%;


  &::before,
  ::after {
    content: "";
    border-radius: 2rem 0 0 2rem;
    position: absolute;
    background-color: var(--color-gray-dark);
    height: 2px;
    transition: width 1s ease-in-out;
  }
  &::before {
    width: 65% !important;
    padding: 0.1rem;
    top: 20%;
    transition: width .5s ease-in-out;

  }
  &::after {
    bottom: 20%;
    width: 65% !important;
    padding: 0.12rem;
    background: var(--blueViolet);
    transition: width .5s ease-in-out;

  }
  div {
    background-color: var(--color-gray-dark);
    height: 2px;
    width: 50% !important;
    border-radius: 2rem 0 0 2rem;
    padding: 0.1rem;
    transition: width .5s ease-in-out;
  }

}

.next_page{
    padding-bottom: 2rem;
    button{
    text-transform: capitalize;
    width: max-content;
    border-radius: 2rem !important;
    padding: 0.9rem 1rem !important;
    cursor: pointer;
    @media screen and (min-width: 64rem) {
        padding: 0.9rem 2.5rem !important;
        font-size: inherit;


    }
    }
}

.textBox{
    gap: 1.3rem;
    width: 100%;
    font-family: inherit;
    align-items: center;
    justify-content: center;
    
    @media screen and (min-width: 45rem) {
        align-items: flex-start;
            justify-content: flex-start;
    }
    

h1, h2, h3{
    letter-spacing: -1.296px;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    line-height: 2.5rem;
    /* color:var(--color-gray-dark); */

    word-wrap: normal;
    @media screen and (min-width: 45rem) {
        line-height: 3.5rem;
    font-size: 2.8rem;
    text-align: left;
    
}

}
p{
    font-size: 1rem;
    line-height: 1.9rem;
    text-align: center;
    width: 100%;
    word-wrap: normal;
    /* color:var(--color-gray-dark); */

    @media screen and (min-width: 45rem) {
        text-align: left;
    }
}

button{
    background: var(--primary-color);
    color: var(--color-white);
    text-transform: capitalize;
    width: max-content;
    border-radius: 2rem;
    font-size: inherit;
    padding: 0.9rem 2.5rem;
    cursor: pointer;
    font-weight: bold;

}
}
.bold{
    font-weight: bold;

}


.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  transform: translateY(-50%);
  color: var(--blueViolet);
  font-weight: bold;
  font-size: 15px;
  transition: 0.6s ease;
  background: var(--primary-color);
  box-shadow: 2px 2px 5px var(--color-gray-dark);
  user-select: none;
  z-index: 10;

 & >*{
margin: 0 auto;
  pointer-events: none;

  }

}
.add {
  cursor: pointer;
  position: absolute;
  top: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  color: var(--color-white);
  border: 2px solid var(--color-gray);
  font-weight: bold;
  font-size: 15px;
  transition: 0.6s ease;
  background: var(--blueViolet);
  user-select: none;
  z-index: 10;
  right: 1%;
  bottom:0;

  &:hover{
    color:var(--blueViolet);
    background: var(--color-white);
  }

 & >*{

  pointer-events: none;

  }

}

.next {
  right: -1%;
  top: 45%;
transform: translate(-50%, -40%);
}
.prev {
  left: 3%;
  top: 45%;
transform: translate(-50%, -40%);
}

@media screen and (max-width: 40rem) {

  .prev, .next{
    font-size: 1rem;

  }

}

.prev:hover, .next:hover {
  background: var(--blueViolet) ;
  color:var(--color-white) ;
  
}

.expand{
  width: 100%;
}

.reduce_padding{
  padding: 0.7rem .5rem !important;
}


.videoBox{
    width: 100%;
    border-radius: 2rem;
    overflow: hidden;
    
}

.dir-control {
  --borderWidth: 1.5;
  --buttonColor: #4d004d;
  --bg: var(--color-white);
  --backdrop: transparent;
  --fontSize: 1;
  --horizontalPadding: 16;
  --verticalPadding: 8;
  background: var(--backdrop);
  border: calc(var(--borderWidth) * -1px) solid var(--buttonColor);
  border-radius: 1rem;
  text-align: center;
  line-height: 24px;
  margin-left: auto;

  text-transform: capitalize;

  /* box-shadow: calc(var(--boxShadowDepth) * 1px) calc(var(--boxShadowDepth) * 1px) 0 #888; */
  color: var(--textColor, var(--buttonColor));
  cursor: pointer;
  font-size: calc(var(--fontSize) * .85rem);
  font-weight: bold;
  font-family: sans-serif;
  outline: transparent;
  padding: calc(var(--verticalPadding) * .7px) calc(var(--horizontalPadding) * .7px);
  position: relative;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  transition: transform 0.2s;
  transform: translate(0, calc(var(--y, 0) * 1%)) scale(var(--scale, 1));
}

.dir-control:hover {
  --y: -5;
  --scale: 1.02;
}

.dir-control:active {
  /* box-shadow: 0 0 0 #888; */
  --y: 0;
  --scale: 0.95;
}

.dir-control span {
  -webkit-clip-path: var(--clip);
  bottom: calc(var(--borderWidth) * -3px);
  clip-path: var(--clip);
  left: calc(var(--borderWidth) * -3px);
  position: absolute;
  right: calc(var(--borderWidth) * -3px);
  top: calc(var(--borderWidth) * -3px);
  z-index: 1;
}

.dir-control span:nth-of-type(1):hover,
.dir-control span:nth-of-type(2):hover,
.dir-control span:nth-of-type(3):hover,
.dir-control span:nth-of-type(4):hover {
  --clip: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  z-index: 2;
}

.dir-control span:nth-of-type(1):hover ~ b:nth-of-type(1),
.dir-control span:nth-of-type(2):hover ~ b:nth-of-type(2),
.dir-control span:nth-of-type(3):hover ~ b:nth-of-type(3),
.dir-control span:nth-of-type(4):hover ~ b:nth-of-type(4) {
  --clip: inset(0 0 0 0);
}

.dir-control span:nth-of-type(1) {
  --clip: polygon(0 0, 100% 0, 50% 50%, 50% 50%);
}

.dir-control span:nth-of-type(2) {
  --clip: polygon(100% 0, 100% 100%, 50% 50%);
}

.dir-control span:nth-of-type(3) {
  --clip: polygon(0 100%, 100% 100%, 50% 50%);
}

.dir-control span:nth-of-type(4) {
  --clip: polygon(0 0, 0 100%, 50% 50%);
}

.dir-control b {
  -webkit-clip-path: var(--clip);
  background: var(--slideColor, var(--buttonColor));
  border: calc(var(--borderWidth) * 1px) solid var(--buttonColor);
  bottom: calc(var(--borderWidth) * -1px);
  font-weight: bold;
  clip-path: var(--clip);
  color: var(--bg, #fafafa);
  left: calc(var(--borderWidth) * -1px);
  padding: calc(var(--verticalPadding) * 1px) calc(var(--horizontalPadding) * 1px);
  position: absolute;
  right: calc(var(--borderWidth) * -1px);
  top: calc(var(--borderWidth) * -1px);
  transition: clip-path 0.25s ease;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dir-control b:nth-of-type(1) {
  --clip: inset(0 0 100% 0);
}

.dir-control b:nth-of-type(2) {
  --clip: inset(0 0 0 100%);
}

.dir-control b:nth-of-type(3) {
  --clip: inset(100% 0 0 0);
}

.dir-control b:nth-of-type(4) {
  --clip: inset(0 100% 0 0);
}

.dir-control--secondary {
  --buttonColor: hsl(0, 0%, 100%);
  --bg: hsl(0, 0%, 5%);
}

.dir-control--filled {
  --backdrop: var(--blueViolet-lyt);
  --slideColor: var(--blueViolet);
  --textColor: #4d004d;
  --bg: var(--color-white);
}


.current{
display: block;
position: relative;


&::before{
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    right: 0;
    height: 2px;
    background-color: var(--color-gray);
    transition: var(--transition);


}

&:active::before{
        width: 100% !important;
        left: 0 !important;
        background-color: yellow !important;
    }




}

.grid{
  display: grid;
  width:100%;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  align-items: start;
  /* place-items: center; */


  @media screen and (min-width: 45rem) {
      place-items:start;
      grid-template-columns:  1fr;

  }
  @media screen and (min-width: 65rem) {
      gap: 2rem;

  }
}
.grid-wrap{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  width: 100%;
  align-items: start;
  place-items: center;


  @media screen and (min-width: 45rem) {
      place-items:start;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  }
}

/*.hero{

  /* @media screen and (max-width: 64rem) {
    grid-template-columns: 24% 20% 20% 24%;
  } 

}*/

.lists{
width: 100%;
    .list{
        width: 100%;
        gap: 1rem;
        li{
        font-size: 1rem;
        line-height: 1.9rem;
        //text-align: center !important;
        width: 100%;
        word-wrap: normal;
        @media screen and (min-width: 45rem) {
         //   text-align: left !important;
        }
    }


       } 
     h2{
    letter-spacing: -1.296px;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    line-height: 2.5rem;
    word-wrap: normal;

    @media screen and (min-width: 45rem) {
        line-height: 3.5rem;
    font-size: 2.8rem;
    text-align: left;
    
}
       }
       button{
    background: var(--color-white);
    color: var( --primary-color);
    text-transform: capitalize;
    width: max-content;
    border-radius: 2rem;
    font-size: inherit;
    padding: 0.9rem 2.5rem;
    cursor: pointer;
    font-weight: bold;
    transition: var(--transition);
&:hover{
    color: var(--color-white) !important;
    background-color: var(--primary-color) !important;

}

}
}
.span-2{
    grid-column: span 1;

    @media screen and (min-width: 45rem) {
        grid-column: span 2;
    }
    
}

.brand{
width: fit-content;
margin-right: auto;
margin-left: 0;

@media screen and (min-width: 45rem) {
    margin-left: -53px;
    width: fit-content;
}
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

}


}

a{
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    text-decoration: none;
}

.cover{
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}



 [data-title] {
    position: relative; 
}

[data-title]::after {
content: attr(data-title);
width: 140px;
left: calc(50% - 70px);
background-color: #000000;
color: var(--primary-color);
font-size: 0.8rem;
text-align: center;
top: 125%;
font-weight: bold;
position: absolute;
padding: 1px 5px 2px;
transform: translateY(-10px);
transition: opacity 0.3s, transform 0.2s;
white-space: nowrap;
border-radius: 10px;
box-shadow: 1px 1px 3px #222222;
opacity: 0;
border: 1px solid #111111;
z-index: 99999;
visibility: hidden;
}

@media screen and (min-width: 64rem) {
  [data-title]:hover::after {
 opacity: 1 ;
 visibility: visible ;
 transform: translateY(0);
 
 } 
}
.reveal{
  opacity: 1 !important ;
visibility: visible !important ;
transform: translateY(0) !important;
pointer-events: all !important;

}


/* [data-title] {
  position: relative;
  cursor: pointer;
}
[data-title]::before,
[data-title]::after {
  line-height: 1;
  font-size: .9em;
  pointer-events: none;
  position: absolute;
  /* box-sizing: border-box; 
  display: none;
  opacity: 0;
}
[data-title]::before {
  content: "";
  border: 5px solid transparent;
  z-index: 100;
}
[data-title]::after {
  content: attr(data-title);
  text-align: center;
  min-width: 3em;
  max-width: 21em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 12px;
  border-radius: 9px;
  background: #4621FF;
  color: #FFFFFF;
  z-index: 99;
  text-shadow: 2px 0px 0px #800000;
}
[data-title]:hover::before,
[data-title]:hover::after {
  display: block !important;
  opacity: 1;
}
[data-title]:not([data-flow])::before,
[data-title][data-flow="top"]::before {
  bottom: 100%;
  border-bottom-width: 0;
  border-top-color: #4621FF;
}
[data-title]:not([data-flow])::after,
[data-title][data-flow="top"]::after {
  bottom: calc(100% + 5px);
}
[data-title]:not([data-flow])::before, [title]:not([data-flow])::after,
[data-title][data-flow="top"]::before,
[data-title][data-flow="top"]::after {
  left: 50%;
  -webkit-transform: translate(-50%, -4px);
          transform: translate(-50%, -4px);
}
[data-title][data-flow="bottom"]::before {
  top: 100%;
  border-top-width: 0;
  border-bottom-color: #4621FF;
}
[data-title][data-flow="bottom"]::after {
  top: calc(100% + 5px);
}
[data-title][data-flow="bottom"]::before, [data-title][data-flow="bottom"]::after {
  left: 50%;
  -webkit-transform: translate(-50%, 8px);
          transform: translate(-50%, 8px);
}
[data-title][data-flow="left"]::before {
  top: 50%;
  border-right-width: 0;
  border-left-color: #4621FF;
  left: calc(0em - 5px);
  -webkit-transform: translate(-8px, -50%);
          transform: translate(-8px, -50%);
}
[data-title][data-flow="left"]::after {
  top: 50%;
  right: calc(100% + 5px);
  -webkit-transform: translate(-8px, -50%);
          transform: translate(-8px, -50%);
}
[data-title][data-flow="right"]::before {
  top: 50%;
  border-left-width: 0;
  border-right-color: #4621FF;
  right: calc(0em - 5px);
  -webkit-transform: translate(8px, -50%);
          transform: translate(8px, -50%);
}
[data-title][data-flow="right"]::after {
  top: 50%;
  left: calc(100% + 5px);
  -webkit-transform: translate(8px, -50%);
          transform: translate(8px, -50%);
} */
/* [data-title=""]::after, [data-title=""]::before {
  display: none;
}  */

 /*  [data-title] {
    position: relative;  
}

[data-title]::after {
content: attr(data-title);
background-color: #000000;
color: var(--primary-color);
font-size: 150%;
position: absolute;
width: 140px;
text-align: center;
border-radius: 10px;
padding: 1px 5px 2px;
bottom: -1.6em;
left: 100%;
white-space: nowrap;
box-shadow: 1px 1px 3px #222222;
opacity: 0;
border: 1px solid #111111;
z-index: 99999;
visibility: hidden;
}

[data-title]:hover::after {
opacity: 1;
transition: all ease-in-out 0.5s;
visibility: visible;

} 
 */

`;
