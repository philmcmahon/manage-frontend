export type OphanProduct =
  | "CONTRIBUTION"
  | "RECURRING_CONTRIBUTION"
  | "MEMBERSHIP_SUPPORTER"
  | "MEMBERSHIP_PATRON"
  | "MEMBERSHIP_PARTNER"
  | "DIGITAL_SUBSCRIPTION"
  | "PRINT_SUBSCRIPTION";

export type OphanAction =
  | "INSERT"
  | "VIEW"
  | "EXPAND"
  | "LIKE"
  | "DISLIKE"
  | "SUBSCRIBE"
  | "ANSWER"
  | "VOTE"
  | "CLICK";

export type OphanComponentType =
  | "READERS_QUESTIONS_ATOM"
  | "QANDA_ATOM"
  | "PROFILE_ATOM"
  | "GUIDE_ATOM"
  | "TIMELINE_ATOM"
  | "NEWSLETTER_SUBSCRIPTION"
  | "SURVEYS_QUESTIONS"
  | "ACQUISITIONS_EPIC"
  | "ACQUISITIONS_ENGAGEMENT_BANNER"
  | "ACQUISITIONS_THANK_YOU_EPIC"
  | "ACQUISITIONS_HEADER"
  | "ACQUISITIONS_FOOTER"
  | "ACQUISITIONS_INTERACTIVE_SLICE"
  | "ACQUISITIONS_NUGGET"
  | "ACQUISITIONS_STANDFIRST"
  | "ACQUISITIONS_THRASHER"
  | "ACQUISITIONS_EDITORIAL_LINK"
  | "ACQUISITIONS_BUTTON"
  | "ACQUISITIONS_OTHER";

export interface OphanComponent {
  componentType: string; // TODO OphanComponentType;
  id?: string;
  products?: string[]; // TODO OphanProduct[];
  campaignCode?: string;
  labels?: string[];
}

export interface OphanComponentEvent {
  component: OphanComponent;
  action: OphanAction;
  value?: string;
}
