import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

i18n
    .use(HttpBackend) // تحميل الترجمات من ملفات JSON
    .use(initReactI18next)
    .init({
        fallbackLng: localStorage.getItem('i18nextLng') || 'en', // اللغة الافتراضية
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export const useInitTranslation = () => {
    const { t } = useTranslation();
    const setT = useAuthStore((state) => state.setT);

    useEffect(() => {
        setT(t); // تخزين `t` في Zustand عند تحميل المكون
    }, [t, setT]);
};


export default i18n;
