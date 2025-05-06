chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startTyping") {
    const text = message.text;
    const activeEl = document.activeElement;

    if (!activeEl) return;

    const isTextInput =
      activeEl.tagName === "TEXTAREA" ||
      (activeEl.tagName === "INPUT" && activeEl.type === "text");
    const isEditable = activeEl.isContentEditable;

    let i = 0;

    const typeChar = () => {
      if (i >= text.length) return;

      const char = text[i];

      if (isEditable) {
        // For contenteditable elements
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(char));
        range.collapse(false);
      } else if (isTextInput) {
        const start = activeEl.selectionStart;
        const end = activeEl.selectionEnd;
        const before = activeEl.value.substring(0, start);
        const after = activeEl.value.substring(end);
        activeEl.value = before + char + after;
        activeEl.selectionStart = activeEl.selectionEnd = start + 1;

        // Dispatch input event to trigger any listeners
        const inputEvent = new Event("input", { bubbles: true });
        activeEl.dispatchEvent(inputEvent);
      }

      i++;
      setTimeout(typeChar, 10);
    };

    typeChar();
  }
});
