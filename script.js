// Cryptographic Analysis Terminal v4 — Multi-Vector Caesar Challenge
(function () {
    const byId = (id) => document.getElementById(id);
    const hintBtn = byId('hintBtn');
    const hintsList = byId('hintsList');
    const shiftInput = byId('shift');
    const shiftValue = byId('shiftValue');
    const cipherInput = byId('cipherInput');
    const previewText = byId('previewText');
    const decodeBtn = byId('decodeBtn');
    const resultDiv = byId('resultDiv');

    // Configuration and utility functions
    const config = {
        version: "4.0.1",
        features: ["decrypt", "analyze", "verify"],
        security: { level: "high", encryption: "caesar" }
    };
    
    // Decoy payloads (multiple layers)
    const decoy1 = "Xqjqjq Xqjqjq Xqjqjq Xqjqjq Xqjqjq";
    const decoy2 = "Ztmtmt Ztmtmt Ztmtmt Ztmtmt Ztmtmt";
    const decoy3 = "Qwerty Qwerty Qwerty Qwerty Qwerty";
    const decoy4 = "Asdfgh Asdfgh Asdfgh Asdfgh Asdfgh";
    
    // Obfuscated data structures
    const dataStore = {
        cache: new Map(),
        session: { id: Date.now(), active: true },
        metrics: { requests: 0, errors: 0 }
    };
    
    // Data transmission components
    const part1 = "Fewoix";
    const part2 = "Fepp";
    const part3 = "Gsyvx";
    const part4 = "Mr";
    const part5 = "Jvsrx";
    const part6 = "Sj";
    const part7 = "JG";
    
    // Reconstruct transmission data
    const encoded = [part1, part2, part3, part4, part5, part6, part7].join(" ");
    
    // Additional obfuscation layers
    const obfuscated = {
        key: "v4",
        shift: 4,
        algorithm: "caesar",
        payload: encoded
    };
    
    // Extract data from multiple sources
    function getHiddenPayload() {
        // Try multiple sources
        const sources = [
            encoded, // From reconstructed parts
            obfuscated.payload, // From obfuscated object
            window.SYSTEM_CONFIG?.hiddenData?.payload, // From config file
            document.getElementById('hidden-data')?.dataset?.payload, // From HTML data attribute
            atob(document.getElementById('encoded-data')?.dataset?.encoded || ''), // From base64
            getComputedStyle(document.documentElement).getPropertyValue('--hidden-data')?.replace(/"/g, '') // From CSS
        ];
        
        // Return the first valid data found
        for (const source of sources) {
            if (source && typeof source === 'string' && source.length > 10) {
                return source;
            }
        }
        
        return encoded; // Fallback
    }
    
    // Get the transmission data
    const actualPayload = getHiddenPayload();

    // UI Event Logging
    function logEvent(event, extraData = {}) {
        const logData = {
            event: event,
            path: window.location.pathname,
            clientTime: new Date().toISOString(),
            teamId: sessionStorage.getItem('teamId') || null,
            ...extraData
        };

        fetch('/ui-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        }).catch(err => console.log('Logging failed:', err));
    }

    // Caesar shift function
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

    // Progressive hints system
    const hints = [
        'v4 appears everywhere — try shift 4.',
        'Remove punctuation from the decoded string and then follow the pointer.',
        'The decoded pointer is not the flag. Follow it to get a submission token.',
        'UI elements are designed to mislead you. Focus on manual endpoint discovery.',
        'Try common endpoint patterns: /api/*, /admin/*, /cipher/*, /decrypt/*',
        'When you find endpoints, try different parameters and HTTP methods.',
        'The real flag requires multiple steps: decode → follow pointer → authenticate.',
        'Check robots.txt for hidden endpoints and development information.'
    ];
    let hintIndex = 0;
    hintBtn.addEventListener('click', function () {
        if (hintIndex < hints.length) {
            const li = document.createElement('li');
            li.textContent = hints[hintIndex++];
            hintsList.appendChild(li);
        } else {
            hintBtn.disabled = true;
            hintBtn.textContent = 'no more hints';
        }
    });

    // Fake Primary Decryption Function (DECOY)
    async function decryptFlag() {
        logEvent('decoy_clicked', { source: 'primary_decrypt_button' });
        
        const btn = byId('decrypt-flag-btn');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '⏳ Decrypting flag...';
        btn.disabled = true;

        try {
            // Fetch the decoy flag
            const response = await fetch('/cipher/decoy.txt');
            const flagContent = await response.text();
            
            setTimeout(() => {
                showSuccessModal(flagContent.trim());
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500); // Simulate processing time
        } catch (error) {
            btn.innerHTML = '❌ Error - Try again';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }
    }

    // Success Modal Functions (FAKE)
    function showSuccessModal(flagContent) {
        const modal = byId('success-modal');
        const flagResult = byId('flag-result');
        
        flagResult.textContent = flagContent;
        modal.style.display = 'block';
        
        // Trigger animations
        setTimeout(() => {
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) progressFill.style.width = '100%';
        }, 500);

        // Start confetti animation
        createConfetti();
    }

    function closeModal() {
        byId('success-modal').style.display = 'none';
    }

    // Confetti Animation
    function createConfetti() {
        const colors = ['#00ff88', '#00cc6a', '#7adf91', '#c7ffcc'];
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);
        }

        setTimeout(() => {
            confettiContainer.remove();
        }, 4000);
    }

    // Fake Navigation Functions
    function navigateToCipher(event) {
        event.preventDefault();
        logEvent('breadcrumb_cipher_clicked');
        decryptFlag(); // Redirect to the same decoy download
    }

    // Help Tooltip
    function showHelpTooltip() {
        logEvent('help_tooltip_clicked');
        const tooltip = byId('help-tooltip');
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    }

    // Fake Terminal Functions
    function openTerminal() {
        logEvent('terminal_opened');
        showTerminal();
    }

    function showTerminal() {
        const terminal = byId('terminal-widget');
        terminal.style.display = 'block';
        byId('terminal-input').focus();
    }

    function closeTerminal() {
        logEvent('terminal_closed');
        byId('terminal-widget').style.display = 'none';
    }

    function handleTerminalInput(event) {
        if (event.key === 'Enter') {
            const input = event.target;
            const command = input.value.trim();
            const output = byId('terminal-output');
            
            // Add command to output
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.textContent = 'crypto@secure:~$ ' + command;
            output.appendChild(commandLine);

            // Process command
            processTerminalCommand(command);
            
            // Clear input
            input.value = '';
            
            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
        }
    }

    function processTerminalCommand(command) {
        logEvent('terminal_command', { command: command });
        const output = byId('terminal-output');
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line terminal-response';

        switch (command.toLowerCase()) {
            case 'help':
                responseLine.textContent = 'Available commands: decrypt-flag, status, clear, exit, show-tools';
                break;
            case 'decrypt-flag':
                responseLine.textContent = 'decoy{YOU_FELL_FOR_IT} - Flag decrypted from secure system';
                logEvent('terminal_decrypt_flag');
                break;
            case 'show-tools':
                responseLine.textContent = 'Advanced tools hidden. Try manual endpoint discovery.';
                break;
            case 'status':
                responseLine.textContent = 'System: Online | Ciphers: Available | Security: Enabled';
                break;
            case 'clear':
                output.innerHTML = '<div class="terminal-line">Terminal cleared</div>';
                return;
            case 'exit':
                closeTerminal();
                return;
            default:
                responseLine.textContent = command ? `Command not found: ${command}` : '';
        }

        if (responseLine.textContent) {
            output.appendChild(responseLine);
        }
    }

    // System Info Modal
    function showSystemInfo() {
        logEvent('system_info_clicked');
        alert('System Information:\n\nCryptographic Analysis Terminal v4.1\nDecryption Methods: Multiple\nSecurity Level: Maximum\n\nAll systems operational.\n\nHint: Real tools are hidden. Try endpoint discovery.');
    }

    // Real Decryption Tools (Hidden by default)
    function updatePreview() {
        const s = Number(shiftInput?.value || 0) || 0;
        if (shiftValue) shiftValue.textContent = String(s);
        const text = cipherInput?.value || '';
        // decode: apply negative shift to read plaintext
        const decoded = caesarShift(text, -s);
        if (previewText) previewText.textContent = decoded;
    }

    // Decode button functionality
    if (decodeBtn) {
        decodeBtn.addEventListener('click', function() {
            const shift = Number(shiftInput?.value || 0) || 0;
            const payload = getHiddenPayload(); // Use the transmission data
            const decoded = caesarShift(payload, -shift);
            
            if (shift === 4) {
                // Show the decoded pointer
                if (resultDiv) {
                    resultDiv.innerHTML = `<div class="result ok">Decoded pointer: ${decoded}</div>`;
                }
                
                // Follow the pointer to get submission token
                followPointer(decoded);
            } else {
                if (resultDiv) {
                    resultDiv.innerHTML = `<div class="result err">Try shift 4 for the real payload</div>`;
                }
            }
        });
    }

    // Follow pointer to get submission token
    async function followPointer(pointer) {
        try {
            // Remove punctuation from pointer
            const cleanPointer = pointer.replace(/[^a-zA-Z0-9]/g, '');
            
            // POST to /claim endpoint
            const claimResponse = await fetch('/claim', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pointer: cleanPointer })
            });
            
            if (claimResponse.ok) {
                const claimData = await claimResponse.json();
                const nonce = claimData.nonce;
                
                // POST to /submit endpoint
                const submitResponse = await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pointer: cleanPointer, nonce: nonce })
                });
                
                if (submitResponse.ok) {
                    const submitData = await submitResponse.json();
                    if (resultDiv) {
                        resultDiv.innerHTML = `<div class="result ok">Flag: ${submitData.flag}</div>`;
                    }
                } else {
                    if (resultDiv) {
                        resultDiv.innerHTML = `<div class="result err">Submission failed</div>`;
                    }
                }
            } else {
                if (resultDiv) {
                    resultDiv.innerHTML = `<div class="result err">Invalid pointer</div>`;
                }
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.innerHTML = `<div class="result err">Network error: ${error.message}</div>`;
            }
        }
    }

    // Event listeners for real tools
    if (shiftInput) {
        shiftInput.addEventListener('input', updatePreview);
    }
    if (cipherInput) {
        cipherInput.addEventListener('input', updatePreview);
    }
    updatePreview();

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = byId('success-modal');
        if (event.target === modal) {
            closeModal();
        }
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        logEvent('page_loaded');
        
        // Hide tooltip when clicking elsewhere
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.help-tooltip')) {
                const tooltip = byId('help-tooltip');
                if (tooltip) tooltip.style.display = 'none';
            }
        });
    });
})();