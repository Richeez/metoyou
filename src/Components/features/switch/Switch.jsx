/* eslint-disable react/prop-types */
import { CheckBox, Label, Slider, SwitcherCont } from "./styledSwitch";

const Switch = ({ stick, trust }) => {
  return (
    <>
      <SwitcherCont>
        <Label>
          <CheckBox checked={trust === true} onChange={stick} type="checkbox" />
          <Slider />
        </Label>
      </SwitcherCont>
    </>
  );
};

export default Switch;
