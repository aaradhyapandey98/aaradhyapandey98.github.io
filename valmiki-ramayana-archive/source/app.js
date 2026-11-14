const field = document.querySelector("#search");
const output = document.querySelector("#results");
const books = document.querySelector("#books");
const count = document.querySelector("#search-count");
let entries = [];
fetch("__BASE__search.json").then(r => r.json()).then(data => { entries = data; render(); })
  .catch(() => { count.textContent = "Search is temporarily unavailable."; });
function render() {
  const q = field.value.trim().toLocaleLowerCase();
  books.hidden = !!q;
  output.hidden = !q;
  if (!q) { count.textContent = ""; output.replaceChildren(); return; }
  const matches = entries.filter(x =>
    (x.book + " " + x.number + " " + x.title + " " +
     ({Bāla:1, Ayodhyā:2, Araṇya:3, Kiṣkindhā:4, Sundara:5, Yuddha:6}[x.book]) + "-" + x.number)
      .toLocaleLowerCase().includes(q));
  count.textContent = matches.length + " matching sarga" + (matches.length === 1 ? "" : "s");
  const list = document.createElement("ol");
  list.className = "search-results";
  for (const x of matches) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = x.url;
    a.textContent = x.book + " " + x.number + " · " + x.title;
    li.append(a); list.append(li);
  }
  output.replaceChildren(list);
}
field.addEventListener("input", render);
