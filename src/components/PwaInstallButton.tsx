import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

// Extending the Event type to properly type the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface Navigator {
    standalone?: boolean;
}
// Extending the Navigator type to include standalone for iOS detection
interface ExtendedNavigator extends Navigator {
    standalone?: boolean;
}

const PWAInstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(userAgent);
        setIsIos(ios);
        setIsInStandaloneMode(
            'standalone' in window.navigator && typeof (window.navigator as any).standalone === 'boolean'
                ? (window.navigator as any).standalone
                : false
        );

        // Listen for the beforeinstallprompt event on Android/Chrome
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        setShowInstallButton(true);

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

        // Check for updates on service worker
        const checkForUpdates = () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.onupdatefound = () => {
                            const installingWorker = registration.installing;
                            if (installingWorker) {
                                installingWorker.onstatechange = () => {
                                    if (installingWorker.state === 'installed') {
                                        if (navigator.serviceWorker.controller) {
                                            setUpdateAvailable(true);
                                        }
                                    }
                                };
                            }
                        };
                    });
                });
            }
        };

        checkForUpdates();

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            setShowInstallButton(false);
        }
    };

    const handleRefreshClick = () => {
        window.location.reload();
    };

    return (
        <>
            {isIos && !isInStandaloneMode && (
                <div>
                    <p>
                        Para instalar esta aplicación, toca el ícono de compartir <strong>(Botón de Compartir de iOS)</strong> y luego
                        <strong> "Agregar a la Pantalla de Inicio"</strong>.
                    </p>
                </div>
            )}

            {(!isInStandaloneMode && showInstallButton) && !updateAvailable && !isIos && (
                <Button onClick={handleInstallClick} className="bg-slate-300 shadow-sm text-secondary w-full">
                    <Download size={20} className="mr-2" />
                    Descargar App
                </Button>
            )}

            {updateAvailable && (
                <Button onClick={handleRefreshClick} className="bg-slate-300 shadow-sm text-secondary w-full">
                    <Download size={20} className="mr-2" />
                    Descargar Nueva Versión
                </Button>

            )}
        </>
    );
};

export default PWAInstallButton;
