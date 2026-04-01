// utils/footerLinks.ts
export interface FooterLink {
    type: "icon" | "text" | "button";
    label?: string;
    href: string;
    ariaLabel?: string;
    title?: string;
    iconPath?: string; // only for SVG icons
    target?: "_blank" | "_self";
    rel?: string;
}

export const footerLinks: FooterLink[] = [
    // Home Icon
    {
        type: "icon",
        href: "/",
        ariaLabel: "Home",
        title: "Home",
        iconPath: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z",
        target: "_self",
    },
    // LinkedIn
    {
        type: "icon",
        href: "https://www.linkedin.com/in/olayiwola-akinnagbe/",
        ariaLabel: "LinkedIn",
        title: "LinkedIn",
        iconPath:
            "M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3C4.16 3 3.26 3.9 3.26 5C3.26 6.09 4.16 7 5.25 7C6.35 7 7.25 6.09 7.25 5C7.25 3.9 6.35 3 5.25 3ZM20.75 13.16C20.75 9.86 18.99 8.33 16.64 8.33C14.73 8.33 13.87 9.38 13.39 10.12V8.5H10V19.5H13.39V13.97C13.39 12.51 13.67 11.09 15.48 11.09C17.26 11.09 17.28 12.76 17.28 14.06V19.5H20.75V13.16Z",
        target: "_blank",
        rel: "noreferrer",
    },
    // Twitter
    {
        type: "icon",
        href: "https://twitter.com/OlayiwolaAkinn1",
        ariaLabel: "Twitter",
        title: "Twitter",
        iconPath:
            "M18.9 2H22L15.23 9.74L23.2 22H16.95L12.06 14.57L5.56 22H2.45L9.7 13.71L2.05 2H8.45L12.87 8.8L18.9 2ZM17.81 20.03H19.53L7.51 3.86H5.67L17.81 20.03Z",
        target: "_blank",
        rel: "noreferrer",
    },
    // GitHub
    {
        type: "icon",
        href: "https://github.com/Olayiwola72",
        ariaLabel: "GitHub",
        title: "GitHub",
        iconPath:
            "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.997.108-.774.42-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.522.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.006.403 2.29-1.552 3.296-1.23 3.296-1.23.653 1.654.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.823 1.096.823 2.21 0 1.595-.015 2.88-.015 3.27 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z",
        target: "_blank",
        rel: "noreferrer",
    },
    // Resume (text)
    {
        type: "text",
        label: "Resume",
        href: "https://drive.google.com/file/d/119Hkfzy2sHD9gm9V5Oe4m0Xm5vamPNgt/view?usp=sharing",
        target: "_blank",
        rel: "noreferrer",
    },
    // Portfolio (text)
    {
        type: "text",
        label: "Portfolio",
        href: "https://olayiwola-akinnagbe.netlify.app/",
        target: "_blank",
        rel: "noreferrer",
    },
    // Hire Me (button)
    {
        type: "button",
        label: "Hire Me",
        href: "mailto:olayiwola72@gmail.com?subject=Interest%20in%20Hiring%20You",
        target: "_blank",
        rel: "noreferrer",
    },
];