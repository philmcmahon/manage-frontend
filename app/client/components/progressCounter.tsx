import React from "react";
import palette from "../colours";
import { minWidth } from "../styles/breakpoints";
import { css } from "../styles/emotion";
import { sans } from "../styles/fonts";

const RADIUS = 40;
const FONT_SIZE = 16;

const containerCss = css({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  marginBottom: "40px",
  padding: "0 20px",

  [minWidth.tablet]: {
    padding: "0 100px"
  }
});

const processCounterCss = (current: number, total: number, n: number) =>
  css({
    transitionProperty: "background",
    transitionDuration: "0.2s",
    fontFamily: sans,
    color: n === current ? palette.neutral["5"] : palette.neutral["1"],
    border: `1px solid ${palette.neutral["2"]}`,
    minHeight: `${RADIUS}px`,
    minWidth: `${RADIUS}px`,
    borderRadius: `${RADIUS}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    span: {
      fontSize: `${FONT_SIZE}px`,
      paddingTop: `${FONT_SIZE / 8}px`, // magic number to visually center the number because numbers dont have descenders
      margin: 0
    },
    ...(n < current && {
      background: palette.neutral["5"]
    }),
    ...(n === current && {
      background: palette.neutral["2"]
    })
  });

const spacerCss = css({
  height: "1px",
  flexBasis: `${RADIUS * 3}px`,
  background: palette.neutral["2"],
  flexGrow: "1",
  margin: "0 10px",

  [minWidth.phablet]: {
    margin: "0 20px"
  }
});

export const ProgressCounter = ({
  current,
  total
}: {
  current: number;
  total: number;
}) => {
  const a = Array(total)
    .fill(0)
    .map((_, i) => i + 1)
    .map((e, i, arr) => (i < arr.length - 1 ? [e, 0] : [e]))
    .reduce((prev, curr) => prev.concat(curr))
    .map((n, i) => {
      if (n === 0) {
        return <div className={spacerCss} key={i} />;
      }

      return (
        <div className={processCounterCss(current, total, n)} key={i}>
          <span>{n}</span>
        </div>
      );
    });
  return <div className={containerCss}>{a}</div>;
};
