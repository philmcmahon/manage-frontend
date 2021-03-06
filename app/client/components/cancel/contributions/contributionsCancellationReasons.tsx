import { Link } from "@reach/router";
import React from "react";
import palette from "../../../colours";
import { CancellationReason } from "../cancellationReason";

const standardContributionsSaveBody =
  "It would be really helpful for us to understand a bit more about your reason for cancelling.";

const standardContributionsFeedbackIntro =
  "Please submit your comments in the box below. Thank you.";

export const contributionsCancellationReasons: CancellationReason[] = [
  {
    reasonId: "mma_article",
    linkLabel: "As a result of a specific article I read",
    saveTitle: "As a result of a specific article you read",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_editorial",
    linkLabel: "I disagree with some editorial decisions",
    saveTitle: "You disagree with some of The Guardian’s editorial decisions",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_values",
    linkLabel: "I don’t feel that The Guardian values my support",
    saveTitle: "You don’t feel that The Guardian values your support",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_support_another_way",
    linkLabel: "I support in another way, e.g. with a subscription",
    saveTitle:
      "You support The Guardian in another way, e.g. with a subscription",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_financial_circumstances",
    linkLabel: "I can no longer afford it",
    saveTitle: "You can no longer afford your current contribution",
    saveBody: (
      <>
        We understand that financial circumstances change, and your current
        contribution might not suit you right now. To change your contribution
        amount yourself, please go to{" "}
        <Link
          css={{
            textDecoration: "underline",
            color: palette.blue.dark,
            ":visited": { color: palette.blue.dark }
          }}
          to="/contributions"
        >
          manage your account
        </Link>
      </>
    ),
    skipFeedback: true
  },
  {
    reasonId: "mma_value_for_money",
    linkLabel: "I wasn’t getting value for money",
    saveTitle: "You don’t feel your contribution offers you adequate value",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_payment_issue",
    linkLabel: "A payment issue",
    saveTitle: "You have experienced an issue with your payment",
    saveBody: (
      <>
        <p>
          You can review your payment method and update your details in the{" "}
          <Link
            css={{
              textDecoration: "underline",
              color: palette.blue.dark,
              ":visited": { color: palette.blue.dark }
            }}
            to={"/contributions"}
          >
            manage your account
          </Link>{" "}
          section, without the need to cancel your contribution.
        </p>
        <p>{standardContributionsSaveBody}</p>
      </>
    ),
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_direct_debit",
    linkLabel: "I want to change to Direct Debit",
    saveTitle: "You would prefer to contribute using Direct Debit",
    saveBody:
      "Unfortunately it's not yet possible to switch to paying by Direct Debit online. We’re working on it. To make this change, please contact our customer services team, who will be happy to help you.",
    skipFeedback: true
  },
  {
    reasonId: "mma_one_off",
    linkLabel: "I would rather make a single contribution",
    saveTitle: "You would prefer to make a single contribution",
    saveBody: (
      <>
        <p>
          After cancelling your monthly or annual contribution, we will show you
          how to make a single contribution quickly and easily.
        </p>
        <p>{standardContributionsSaveBody}</p>
      </>
    ),
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_wants_annual_contribution",
    linkLabel: "I would rather make an annual contribution",
    saveTitle: "You would prefer to make an annual contribution",
    saveBody: (
      <>
        <p>
          After cancelling your monthly contribution, we will show you how to
          set up an annual contribution quickly and easily.
        </p>
        <p>{standardContributionsSaveBody}</p>
      </>
    ),
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_wants_monthly_contribution",
    linkLabel: "I would rather make a monthly contribution",
    saveTitle: "You would prefer to make a monthly contribution",
    saveBody: (
      <>
        <p>
          After cancelling your annual contribution, we will show you how to set
          up an monthly contribution quickly and easily.
        </p>
        <p>{standardContributionsSaveBody}</p>
      </>
    ),
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  },
  {
    reasonId: "mma_health",
    linkLabel: "Ill-health",
    saveTitle:
      "You would like to cancel your contribution due to health reasons",
    saveBody:
      "Your contributions have ensured that our quality journalism remains open for everyone to read and enjoy. Please confirm your cancellation below.",
    skipFeedback: true
  },
  {
    reasonId: "mma_other",
    linkLabel: "None of the above",
    saveTitle: "",
    saveBody: standardContributionsSaveBody,
    alternateFeedbackIntro: standardContributionsFeedbackIntro
  }
];
