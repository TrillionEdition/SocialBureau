// function AnalyticsWidget() {
//     return (
//         <iframe width="600" height="450" src="https://lookerstudio.google.com/embed/reporting/b9689722-567e-428a-9661-5fa539bc2e18/page/paqlF"
//             frameborder="0"
//             style="border:0"
//             allowfullscreen
//             sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
//         </iframe>
//     );
// }

import { Contact } from "../pages/Contact";
import Footer from "./Footer";

// export default AnalyticsWidget;




function AnalyticsWidget() {
    return (
        <div className="analytics-wrapper">
            <iframe
                // src="https://lookerstudio.google.com/embed/reporting/b9689722-567e-428a-9661-5fa539bc2e18/page/paqlF"
                src="https://lookerstudio.google.com/embed/reporting/b9689722-567e-428a-9661-5fa539bc2e18/page/paqlF"
                width="100%"
                height="1500 px"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="tics"
            />

        </div>
    )
}

export default AnalyticsWidget;
