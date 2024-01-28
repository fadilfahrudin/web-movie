import { CSSProperties } from "react"

const LoadPage = ({ opacity }: { opacity?: number }) => {
    const styles: CSSProperties = {
        opacity: opacity ?? 1
    }
    return (
        <div style={styles} className="loadPage">
            <div className="loader">
                <p>Please Wait</p>
                <div className="dot-wrapper">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </div>
    )
}

export default LoadPage