import { Avatar } from "@mui/material";

export const FormCircleGrey = ({ text }) => (
    <Avatar children={text} sx={{ 
        backgroundColor: "white", 
        color: "#80837E7E",
        margin: "0.1em", 
        border: `#80837E7E solid 0.1em`
    }} />
)