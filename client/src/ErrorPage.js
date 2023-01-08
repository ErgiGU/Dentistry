import './ErrorPage.css'

export default function ErrorPage() {
    return (
        <div>
            <div id="error-main">
                <hr id="error-horizontal-rule"/>
                <div id="error-oops"> 500 Server Error</div>
                <br/>
                <div id="error-content">
                    Oops! Seems like something went wrong.
                    We are currently trying to fix the problem. <br/> <br/>
                    In the meantime, you can: <br/>
                    Refresh the page <br/>
                    Or try again later
                </div>
            </div>
        </div>
    )
}