import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LanguagesIcon, LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useEffect, useState } from "react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { logout, authUser } = useAuthStore();

  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng") || "en");
  const [message, setMessage] = useState('');

  const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
    setLanguage(lang);
  
  fetch(`/api/translate`, { 
    headers: { 
      'Accept-Language': lang 
    } 
  })
    .then(res => res.json())
    .then(data => setMessage(data.message));
};


  // Update the document attributes when language changes
  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("i18nextLng", language);
    document.cookie = `i18nextLng=${language}`;
  }, [language]);

  // Language Selector component
  const LanguageSelector = () => (
    <details style={{ position: "relative", cursor: "pointer", zIndex: 1 }}>
      <summary className="btn btn-sm gap-2 transition-colors">
        <LanguagesIcon className="w-4 h-4" />
        {t("language")}
      </summary>
      <ul className="p-2 absolute flex flex-col">
        <li><button onClick={() => changeLanguage('en')}>English</button></li>
        <li><button onClick={() => changeLanguage('ar')}>العربية</button></li>
      </ul>
    </details>
  );

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t("Settings")}</span>
            </Link>
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">{t("Profile")}</span>
                </Link>
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">{t("Logout")}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
