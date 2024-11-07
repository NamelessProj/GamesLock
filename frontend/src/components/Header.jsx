import {Link} from "react-router-dom";
import SvgGear from "./SVG/SvgGear.jsx";
import SvgLogo from "./SVG/SvgLogo.jsx";
import {Option, Select} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {FR, US} from "country-flag-icons/react/3x2";

const Header = () => {
    const [value, setValue] = useState('en');

    const {i18n} = useTranslation();

    useEffect(() => {
        setValue(i18n.language);
    }, [i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        location.reload();
    }

    return (
        <header className="flex justify-between items-center py-4 px-8">
            <Link to={'/'}>
                <SvgLogo className="fill-primary-400 w-10 h-auto" />
            </Link>

            <div className="flex gap-3">
                <div>
                    <Select variant="outlined" value={value} onChange={(val) => changeLanguage(val)}>
                        <Option value="en">
                            <US className="h-4" aria-label="english" />
                        </Option>
                        <Option value="fr">
                            <FR className="h-4" aria-label="français" />
                        </Option>
                    </Select>
                </div>
                <Link to={'/settings'}>
                    <SvgGear className="h-8 w-8" />
                </Link>
            </div>
        </header>
    );
};

export default Header;