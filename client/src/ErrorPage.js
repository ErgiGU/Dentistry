import './ErrorPage.css'
export default function ErrorPage(){
    return(
        <>
            <div id="main">
                <hr id="horizontal-rule"/>
                    <div id="oops"> 500 Server Error
                    </div>
                    <br/>
                <div id="content">
                  Oops! Seems like something went wrong.
                    We are currently trying to fix the problem. <br/> <br/>
                    In the meantime, you can: <br/>
                    Refresh the page <br/>
                    Or try again later
                </div>
            </div>
        </>
    )
}
