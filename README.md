Here’s the README in markdown format:

````markdown
# Setting Up a Chrome Extension Locally

Follow these steps to set up and test a Chrome extension locally.

---

### 1. **Clone the Repository**

Clone the repository containing the extension's source code:

```bash
git clone <repository-url>
cd your-chrome-extension-repo
```
````

### 2. **Enable Developer Mode in Chrome**

1. Open **Chrome**.
2. Go to `chrome://extensions/`.
3. Toggle **Developer Mode** on (top-right).

### 3. **Load the Extension**

1. Click **Load unpacked**.
2. Select the folder containing the extension files.

### 4. **Test the Extension**

1. The extension will appear in the **Extensions** page and toolbar.
2. Click the extension icon to test, or open the **Developer Tools** to debug.

### 5. **Make Changes**

1. Edit the extension files.
2. Click **Reload** next to the extension in the **Extensions** page to apply changes.

### 6. **Packaging (Optional)**

1. In `chrome://extensions/`, click **Pack extension**.
2. Select the extension folder, and Chrome will create a `.crx` package.

---

### **Files Overview**

- **manifest.json**: Metadata about the extension.
- **background.js**: Background script.
- **popup.html**: Extension's pop-up page.
- **content.js**: Content script (optional).
- **icons/**: Extension icons.

---

For more info, check out [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/).

```

You can copy and paste this into your `README.md` file. Let me know if you'd like any further modifications! 😊
```
