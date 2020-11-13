import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import "./Chat.css"
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from "@material-ui/icons/Mic"

function Chat(){
    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                <p className="chat_message">
                    <span className="chat_name">Name</span>
                    This is a message
                    <spane className="chat_timestamp">{new Date().toUTCString()}</spane>
                </p>
                <p className="chat_receiver chat_message">
                    <span className="chat_name">Name</span>
                    This is a message
                    <spane className="chat_timestamp">{new Date().toUTCString()}</spane>
                </p>
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input 
                        placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
export default Chat