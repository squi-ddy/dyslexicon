import { Global } from "@emotion/react"
import OpenDyslexicUrl from "/OpenDyslexic-Regular.otf"

export function Fonts() {
    return (
        <Global
            styles={`
            @font-face {
                font-family: 'OpenDyslexic';
                font-style: normal;
                font-weight: 400;
                src: url('${OpenDyslexicUrl}') format('opentype');
            }
        `}
        />
    )
}
