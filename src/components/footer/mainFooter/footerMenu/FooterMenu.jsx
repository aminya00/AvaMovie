import "./FooterMenu.css"
import { Link } from "react-router-dom"

function FooterMenu() {
    return(
        <ul className="footer-menu-ul">
            <li className="footer-menu-li"><Link to={'/contact-us'}>تماس با ما</Link></li>
            <li className="footer-menu-li"><Link to={'/dmca'}>DMCA</Link></li>
            <li className="footer-menu-li"><Link to={'/common-question'}>سوالات متداول</Link></li>
            <li className="footer-menu-li"><Link to={'/buy-license'}>خرید اشتراک</Link></li>
            <li className="footer-menu-li"><Link to={'/'}>اپلیکیشن</Link></li>
        </ul>
    )
}

export default FooterMenu