import React from "react";
import palette from "../colours";
import Roundel from "./roundel";

const Header = () => (
    <header
        css={{
            backgroundColor: palette.neutral.header,
            color: palette.neutral["1"],
            height: "2.8125rem",
            "border-bottom-width":"0.8px",
            "border-bottom-color":"rgba(0, 0, 0, 0.14)",
            "border-bottom-style":"solid"

        }}
    >
        <div css={{
            "padding-left": "1.25rem",
            "padding-right": "1.25rem",
            "max-width": "71.25rem",
            "font-size": "0.875rem",
            "line-height": "1.25rem"
        }}>
            <span>My Account</span>
            <Roundel size={56} />
        </div>
    </header>
);

export default Header;