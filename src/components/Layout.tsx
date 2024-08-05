import React, { FC, memo, ReactNode } from "react";
import { Workspace } from "./Workspace.styled";

const Layout: FC<{ children: ReactNode[] }> = ({ children }) => {
    return (
        <Workspace>
            {children}
        </Workspace>
    );
}

export default memo(Layout);