import {FR, US} from "country-flag-icons/react/3x2";

const flagsClass = 'h-4';
export const LANGUAGES = {
    'en-EN': {
        name: 'English',
        flag: <US className={flagsClass} aria-label="English" />
    },
    'fr-FR': {
        name: "Français",
        flag: <FR className={flagsClass} aria-label="Français" />
    },
};