import {colorPalette} from '../../utils/design';
import Paper from '@material-ui/core/Paper';


function ContactUs() {

    return (
        <div style={{backgroundColor: colorPalette.gray, boxSizing: "border-box", display: "flex", justifyContent: "center", height: "calc(100vh - 67px)"}}>
            <Paper elevation={5} style={{overflow: "scroll", margin: "5%", width: "30%", height: "80%", display: "flex", flexDirection: "column"}}>
                <div style={{marginTop: "10%"}}>
                    <h1 style={{fontFamily: "garamond, serif"}}>Contact Us!</h1>
                </div>
                <hr style={{backgroundColor: colorPalette.darkGray, width: "80%", marginBottom: "10%"}}/>
                <div style={{width: "80%"}}>
                    <h5 style={{fontFamily: "garamong, serif"}}><strong>Nash Philbeck</strong>: Owner <br /><a href="mailto:hnashp@email.unc.edu">hnashp@email.unc.edu</a></h5>
                </div>
            </Paper>
        </div>
    )
}

export default ContactUs;