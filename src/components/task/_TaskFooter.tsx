import React, {FC, ReactElement} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, FormControlLabel, Switch} from "@mui/material";
import {ITaskFooter} from "./interfaces/ITaskFooter";
import {Status} from "../../utils/enums/Status";

export const TaskFooter: FC<ITaskFooter> = ({
                                                onClick = (e) => console.log(e),
                                                onStatusChange = (e) => console.log(e),
                                                id,
                                                status
                                            }): ReactElement => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
        >
            <FormControlLabel control={<Switch
                defaultChecked={status === Status.inProgress}
                onChange={(e) => onStatusChange(e, id)}
                color="warning"/>}
                              label="In Progress"/>
            <Button onClick={(e) => onClick(e, id)} variant="contained" color="success" size="small"
                    sx={{color: '#FFFFFF'}}>
                Mark Complete
            </Button>
        </Box>
    );
};

TaskFooter.propTypes = {
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    status: PropTypes.string
};




import React, {createContext, useContext, useState} from "react";
import {getAllChats} from "../services/chatsApi";
import {ChatContextType, IChat, IChats} from "../../types";
import {perPage} from "../utils/consts/pagePaginationSize";
import {useAuth} from "./AuthContext";

export const ChatContext = createContext<ChatContextType>(
    {} as ChatContextType
);

export const useChat = () => useContext(ChatContext);

const ChatProvider: React.FC<{ children: any }> = ({children}) => {
    const {logout,setError} = useAuth();

    const [currentChat, setCurrentChat] = useState<IChat[] | null>(null)
    const [page, setPage] = useState<number>(1)
    const [chats, setChats] = useState<IChat[] | null>(null)
    const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
    const [projectId, setProjectId] = useState(1)
    const fetchChats = (page: number) => {
        getAllChats("chats", {pagination: {page, perPage}})
            .then((data: IChats | undefined) => {
                if (data) {
                    setTotalPages(Math.ceil(data.total / perPage));
                    setChats([...data.response]);
                    return;
                }
            })
            .catch((error) => {
                if (error?.response?.status === 422) {
                    logout()
                    setError("Your token were expired")
                }
                if (error?.response?.status === 403) {
                    setError("You don't have all permissions")

                } else {
                    setError("Server Error")
                }
            })
    };
    return (
        <ChatContext.Provider value={{chats, totalPages, fetchChats, projectId,setProjectId,currentChat,setCurrentChat,page,setPage}}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
