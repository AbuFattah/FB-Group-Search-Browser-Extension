chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let groups = [];

  document.querySelectorAll('a[href*="/groups/"]').forEach((a) => {
    const match = a.href.match(/groups\/(\d+)/);
    if (match) {
      groups.push({ name: a.innerText.trim(), id: match[1] });
    }
  });

  chrome.storage.local.set({ groups }, () => {
    console.log("Groups saved:", groups);
  });

  sendResponse({ groups: groups });

  return true;
});

console.log("from contnet script!");
