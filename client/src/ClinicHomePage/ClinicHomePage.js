import Card from './Card'
import PrivateNavbar from "../common_components/PrivateNavbar";
import jwt from "jsonwebtoken";
function ClinicHomePage() {

    const clinic = jwt.decode(localStorage.token,'something');

    return (

        <>
        <PrivateNavbar/>
            <Card/>
        </>
    );
}
export default ClinicHomePage