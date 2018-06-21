import { Link, Router, ServerLocation } from "@reach/router";
import React from "react";
import { injectGlobal } from "../styles/emotion";
import { fonts } from "../styles/fonts";
import global from "../styles/global";
import { ContributionsFlow } from "./cancel/contributionsFlow";
import { FreeMembershipFlow } from "./cancel/freeMembershipFlow";
import { NotFound } from "./cancel/notFound";
import { PaidMembershipFlow } from "./cancel/paidMembershipFlow";
import { AreYouSure } from "./cancel/stages/areYouSure";
import { ExecuteCancellation } from "./cancel/stages/executeCancellation";
import { GenericSaveAttempt } from "./cancel/stages/genericSaveAttempt";
import { CardProps } from "./card";
import { Main } from "./main";
import {
  loadMembershipData,
  MembersDataApiResponse,
  Membership
} from "./membership";

export interface Subscription {
  subscriberId: string;
  start: string;
  end: string;
  cancelledAt: boolean;
  nextPaymentDate: string;
  card?: CardProps;
  plan: {
    amount: number;
    currency: string;
  };
}

export interface WithSubscription {
  subscription: Subscription;
}

const zuoraCancellationReasonMapping: { [zuoraReasonKey: string]: string } = {
  mma_editorial: "I am unhappy with Guardian journalism",
  mma_support_another_way:
    "I am going to support The Guardian in another way, eg. by subscribing",
  mma_values: "I don't feel that the Guardian values my support",
  mma_payment_issue: "I didn't expect The Guardian to take another payment",
  mma_health: "Ill-health",
  mma_none: "None of the membership benefits are of interest to me",
  mma_financial_circumstances: "A change in my financial circumstances",
  mma_other: "Other"
};

export const CancellationReasonContext: React.Context<
  string
> = React.createContext("");

export const CancellationCaseIdContext: React.Context<
  string
> = React.createContext("");

export const MembersDataApiResponseContext: React.Context<
  MembersDataApiResponse
> = React.createContext({});

export const formatDate = (shortForm: string) => {
  return new Date(shortForm).toDateString();
};

const User = () => (
  <Main>
    {injectGlobal`${global}`}
    {injectGlobal`${fonts}`}

    <Router>
      <Membership path="/" />

      <PaidMembershipFlow path="/cancel/membership">
        {Object.keys(zuoraCancellationReasonMapping).map(
          (zuoraReason: string) => (
            <GenericSaveAttempt
              sfProduct="Membership"
              key={zuoraReason}
              path={zuoraReason}
              linkLabel={zuoraCancellationReasonMapping[zuoraReason]}
            >
              <AreYouSure path="areYouSure">
                <ExecuteCancellation
                  path="confirmed"
                  cancelApiUrlSuffix="membership"
                  cancelType="membership"
                  withSubscriptionPromiseFetcher={loadMembershipData}
                />
              </AreYouSure>
            </GenericSaveAttempt>
          )
        )}
        {/*TODO add special case for mma_health*/}
      </PaidMembershipFlow>

      <FreeMembershipFlow path="/cancel/friend" />

      <ContributionsFlow path="/cancel/contributions" />

      <NotFound default={true} />
    </Router>
  </Main>
);

export const ServerUser = (url: string) => (
  <ServerLocation url={url}>
    ...{/* wait for https://github.com/reach/router/issues/27 fix and then re-enable */}
  </ServerLocation>
);

export const BrowserUser = <User />;
