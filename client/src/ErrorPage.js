import './ErrorPage.css'
import Tooth from './assets/Unhealthy-Tooth.svg'
import PatientNavbar from "./common_components/PatientNavbar";

export default function ErrorPage() {
    return (
        <div>
            <PatientNavbar/>
            <div id="error-main" className={'col position-absolute top-50 start-50 translate-middle'}>
                <div className={'row justify-content-center'}>
                    <img id={'brokenTooth'} src={Tooth} alt={'broken tooth'}/>
                </div>
                <hr id="error-horizontal-rule"/>
                <div id="error-oops"> 500 Server Error</div>
                <br/>
                <div id="error-content">
                    Oops! Seems like something went wrong.<br/>
                    We are currently trying to fix the problem.<br/>
                    Navigate to the page you were and try again.
                </div>
            </div>
        </div>
    )
}