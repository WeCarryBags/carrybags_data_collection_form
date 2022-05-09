import { Avatar } from "@mui/material";

export const FormCircle = ({ text, backgroundColor }) => (
    <Avatar children={text} sx={{ 
        backgroundColor: backgroundColor, 
        margin: "0.1em" }} />
)