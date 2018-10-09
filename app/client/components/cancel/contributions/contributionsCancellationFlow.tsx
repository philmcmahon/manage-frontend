import React from "react";
import { ProductTypes } from "../../../../shared/productTypes";
import { CheckFlowIsValid } from "../../checkFlowIsValid";
import { RouteableStepProps } from "../../wizardRouterAdapter";

export const ContributionsCancellationFlow = (props: RouteableStepProps) => (
  <CheckFlowIsValid
    supportRefererSuffix="cancellation_flow"
    {...ProductTypes.contributions}
  >
    <h1>Coming Soon</h1>
  </CheckFlowIsValid>
);
