import React from "react";
import {
  CancellationReason,
  OptionalCancellationReasonId
} from "../client/components/cancel/cancellationReason";
import { contributionsCancellationFlowStart } from "../client/components/cancel/contributions/contributionsCancellationFlowStart";
import { contributionsCancellationReasons } from "../client/components/cancel/contributions/contributionsCancellationReasons";
import { membershipCancellationFlowStart } from "../client/components/cancel/membership/membershipCancellationFlowStart";
import { membershipCancellationReasons } from "../client/components/cancel/membership/membershipCancellationReasons";
import { MeValidator } from "../client/components/checkFlowIsValid";
import { NavItem, navLinks } from "../client/components/nav";
import { MeResponse } from "./meResponse";
import { formatDate, Subscription } from "./productResponse";

export type ProductFriendlyName =
  | "membership"
  | "recurring contribution" // TODO use payment frequency instead of 'recurring' e.g. monthly annual etc
  | "newspaper subscription"
  | "digital pack"
  | "Guardian Weekly";
export type ProductUrlPart =
  | "membership"
  | "contributions"
  | "paper"
  | "digitalpack"
  | "guardianweekly";
export type SfProduct = "Membership" | "Contribution";
export type ProductTitle = "Membership" | "Contributions" | "Digital Pack";
export type AllProductsProductTypeFilterString =
  | "Weekly"
  | "Paper"
  | "Contribution"
  | "Membership"
  | "Digipack";

export interface CancellationFlowProperties {
  reasons: CancellationReason[];
  sfProduct: SfProduct;
  linkOnProductPage?: true;
  startPageBody: JSX.Element;
  saveTitlePrefix?: string;
  summaryMainPara: (subscription: Subscription) => JSX.Element | string;
  summaryReasonSpecificPara: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  onlyShowSupportSectionIfAlternateText: boolean;
  alternateSupportButtonText: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  alternateSupportButtonUrlSuffix: (
    reasonId: OptionalCancellationReasonId
  ) => string | undefined;
  swapFeedbackAndContactUs?: true;
}

export interface ProductPageProperties {
  title: ProductTitle;
  navLink: NavItem;
  noProductInTabCopy: string;
  updateAmountMdaEndpoint?: string;
  tierRowLabel?: string; // no label means row is not displayed;
  tierChangeable?: true;
  showSubscriberId?: true;
  showTrialRemainingIfApplicable?: true;
}

export interface ProductType {
  friendlyName: ProductFriendlyName;
  allProductsProductTypeFilterString: AllProductsProductTypeFilterString;
  urlPart: ProductUrlPart;
  validator: MeValidator;
  includeGuardianInTitles?: true;
  alternateReturnToAccountDestination?: string;
  noProductSupportUrlSuffix?: string;
  productPage?: ProductPageProperties; // undefined 'productPage' means no product page
  cancellation?: CancellationFlowProperties; // undefined 'cancellation' means no cancellation flow
}

export interface ProductTypeWithCancellationFlow extends ProductType {
  cancellation: CancellationFlowProperties;
}
export const hasCancellationFlow = (
  productType: ProductType
): productType is ProductTypeWithCancellationFlow =>
  productType.cancellation !== undefined;

export interface ProductTypeWithProductPage extends ProductType {
  productPage: ProductPageProperties;
}
export const hasProductPage = (
  productType: ProductType
): productType is ProductTypeWithProductPage =>
  productType.productPage !== undefined;

export interface WithProductType<ProductTypeVariant extends ProductType> {
  productType: ProductTypeVariant;
}

export const createProductDetailFetcher = (
  productType: ProductType,
  subscriptionName?: string
) => async () =>
  await fetch(
    "/api/me/mma" +
      (subscriptionName
        ? `/${subscriptionName}`
        : `?productType=${productType.allProductsProductTypeFilterString}`),
    {
      credentials: "include",
      mode: "same-origin"
    }
  );

const domainSpecificSubsManageURL = `https://subscribe.${
  typeof window !== "undefined" && window.guardian && window.guardian.domain
    ? window.guardian.domain
    : "theguardian.com"
}/manage`;

