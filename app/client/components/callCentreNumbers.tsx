import React from "react";
import { Accordion } from "./accordion";

export const CallCentreNumbers = () => (
  <Accordion>
    <div title="United Kingdom, Europe and rest of world">
      <div>
        <b>+ 44 (0) 330 333 6790</b>
      </div>
      <div>8am - 8pm on weekdays, 8am-6pm at weekends (GMT/BST)</div>
    </div>
    <div title="Australia, New Zealand, and Asia Pacific">
      <div>
        <b>1800 773 766</b> (within Australia)
      </div>
      <div>
        <b>+61 2076 8599</b> (outside Australia)
      </div>
      <div>9am - 5pm Monday - Friday (AEDT) ​​</div>
    </div>
    <div title="Canada and USA">
      <div>
        <b>1-844-632-2010</b> (toll free USA)
      </div>
      <div>
        <b>+1 917-900-4663</b> (outside USA)
      </div>
      <div>9:15am - 6pm Monday - Friday (EST)</div>
    </div>
  </Accordion>
);
