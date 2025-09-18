# Deep Payload Hiding Techniques

This document explains the multiple layers of payload obfuscation used in Level 4.

## 🎯 Payload: "Fewoix Fepp Gsyvx Mr Jvsrx Sj JG"

## 🔍 Hiding Locations

### 1. JavaScript File (script.js)
- **Split across variables**: `part1`, `part2`, `part3`, etc.
- **Reconstructed**: `[part1, part2, part3, part4, part5, part6, part7].join(" ")`
- **Obfuscated object**: `obfuscated.payload`
- **Dynamic extraction**: `getHiddenPayload()` function

### 2. CSS File (style.css)
- **Base64 encoded**: `--hidden-data: "RmV3b2l4IEZlcHAgR3N5dnggTXIgSnZzcnggU2ogSkc="`
- **CSS custom properties**: Hidden in plain sight
- **Multiple decoy variables**: `--decoy1`, `--decoy2`, etc.

### 3. HTML File (index.html)
- **HTML comments**: `<!-- Data: Fewoix Fepp Gsyvx Mr Jvsrx Sj JG -->`
- **Data attributes**: `data-payload="Fewoix Fepp Gsyvx Mr Jvsrx Sj JG"`
- **Base64 encoded**: `data-encoded="RmV3b2l4IEZlcHAgR3N5dnggTXIgSnZzcnggU2ogSkc="`
- **Hidden divs**: `style="display: none;"`

### 4. Config File (config.js)
- **Nested objects**: `SYSTEM_CONFIG.hiddenData.payload`
- **Multiple encodings**: Plain text + Base64
- **Obfuscated structure**: Mixed with decoy data

### 5. Server File (server.js)
- **Configuration objects**: `HIDDEN_CONFIG.payload`
- **Nested structures**: `OBFUSCATED_DATA.hidden.data`
- **Comments**: Inline documentation

## 🛡️ Obfuscation Techniques

### 1. **Split and Reconstruct**
```javascript
const part1 = "Fewoix";
const part2 = "Fepp";
// ... more parts
const encoded = [part1, part2, part3, part4, part5, part6, part7].join(" ");
```

### 2. **Base64 Encoding**
```css
--hidden-data: "RmV3b2l4IEZlcHAgR3N5dnggTXIgSnZzcnggU2ogSkc=";
```

### 3. **Multiple Sources**
```javascript
function getHiddenPayload() {
    const sources = [
        encoded, // From reconstructed parts
        obfuscated.payload, // From obfuscated object
        window.SYSTEM_CONFIG?.hiddenData?.payload, // From config file
        document.getElementById('hidden-data')?.dataset?.payload, // From HTML
        atob(document.getElementById('encoded-data')?.dataset?.encoded || ''), // From base64
        getComputedStyle(document.documentElement).getPropertyValue('--hidden-data')?.replace(/"/g, '') // From CSS
    ];
    // Return first valid source
}
```

### 4. **Decoy Data**
- Multiple fake payloads in each file
- Similar structure to real payload
- Designed to waste time

### 5. **Nested Objects**
```javascript
const OBFUSCATED_DATA = {
    cache: new Map(),
    session: { id: Date.now(), active: true },
    metrics: { requests: 0, errors: 0 },
    hidden: {
        data: "Fewoix Fepp Gsyvx Mr Jvsrx Sj JG",
        shift: 4,
        algorithm: "caesar"
    }
};
```

## 🔍 Discovery Methods

### For Humans:
1. **View Source**: Look for HTML comments and data attributes
2. **Inspect Element**: Check hidden divs and CSS custom properties
3. **Console**: Access `window.SYSTEM_CONFIG.hiddenData.payload`
4. **Network Tab**: Check config.js file
5. **Search**: Look for "Fewoix" or "Fepp" in source

### For Automated Tools:
- **Grep**: `grep -r "Fewoix" .` will find multiple instances
- **Base64**: Decode `RmV3b2l4IEZlcHAgR3N5dnggTXIgSnZzcnggU2ogSkc=`
- **CSS**: Extract `--hidden-data` custom property
- **JavaScript**: Parse `getHiddenPayload()` function

## 🎯 Challenge Design

The payload is hidden in **6 different locations** across **5 different files** using **5 different obfuscation techniques**. This makes it:

- **Hard to find**: Multiple layers of hiding
- **Resistant to automation**: Requires human analysis
- **Educational**: Teaches various hiding techniques
- **Realistic**: Mimics real-world obfuscation

## 🏆 Learning Objectives

1. **Source Code Analysis**: Reading through multiple files
2. **Encoding Techniques**: Base64, string manipulation
3. **DOM Manipulation**: Data attributes, CSS custom properties
4. **JavaScript Obfuscation**: Split strings, nested objects
5. **Multi-file Discovery**: Finding data across different file types
