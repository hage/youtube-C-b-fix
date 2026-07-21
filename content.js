document.addEventListener(
  "keydown",
  function (e) {
    // Ctrl + B （※ Command + B ではない）
    if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "b") {
      e.preventDefault(); // デフォルト動作（太字など）を抑止

      const el = document.activeElement;
      if (!el) return;

      // ---- input / textarea ----
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        const start = el.selectionStart;
        const end = el.selectionEnd;

        if (start == null) return;

        // カーソルを1文字左に移動
        const newPos = Math.max(0, start - 1);
        el.selectionStart = el.selectionEnd = newPos;
      }

      // ---- contentEditable ----
      else if (el.isContentEditable) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        const newRange = document.createRange();

        try {
          // startOffset が 0 より大きい場合だけカーソルを左へ
          const newOffset = Math.max(0, range.startOffset - 1);
          newRange.setStart(range.startContainer, newOffset);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        } catch (err) {
          console.warn("カーソル移動に失敗:", err);
        }
      }
    }
  },
  true
);