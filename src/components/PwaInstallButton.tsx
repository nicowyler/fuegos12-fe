import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { usePWAInstall } from "react-use-pwa-install";

const PWAInstallButton = () => {
    const install = usePWAInstall();
    const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
    const [hasInstalled, setHasInstalled] = useState(false);

    useEffect(() => {
        // Detect if the app is already running in standalone mode (iOS or Android)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        setIsInStandaloneMode(isStandalone);

        // Check if the app has already been installed by looking at localStorage
        const previouslyInstalled = localStorage.getItem("pwa-installed");
        setHasInstalled(previouslyInstalled === "true");
    }, []);

    const handleInstallClick = async () => {
        if (install) {
            install();
            // Store the installation state in localStorage
            localStorage.setItem("pwa-installed", "true");
            setHasInstalled(true);
        }
    };

    // Don't show the install button if the app is already in standalone mode or already installed
    if (isInStandaloneMode || hasInstalled) {
        return null;
    }

    return (
        <Button onClick={handleInstallClick} className="bg-slate-300 shadow-sm text-secondary w-full">
            <Download size={20} className="mr-2" />
            Descargar App
        </Button>
    );
};

export default PWAInstallButton;
