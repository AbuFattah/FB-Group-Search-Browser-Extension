document.addEventListener("DOMContentLoaded", function () {
  loadGroups();

  const addBtn = document.getElementById("add-btn");
  const groupLinkInput = document.getElementById("group-link");
  const groupNameInput = document.getElementById("group-name");
  const goBtn = document.getElementById("go-btn");
  const searchBox = document.getElementById("search-box");

  chrome.storage.sync.get(["searchText", "groupLink", "groupName"], (data) => {
    if (data.searchText) searchBox.value = data.searchText;
    if (data.groupLink) groupLinkInput.value = data.groupLink;
    if (data.groupName) groupNameInput.value = data.groupName;
  });

  addBtn.addEventListener("click", function () {
    const groupLink = groupLinkInput.value.trim();
    const groupName = groupNameInput.value.trim();

    if (groupLink && groupName) {
      const newGroup = { link: groupLink, name: groupName };
      // Save to chrome.storage
      chrome.storage.local.get(["groups"], function (result) {
        const groups = result.groups || [];
        groups.push(newGroup);
        chrome.storage.local.set({ groups: groups }, function () {
          loadGroups();
        });
      });
      groupLinkInput.value = "";
      groupNameInput.value = "";
      // chrome.storage.sync.set({ groupLink: "" });
      // chrome.storage.sync.set({ groupName: "" });
    }
  });

  goBtn.addEventListener("click", function () {
    const checkedBoxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const keyword = searchBox.value.trim();

    const encodedKeyword = encodeURIComponent(keyword);

    console.log(checkedBoxes.length);
    checkedBoxes.forEach((checkbox) => {
      let baseUrl = new URL(checkbox.getAttribute("data-link"));

      let groupLink = baseUrl.toString().endsWith("/")
        ? baseUrl.toString() + "search/?q=" + encodedKeyword
        : baseUrl.toString() + "/search/?q=" + encodedKeyword;

      window.open(groupLink, "_blank");
    });
  });

  function loadGroups() {
    chrome.storage.local.get(["groups"], function (result) {
      const groups = result.groups || [];
      const groupListDiv = document.getElementById("group-list");
      groupListDiv.innerHTML = "";

      groups.forEach((group, index) => {
        const groupItem = document.createElement("div");
        groupItem.classList.add("group-item");
        groupItem.classList.add("gap-3");

        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("checkbox-label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.setAttribute("data-link", group.link);
        checkbox.classList.add("me-2");

        const groupLink = document.createElement("a");
        groupLink.href = group.link;
        groupLink.target = "_blank";
        groupLink.innerText = group.name;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn", "btn-danger", "btn-sm");
        removeBtn.innerText = "×";
        removeBtn.onclick = function () {
          removeGroup(index);
        };

        checkboxDiv.appendChild(checkbox);
        groupItem.appendChild(checkboxDiv);
        groupItem.appendChild(groupLink);
        groupItem.appendChild(removeBtn);
        groupListDiv.appendChild(groupItem);
      });
    });
  }

  function removeGroup(index) {
    chrome.storage.local.get(["groups"], function (result) {
      const groups = result.groups || [];
      groups.splice(index, 1);
      chrome.storage.local.set({ groups: groups }, function () {
        loadGroups();
      });
    });
  }

  searchBox.addEventListener("input", () => {
    chrome.storage.sync.set({ searchText: searchBox.value });
  });

  groupLinkInput.addEventListener("input", () => {
    chrome.storage.sync.set({ groupLink: groupLinkInput.value });
  });

  groupNameInput.addEventListener("input", () => {
    chrome.storage.sync.set({ groupName: groupNameInput.value });
  });
});
