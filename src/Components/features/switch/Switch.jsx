/* eslint-disable react/prop-types */
import { CheckBox, Label, Slider, SwitcherCont } from "./styledSwitch";

const Switch = ({ action, isChecked }) => {
  return (
    <>
      <SwitcherCont>
        <Label>
          <CheckBox
            checked={isChecked === true}
            onChange={action}
            type="checkbox"
          />
          <Slider />
        </Label>
      </SwitcherCont>
    </>
  );
};

export default Switch;
