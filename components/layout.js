import { useEffect, useState } from "react"
import { backgroundStyle, formStyle } from "./styles"

export default function Layout({ children }) {
    const [divStyle, setDivStyle] = useState(null)
    useEffect(() => {
        const breakpointStyle = formStyle(window.innerWidth)
        setDivStyle(breakpointStyle)    
    }, [])
    
    return (
        <div style={backgroundStyle}>
            <div style={divStyle}>
                {children}
            </div>
        </div>
    )
}
