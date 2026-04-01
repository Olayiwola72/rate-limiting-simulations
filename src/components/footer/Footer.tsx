import "./Footer.scss";
import { getCurrentYear } from "../../utils/date";
import { footerLinks } from "../../config/footerLinks";

function Footer() {
    const year = getCurrentYear();

    return (
        <footer className="site-footer">
            <div className="site-footer__content">
                <div className="site-footer__actions">
                    {footerLinks.map((link, idx) => {
                        if (link.type === "icon") {
                            return (
                                <a
                                    key={idx}
                                    className="site-footer__icon-link"
                                    href={link.href}
                                    target={link.target}
                                    rel={link.rel}
                                    aria-label={link.ariaLabel}
                                    title={link.title}
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d={link.iconPath} />
                                    </svg>
                                </a>
                            );
                        }

                        if (link.type === "text") {
                            return (
                                <a
                                    key={idx}
                                    className="site-footer__resume-link"
                                    href={link.href}
                                    target={link.target}
                                    rel={link.rel}
                                >
                                    {link.label}
                                </a>
                            );
                        }

                        if (link.type === "button") {
                            return (
                                <a
                                    key={idx}
                                    className="site-footer__hire-btn"
                                    href={link.href}
                                    target={link.target}
                                    rel={link.rel}
                                >
                                    {link.label}
                                </a>
                            );
                        }

                        return null;
                    })}
                </div>

                <p className="site-footer__text">© {year} Rate Limiting Simulations.</p>
            </div>
        </footer>
    );
}

export default Footer;
