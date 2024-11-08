import {Link} from "react-router-dom";
import SvgGear from "./SVG/SvgGear.jsx";
import SvgLogo from "./SVG/SvgLogo.jsx";
import {Option, Select, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {FR, US} from "country-flag-icons/react/3x2";

const Header = () => {
    const [value, setValue] = useState('en');

    const {i18n} = useTranslation();

    const VALID_LANGUAGES = ['en-EN', 'fr-FR'];

    useEffect(() => {
        let lng = i18n.language;
        if(!lng.includes('-')) lng+='-'+lng.toUpperCase();
        setValue(VALID_LANGUAGES.includes(lng) ? lng.split('-')[0] : 'en');
        document.documentElement.lang = VALID_LANGUAGES.includes(lng) ? lng : 'en-EN';
    }, [i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        location.reload();
    }

    return (
        <header className="flex justify-between items-center py-4 px-8">
            <Link to={'/'}>
                <SvgLogo className="fill-primary-400 w-10 h-auto" />
                <Typography className="sr-only">
                    <Trans i18nKey="header.home">
                        Home
                    </Trans>
                </Typography>
            </Link>

            <div className="flex gap-3">
                <div className="w-[100px] too-big-select">
                    <Typography className="sr-only">
                        <Trans i18nKey="header.select.label">
                            Language Selector
                        </Trans>
                    </Typography>
                    <Select className="border-transparent" color="deep-orange" variant="static" size="md" value={value} onChange={(val) => changeLanguage(val)}>
                        <Option value="en">
                            <US className="h-4" aria-label="english" />
                            <Typography className="sr-only">English</Typography>
                        </Option>
                        <Option value="fr">
                            <FR className="h-4" aria-label="français" />
                            <Typography className="sr-only">Français</Typography>
                        </Option>
                    </Select>
                </div>
                <Link to={'/settings'}>
                    <SvgGear className="h-8 w-8" />
                    <Typography className="sr-only">
                        <Trans i18nKey="header.settings">
                            Settings
                        </Trans>
                    </Typography>
                </Link>
            </div>
        </header>
    );
};

export default Header;