export const ProductTypes: { [productKey: string]: ProductType } = {
  membership: {
    friendlyName: "membership",
    allProductsProductTypeFilterString: "Membership",
    urlPart: "membership",
    validator: (me: MeResponse) => me.contentAccess.member,
    productPage: {
      title: "Membership",
      navLink: navLinks.membership,
      noProductInTabCopy:
        "To manage your existing contribution or subscription, please select from the tabs above.",
      tierRowLabel: "Membership tier",
      tierChangeable: true
    },
    includeGuardianInTitles: true,
    cancellation: {
      reasons: membershipCancellationReasons,
      sfProduct: "Membership",
      startPageBody: membershipCancellationFlowStart,
      summaryMainPara: (subscription: Subscription) =>
        subscription.end ? (
          <>
            You will continue to receive the benefits of your membership until{" "}
            <b>{formatDate(subscription.end)}</b>. You will not be charged
            again.
          </>
        ) : (
          "Your cancellation is effective immediately."
        ),
      summaryReasonSpecificPara: () => undefined,
      onlyShowSupportSectionIfAlternateText: false,
      alternateSupportButtonText: () => undefined,
      alternateSupportButtonUrlSuffix: () => undefined
    }
  },
  contributions: {
    friendlyName: "recurring contribution",
    allProductsProductTypeFilterString: "Contribution",
    urlPart: "contributions",
    validator: (me: MeResponse) => me.contentAccess.recurringContributor,
    noProductSupportUrlSuffix: "/contribute",
    productPage: {
      title: "Contributions",
      navLink: navLinks.contributions,
      noProductInTabCopy:
        "To manage your existing membership or subscription, please select from the tabs above.",
      updateAmountMdaEndpoint: "contribution-update-amount"
    },
    cancellation: {
      linkOnProductPage: true,
      reasons: contributionsCancellationReasons,
      sfProduct: "Contribution",
      startPageBody: contributionsCancellationFlowStart,
      saveTitlePrefix: "Reason: ",
      summaryMainPara: () => "Thank you for your valuable support.",
      summaryReasonSpecificPara: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "You can support The Guardian’s independent journalism with a single contribution, from as little as £1 – and it only takes a minute.";
          case "mma_wants_annual_contribution":
            return "You can support The Guardian’s independent journalism for the long term with an annual contribution.";
          case "mma_wants_monthly_contribution":
            return "You can support The Guardian’s independent journalism for the long term with a monthly contribution.";
          default:
            return undefined;
        }
      },
      onlyShowSupportSectionIfAlternateText: true,
      alternateSupportButtonText: (reasonId: OptionalCancellationReasonId) => {
        switch (reasonId) {
          case "mma_financial_circumstances":
          case "mma_value_for_money":
          case "mma_one_off":
            return "Make a single contribution";
          case "mma_wants_annual_contribution":
            return "Make an annual contribution";
          case "mma_wants_monthly_contribution":
            return "Make a monthly contribution";
          default:
            return undefined;
        }
      },
      alternateSupportButtonUrlSuffix: (
        reasonId: OptionalCancellationReasonId
      ) => {
        switch (reasonId) {
          /*TODO tweak the support url to preselect single/monthly/annual once functionality is available*/
          default:
            return "/contribute";
        }
      },
      swapFeedbackAndContactUs: true
    }
  },
  newspaper: {
    friendlyName: "newspaper subscription",
    allProductsProductTypeFilterString: "Paper",
    urlPart: "paper",
    validator: (me: MeResponse) => me.contentAccess.paperSubscriber,
    includeGuardianInTitles: true,
    alternateReturnToAccountDestination: domainSpecificSubsManageURL
  },
  guardianweekly: {
    friendlyName: "Guardian Weekly",
    allProductsProductTypeFilterString: "Weekly",
    urlPart: "guardianweekly",
    validator: (me: MeResponse) => true, // TODO: change to me.contentAccess.weeklySubscriber once exposed by members-data-api
    alternateReturnToAccountDestination: domainSpecificSubsManageURL
  },
  digipack: {
    friendlyName: "digital pack",
    allProductsProductTypeFilterString: "Digipack",
    urlPart: "digitalpack",
    validator: (me: MeResponse) => me.contentAccess.digitalPack,
    productPage: {
      title: "Digital Pack",
      navLink: navLinks.digitalPack,
      noProductInTabCopy:
        "To manage your existing membership or contribution, please select from the tabs above.",
      tierRowLabel: "Subscription product",
      showSubscriberId: true,
      showTrialRemainingIfApplicable: true
    }
  }
};
