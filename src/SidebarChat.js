import { Avatar } from '@material-ui/core'
import React from 'react'
import "./sidebarChat.css"
//import { Avatar } from "@material-ui/core"
function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>Room Name</h2>
                <p>This is last msg</p>
            </div>
        </div>
    )
}

export default SidebarChat
