# Caesar Cipher Level 4 - Multi-Vector Challenge

This challenge implements a sophisticated Caesar cipher with multiple attack vectors, UI misdirection, and progressive discovery - matching the complexity of Level 3 while remaining unique.

## 🎯 Challenge Features

### UI Misdirection
- **Fake primary decrypt button** - Shows decoy flag with celebration
- **Fake terminal widget** - Interactive but useless
- **Fake breadcrumbs** - Misleading navigation
- **Fake success modals** - Confetti and progress bars for decoys
- **Fake admin panel** - Maintenance mode with hints

### Multiple Attack Vectors
1. **Simple Discovery Path**: `/robots.txt` → `/decrypt` → `/decrypt/goal.txt`
2. **Cipher Decoding + Authentication**: Find hidden payload → decode with shift 4 → use as credentials

### Progressive Discovery
- **Endpoint enumeration** required
- **Caesar cipher decoding** skills needed
- **Multiple decoy files** to waste time
- **Robots.txt hints** for endpoint discovery

### Psychological Elements
- **Time-wasting decoys** with realistic UI
- **Fake success messages** with animations
- **Multiple false paths** to confuse automated tools
- **Progressive hint system** (8 levels)

## 🚀 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variable (optional):
   ```bash
   set FLAG_REAL=flag{your_real_flag_here}
   ```

3. Start server:
   ```bash
   npm start
   ```

4. Open http://localhost:3000

## 🎮 Challenge Flow

### Attack Vector 1: Simple Discovery
1. Check `/robots.txt` for endpoint hints
2. Visit `/decrypt` endpoint
3. Read message: "you are on the right path, focus on your goal"
4. Try `/decrypt/goal.txt` for the flag

### Attack Vector 2: Cipher Decoding + Authentication
1. Find hidden payload in source: `"Fewoix Fepp Gsyvx Mr Jvsrx Sj JG"`
2. Decode with Caesar shift 4: `"Basket Ball Court In Front Of FC"`
3. Extract meaningful words: "basketball" and "court"
4. POST to `/handshake` with `{"token":"basketball","verify":"court"}`

## 🔍 Server Endpoints

### Real Endpoints
- `GET /decrypt/goal.txt` - Returns real flag
- `POST /handshake` - Authentication bypass
- `GET /cipher/decode` - Cipher decoding hint
- `GET /robots.txt` - Endpoint discovery hints

### Decoy Endpoints
- `GET /cipher/decoy.txt` - Fake flag
- `GET /admin` - Fake admin panel
- `GET /decrypt` - Discovery hint
- `POST /ui-log` - Event logging

## 🧪 Testing Requirements

- `git grep -n "flag{"` shows zero results in client files
- No full flag visible in page source
- Multiple decoy paths that waste time
- Progressive hint system works
- All three attack vectors functional
- UI misdirection elements present

## 🎓 Learning Objectives

1. **UI Misdirection**: Real attacks often exploit psychological tricks
2. **Endpoint Enumeration**: Manual discovery vs automated tools
3. **Parameter Testing**: IDOR and API vulnerabilities
4. **Authentication Bypass**: Credential guessing and validation
5. **Progressive Discovery**: Multiple paths to the same goal
6. **Resistance to Automation**: Human thinking required

## 🏆 Difficulty Level

**Matches Level 3 complexity** with:
- Multiple attack vectors (2 different paths)
- UI misdirection and psychological elements
- Progressive discovery requirements
- Endpoint enumeration and cipher decoding
- Authentication bypass techniques
- Comprehensive hint system (8 levels)

**Unique from Level 3** with:
- Caesar cipher decryption instead of file access
- Cipher-based attack vector
- Different credential system
- Terminal-themed UI instead of matrix
- Different endpoint structure

## 🔧 Advanced Features

- **Event logging** for admin analysis
- **Decoy access tracking** for statistics
- **Short-lived nonces** for security
- **Multiple decoy payloads** in CSS/JS
- **Comprehensive hint system** with spoilers
- **Mobile-responsive design** with terminal theme
