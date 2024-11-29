import {enGB, fr} from "date-fns/locale";
import i18n from "i18next";

export const getPostLocale = () => {
    const locales = {
        en: enGB,
        fr: fr
    };
    const i18nLocale = i18n.language;
    return locales[i18nLocale] || enGB;
}