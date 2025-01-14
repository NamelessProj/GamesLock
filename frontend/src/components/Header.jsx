import {Link} from "react-router-dom";
import SvgGear from "./SVG/SvgGear.jsx";
import SvgLogo from "./SVG/SvgLogo.jsx";
import {Option, Select, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LANGUAGES} from "../utils/LANGUAGES.jsx";
import {useAuthStore} from "../stores/authStore.js";

const Header = () => {
    const {userInfo} = useAuthStore();
    const [value, setValue] = useState('en');

    const {i18n, t} = useTranslation();

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

            <div className="flex items-center gap-3">
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
                {userInfo && (
                    <>
                        <div className="w-[1px] h-[30px] rounded-full bg-primary-900 opacity-50"/>
                        <Link to={`/profile/edit/${userInfo.user._id}`} className="transform transition-transform hover:rotate-45">
                            <SvgGear className="h-8 w-8"/>
                            <Typography className="sr-only">
                                {t("header.settings")}
                            </Typography>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;