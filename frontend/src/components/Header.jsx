import {Link} from "react-router-dom";
import SvgGear from "./SVG/SvgGear.jsx";
import SvgLogo from "./SVG/SvgLogo.jsx";
import {Option, Select, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FR, US} from "country-flag-icons/react/3x2";

const Header = () => {
    const [value, setValue] = useState('en');

    const {i18n, t} = useTranslation();

    const flagsClass = 'h-4';
    const LANGUAGES = {
        'en-EN': {
            name: 'English',
            flag: <US className={flagsClass} aria-label="English" />
        },
        'fr-FR': {
            name: "Français",
            flag: <FR className={flagsClass} aria-label="Français" />
        }
    };

    useEffect(() => {
        let lng = i18n.language;
        if(!lng.includes('-')) lng+='-'+lng.toUpperCase();
        if(LANGUAGES[lng] === undefined) lng = 'en-EN';
        setValue(lng.split('-')[0]);
        document.documentElement.lang = lng;
    }, [i18n.language]);

    const changeLanguage = (lng) => {i18n.changeLanguage(lng);}

    return (
        <header className="flex justify-between items-center py-4 px-8">
            <Link to={'/'}>
                <SvgLogo className="fill-primary-400 w-10 h-auto" />
                <Typography className="sr-only">
                    {t("header.home")}
                </Typography>
            </Link>

            <div className="flex gap-3">
                <div className="w-[100px] too-big-select">
                    <Typography className="sr-only">
                        {t("header.select.label")}
                    </Typography>
                    <Select className="border-transparent" color="deep-orange" variant="static" size="md" value={value} onChange={(val) => changeLanguage(val)}>
                        {Object.keys(LANGUAGES).map((lng) => (
                            <Option key={lng} value={lng.split('-')[0]}>
                                {LANGUAGES[lng].flag}
                                <Typography className="sr-only">
                                    {LANGUAGES[lng].name}
                                </Typography>
                            </Option>
                        ))}
                    </Select>
                </div>
                <Link to={'/settings'}>
                    <SvgGear className="h-8 w-8" />
                    <Typography className="sr-only">
                        {t("header.settings")}
                    </Typography>
                </Link>
            </div>
        </header>
    );
};

export default Header;