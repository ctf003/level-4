const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Environment variables
const FLAG_REAL = process.env.FLAG_REAL || 'flag{caesar_cipher_level_4_complete}';
const DECOY_ACCESS_COUNT = { count: 0 };
const UI_LOGS = [];

// System configuration data
const HIDDEN_CONFIG = {
    version: "4.0.1",
    security: "high",
    encryption: "caesar",
    payload: "Fewoix Fepp Gsyvx Mr Jvsrx Sj JG",
    shift: 4,
    algorithm: "caesar"
};

// Obfuscated data structures
const OBFUSCATED_DATA = {
    cache: new Map(),
    session: { id: Date.now(), active: true },
    metrics: { requests: 0, errors: 0 },
    // Transmission data in nested object
    hidden: {
        data: "Fewoix Fepp Gsyvx Mr Jvsrx Sj JG",
        shift: 4,
        algorithm: "caesar"
    }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Expected pointer (server-side precomputed)
const EXPECTED_POINTER = 'BasketBallCourtInFrontOfFC';

// Store nonces (in production, use Redis or similar)
const nonces = new Map();

// Logging middleware for decoy file access
app.use('/cipher/decoy.txt', (req, res, next) => {
    DECOY_ACCESS_COUNT.count++;
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        method: req.method,
        path: req.path,
        type: 'decoy_file_access'
    };
    UI_LOGS.push(logEntry);
    console.log(`[DECOY ACCESS #${DECOY_ACCESS_COUNT.count}]`, logEntry);
    next();
});

// UI event logging endpoint
app.post('/ui-log', (req, res) => {
    const { event, path: eventPath, clientTime, teamId } = req.body;
    
    const logEntry = {
        timestamp: new Date().toISOString(),
        clientTime: clientTime || null,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        event: event || 'unknown',
        path: eventPath || null,
        teamId: teamId || null,
        type: 'ui_interaction'
    };
    
    UI_LOGS.push(logEntry);
    console.log('[UI EVENT]', logEntry);
    
    res.json({ success: true, logged: true });
});

// Decoy endpoints
app.get('/cipher', (req, res) => {
    res.type('text/plain');
    res.send('you are on the right path, just follow your goal\n');
});

// Decoy flag file (public)
app.get('/cipher/decoy.txt', (req, res) => {
    res.type('text/plain');
    res.send('decoy{YOU_FELL_FOR_IT}');
});

// Fake admin endpoint (decoy)
app.get('/admin', (req, res) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        type: 'fake_admin_access'
    };
    UI_LOGS.push(logEntry);
    
    res.json({
        status: "maintenance", 
        note: "flags moved to new system",
        message: "Try the main decrypt button on homepage",
        debug_info: "Check robots.txt for development endpoints",
        hint: "Production flags may use different access patterns"
    });
});

// Robots.txt with hints
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Disallow: /admin
Disallow: /cipher/
Allow: /cipher/decoy.txt
Allow: /decrypt/
Allow: /cipher/decode

