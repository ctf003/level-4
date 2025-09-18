// Configuration file for Cryptographic Analysis Terminal v4
// This file contains system configuration and hidden data

const SYSTEM_CONFIG = {
    version: "4.0.1",
    build: "2024.09.18",
    security: {
        level: "high",
        encryption: "caesar",
        algorithm: "shift"
    },
    features: {
        decryption: true,
        analysis: true,
        verification: true,
        logging: true
    },
    // Transmission data (obfuscated)
    hiddenData: {
        payload: "Fewoix Fepp Gsyvx Mr Jvsrx Sj JG",
        shift: 4,
        algorithm: "caesar",
        encoded: "RmV3b2l4IEZlcHAgR3N5dnggTXIgSnZzcnggU2ogSkc="
    },
    // Decoy data to confuse automated tools
    decoys: [
        "Xqjqjq Xqjqjq Xqjqjq Xqjqjq Xqjqjq",
        "Ztmtmt Ztmtmt Ztmtmt Ztmtmt Ztmtmt",
        "Qwerty Qwerty Qwerty Qwerty Qwerty",
        "Asdfgh Asdfgh Asdfgh Asdfgh Asdfgh"
    ],
    // Obfuscated data structures
    obfuscated: {
        cache: new Map(),
        session: { id: Date.now(), active: true },
        metrics: { requests: 0, errors: 0 }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SYSTEM_CONFIG;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
    window.SYSTEM_CONFIG = SYSTEM_CONFIG;
}
