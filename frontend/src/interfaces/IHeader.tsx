import React from "react";

export default interface IHeader {
    page: string;
    FirstNavigationLink: React.FC;
    SecondNavegationLink: React.FC;
    logged: boolean;
    setLogin: (value: boolean) => void;
}