# Development endpoints
# /decrypt/ - Main decryption interface
# /cipher/decode - Cipher decoding hint
# /handshake - Authentication endpoint
`);
});

// Main decryption endpoint (discovery path)
app.get('/decrypt', (req, res) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        type: 'decrypt_endpoint_access'
    };
    UI_LOGS.push(logEntry);
    
    res.type('text/plain');
    res.send('you are on the right path, focus on your goal');
});

// Real flag endpoint - accessible after discovery
app.get('/decrypt/goal.txt', (req, res) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        type: 'real_flag_access'
    };
    UI_LOGS.push(logEntry);
    console.log('[REAL FLAG ACCESSED!]', logEntry);
    
    res.type('text/plain');
    res.send(FLAG_REAL);
});

// Alternative real exploit - handshake mechanism
app.post('/handshake', (req, res) => {
    const { token, verify } = req.body;
    
    // This is another way to get the real flag - if someone discovers the right token
    if (token === 'basketball' && verify === 'court') {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent'),
            type: 'handshake_success'
        };
        UI_LOGS.push(logEntry);
        console.log('[HANDSHAKE SUCCESS!]', logEntry);
        
        res.json({
            success: true,
            flag: FLAG_REAL,
            message: 'Handshake verified'
        });
        return;
    }
    
    res.status(403).json({
        success: false,
        message: 'Invalid handshake parameters',
        hint: 'Handshake requires both token and verify fields',
        example_format: '{"token": "something", "verify": "something"}',
        note: 'Consider the challenge theme and context for credential hints'
    });
});

// Offline cipher decoder page
app.get('/cipher/decode', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cryptographic Analysis Tool</title>
    <style>
        body {
            background: #0b0f0c;
            color: #c8facc;
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(7, 15, 10, 0.8);
            border: 1px solid #1a301f;
            border-radius: 10px;
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            color: #33ff88;
        }
        .decoder-section {
            margin: 20px 0;
        }
        .input-group {
            margin: 15px 0;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #89d68f;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            background: rgba(5, 10, 7, 0.8);
            border: 1px solid #16311f;
            border-radius: 5px;
            color: #c8facc;
            font-family: 'Courier New', monospace;
        }
        button {
            background: #33ff88;
            color: #0b0f0c;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            margin: 10px 5px;
        }
        button:hover {
            background: #54ffa7;
        }
        .result {
            margin: 20px 0;
            padding: 15px;
            background: rgba(5, 10, 7, 0.6);
            border: 1px solid #16311f;
            border-radius: 5px;
            min-height: 50px;
        }
        .info {
            background: rgba(51, 255, 136, 0.1);
            border: 1px solid rgba(51, 255, 136, 0.3);
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .warning {
            background: rgba(255, 77, 109, 0.1);
            border: 1px solid rgba(255, 77, 109, 0.3);
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .shift-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 15px 0;
        }
        .shift-slider {
            flex: 1;
        }
        .shift-value {
            min-width: 30px;
            text-align: center;
            color: #33ff88;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔧 Cryptographic Analysis Tool</h1>
            <p>Advanced cipher analysis and decryption utility</p>
        </div>

        <div class="info">
            <h3>📋 Tool Information</h3>
            <p>This tool provides Caesar cipher decryption capabilities. Use it to analyze intercepted transmissions and decode encrypted messages.</p>
        </div>

        <div class="warning">
            <h3>⚠️ Usage Guidelines</h3>
            <p>This tool is for educational purposes only. Ensure you have proper authorization before analyzing any encrypted data.</p>
        </div>

        <div class="decoder-section">
            <h2>Caesar Cipher Decoder</h2>
            
            <div class="input-group">
                <label for="cipherText">Encrypted Text:</label>
                <textarea id="cipherText" rows="4" placeholder="Paste encrypted text here for analysis..."></textarea>
            </div>

            <div class="shift-controls">
                <label for="shiftValue">Shift Value:</label>
                <input type="range" id="shiftSlider" min="0" max="25" value="0" class="shift-slider">
                <span class="shift-value" id="shiftValue">0</span>
            </div>

            <div class="input-group">
                <label for="shiftInput">Manual Shift Input:</label>
                <input type="number" id="shiftInput" value="0" min="0" max="25">
            </div>

            <button onclick="decodeCipher()">Decode</button>
            <button onclick="clearAll()">Clear</button>
            <button onclick="analyzeAll()">Analyze All Shifts</button>

            <div class="result" id="result">
                <p>Decoded text will appear here...</p>
            </div>
        </div>

        <div class="info">
            <h3>🔍 Analysis Tips</h3>
            <ul>
                <li>Try different shift values to find readable text</li>
                <li>Look for common words or patterns in the output</li>
                <li>Consider the context of the encrypted message</li>
                <li>Use the "Analyze All Shifts" feature for comprehensive analysis</li>
            </ul>
        </div>
    </div>

    <script>
        // Caesar cipher decoder function
        function caesarShift(text, shift) {
            const aCode = 'a'.charCodeAt(0);
            const zCode = 'z'.charCodeAt(0);
            const ACode = 'A'.charCodeAt(0);
            const ZCode = 'Z'.charCodeAt(0);
            const mod = (n, m) => ((n % m) + m) % m;
            let out = '';
            for (const ch of text) {
                const code = ch.charCodeAt(0);
                if (code >= aCode && code <= zCode) {
                    const shifted = aCode + mod(code - aCode + shift, 26);
                    out += String.fromCharCode(shifted);
                } else if (code >= ACode && code <= ZCode) {
                    const shifted = ACode + mod(code - ACode + shift, 26);
                    out += String.fromCharCode(shifted);
                } else {
                    out += ch;
                }
            }
            return out;
        }

        function updateShiftValue() {
            const slider = document.getElementById('shiftSlider');
            const input = document.getElementById('shiftInput');
            const display = document.getElementById('shiftValue');
            
            const value = slider.value;
            input.value = value;
            display.textContent = value;
        }

        function updateShiftFromInput() {
            const slider = document.getElementById('shiftSlider');
            const input = document.getElementById('shiftInput');
            const display = document.getElementById('shiftValue');
            
            let value = parseInt(input.value);
            if (isNaN(value) || value < 0) value = 0;
            if (value > 25) value = 25;
            
            slider.value = value;
            input.value = value;
            display.textContent = value;
        }

        function decodeCipher() {
            const cipherText = document.getElementById('cipherText').value;
            const shift = parseInt(document.getElementById('shiftInput').value);
            const result = document.getElementById('result');

            if (!cipherText.trim()) {
                result.innerHTML = '<p style="color: #ff4d6d;">Please enter encrypted text to decode.</p>';
                return;
            }

            // Decode: apply negative shift to read plaintext
            const decoded = caesarShift(cipherText, -shift);
            
            result.innerHTML = \`
                <h3>Decoded Result (Shift \${shift}):</h3>
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px; margin: 10px 0;">
                    <p style="font-family: monospace; font-size: 16px; color: #33ff88; word-break: break-all;">\${decoded}</p>
                </div>
                <h3>Clean Result (alphanumeric only):</h3>
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px; margin: 10px 0;">
                    <p style="font-family: monospace; font-size: 16px; color: #54ffa7; word-break: break-all;">\${decoded.replace(/[^a-zA-Z0-9]/g, '')}</p>
                </div>
            \`;
        }

        function analyzeAll() {
            const cipherText = document.getElementById('cipherText').value;
            const result = document.getElementById('result');

            if (!cipherText.trim()) {
                result.innerHTML = '<p style="color: #ff4d6d;">Please enter encrypted text to analyze.</p>';
                return;
            }

            let analysis = '<h3>Comprehensive Analysis (All Shifts):</h3>';
            
            for (let shift = 0; shift <= 25; shift++) {
                const decoded = caesarShift(cipherText, -shift);
                const clean = decoded.replace(/[^a-zA-Z0-9]/g, '');
                
                analysis += \`
                    <div style="margin: 10px 0; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 5px;">
                        <strong>Shift \${shift}:</strong> <span style="font-family: monospace; color: #33ff88;">\${decoded}</span>
                        <br><strong>Clean:</strong> <span style="font-family: monospace; color: #54ffa7;">\${clean}</span>
                    </div>
                \`;
            }
            
            result.innerHTML = analysis;
        }

        function clearAll() {
            document.getElementById('cipherText').value = '';
            document.getElementById('shiftSlider').value = '0';
            document.getElementById('shiftInput').value = '0';
            document.getElementById('shiftValue').textContent = '0';
            document.getElementById('result').innerHTML = '<p>Decoded text will appear here...</p>';
        }

        // Event listeners
        document.getElementById('shiftSlider').addEventListener('input', updateShiftValue);
        document.getElementById('shiftInput').addEventListener('input', updateShiftFromInput);
    </script>
</body>
</html>
    `);
});

