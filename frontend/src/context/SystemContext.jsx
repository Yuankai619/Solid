import {
    createContext,
    useContext,
    useState,
} from "react";

import PropTypes from "prop-types";


const SystemContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSystem = () => useContext(SystemContext);

export function SystemProvider({ children }) {
    const [curConversationId, setCurConversationId] = useState(null);
    const handleSetCurConversationId = (_id) => {
        setCurConversationId(_id);
    }
    const value = {
        curConversationId,
        setCurConversationId,
    };

    return (
        <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
    );
}

SystemProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
