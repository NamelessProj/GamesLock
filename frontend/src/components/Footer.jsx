import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {FaBehance, FaCodepen, FaGithub} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    const SITEMAP = [
        {
            title: 'Company',
            id: 'company',
            links: [
                {
                    text: 'About Us',
                    href: '/about',
                    id: 'about',
                    sameSite: true
                },
                {
                    text: 'Careers',
                    href: '/careers',
                    id: 'careers',
                    sameSite: true
                },
                {
                    text: 'Our Team',
                    href: '/team',
                    id: 'team',
                    sameSite: true
                }
            ],
        },
        {
            title: 'Help Center',
            id: 'helpCenter',
            links: [
                {
                    text: 'FAQ',
                    href: '/faq',
                    id: 'faq',
                    sameSite: true
                },
                {
                    text: 'Contact Us',
                    href: '/contact',
                    id: 'contact',
                    sameSite: true
                },
                {
                    text: 'Github',
                    href: 'https://github.com/NamelessProj/GamesLock/issues',
                    id: 'github',
                    sameSite: false
                }
            ],
        },
        {
            title: 'Legal',
            id: 'legal',
            links: [
                {
                    text: 'Privacy Policy',
                    href: '/privacy-policy',
                    id: 'privacyPolicy',
                    sameSite: true
                },
                {
                    text: 'Terms of Service',
                    href: '/terms-of-service',
                    id: 'termsOfService',
                    sameSite: true
                },
            ],
        }
    ];

    return (
        <footer className="relative w-full">
            <div className="mx-auto w-full max-w-7xl px-8">
                <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {SITEMAP.map(({title, id, links}) => (
                        <div key={id} className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-4 font-bold uppercase opacity-50 font-dev text-2xl text-primary-900">
                                {t(`footer.titles.${id}`)}
                            </Typography>
                            <ul className="space-y-1">
                                {links.map((link) => (
                                    <Typography key={link.id} as="li" color="blue-gray" className="font-normal text-primary-900">
                                        {link.sameSite ? (
                                            <Link to={link.href}>
                                                {t(`footer.links.${link.id}`)}
                                            </Link>
                                        ):(
                                            <a href={link.href} target="_blank">
                                                {t(`footer.links.${link.id}`)}
                                            </a>
                                        )}
                                    </Typography>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography variant="small" className="mb-4 text-center font-normal text-primary-900 md:mb-0">
                        &copy; {format(new Date(), 'MMM yyyy')} <a className="transition hover:text-primary-300" href="https://portfolio-psi-azure-25.vercel.app" target="_blank">Da Silva Pinto Kevin</a>. All rights reserved.
                    </Typography>
                    <div className="flex gap-4 text-primary-900 sm:justify-center">
                        <Typography as="a" href="https://www.behance.net/kevindasilv2#" target="_blank" className="opacity-70 transition-opacity hover:opacity-100">
                            <FaBehance className="h-5 w-5" />
                        </Typography>
                        <Typography as="a" href="https://codepen.io/Nameless_Project" target="_blank" className="opacity-70 transition-opacity hover:opacity-100">
                            <FaCodepen className="h-5 w-5" />
                        </Typography>
                        <Typography as="a" href="https://github.com/NamelessProj" target="_blank" className="opacity-70 transition-opacity hover:opacity-100">
                            <FaGithub className="h-5 w-5" />
                        </Typography>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;