// Logs viewing endpoint (for admin analysis)
app.get('/view-logs', (req, res) => {
    const adminKey = req.query.key;
    if (adminKey !== 'admin123') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    
    res.json({
        decoyAccessCount: DECOY_ACCESS_COUNT.count,
        totalLogs: UI_LOGS.length,
        recentLogs: UI_LOGS.slice(-20),
        realFlagAccessed: UI_LOGS.filter(log => log.type === 'real_flag_access').length
    });
});

// /claim endpoint - returns nonce for valid pointer
app.post('/claim', (req, res) => {
    const { pointer } = req.body;
    
    if (!pointer) {
        return res.status(400).json({ error: 'Pointer required' });
    }
    
    if (pointer === EXPECTED_POINTER) {
        // Generate short-lived nonce (5 minutes)
        const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
        
        nonces.set(nonce, { pointer, expires });
        
        res.json({ nonce });
    } else {
        res.status(400).json({ error: 'Invalid pointer' });
    }
});

// /submit endpoint - returns flag for valid pointer+nonce
app.post('/submit', (req, res) => {
    const { pointer, nonce } = req.body;
    
    if (!pointer || !nonce) {
        return res.status(400).json({ error: 'Pointer and nonce required' });
    }
    
    const stored = nonces.get(nonce);
    
    if (!stored) {
        return res.status(400).json({ error: 'Invalid nonce' });
    }
    
    if (stored.expires < Date.now()) {
        nonces.delete(nonce);
        return res.status(400).json({ error: 'Nonce expired' });
    }
    
    if (stored.pointer !== pointer) {
        return res.status(400).json({ error: 'Pointer mismatch' });
    }
    
    // Clean up used nonce
    nonces.delete(nonce);
    
    // Return the real flag from environment variable
    const flag = process.env.FLAG_REAL || 'flag{caesar_cipher_level_4_complete}';
    res.json({ flag });
});

// Clean up expired nonces every minute
setInterval(() => {
    const now = Date.now();
    for (const [nonce, data] of nonces.entries()) {
        if (data.expires < now) {
            nonces.delete(nonce);
        }
    }
}, 60000);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Expected pointer: ${EXPECTED_POINTER}`);
});
