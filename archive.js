const $ = id => document.getElementById(id);

const prices = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0
});
const fullDates = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
});
const shortDates = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric", month: "long", timeZone: "UTC"
});
const collator = new Intl.Collator("ru", { numeric: true });
const statementIds = new Set(["0038", "0039", "0040", "0041", "0042", "0048"]);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function dateLabel(date) {
  return date ? fullDates.format(new Date(date)) : "—";
}

function birthdayLabel(date) {
  if (!date) return "—";
  // Use a leap year to format month-day records, including February 29.
  const monthDay = date.slice(-5);
  return shortDates.format(new Date("2000-" + monthDay));
}

function statusLabel(gift) {
  return gift.status?.trim() || (gift.pickup_date ? "Получен в ПВЗ" : "Ожидает получения");
}

const iconPaths = [
  [/рюкзак|сумк/, "M8 7V5a4 4 0 0 1 8 0v2M5 13a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v7H5zM8 16h8v4"],
  [/телефон|принтер|колонк|наушник|пауэрбанк|зарядк|планшет|час[ыо]/, "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 17h2"],
  [/футболк|джинс|кроссовк|одежд|костюм|худи|толстовк|кофт/, "M9 4a3 3 0 0 0 6 0l5 2 2 5-4 2-1-2v9H7v-9l-1 2-4-2 2-5z"],
  [/духи|крем|косметик|парфюм|шампун/, "M9 3h6v4H9zM10 7v3h4V7M7 12l3-2h4l3 2v8H7zM10 15h4"],
  [/книг|альбом|блокнот/, "M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zm0 0v14"],
  [/игр|консол|конструктор/, "M8 8h8a5 5 0 0 1 5 4l1 4a2 2 0 0 1-3 2l-3-2H8l-3 2a2 2 0 0 1-3-2l1-4a5 5 0 0 1 5-4zm0 3v4m-2-2h4m6 0h.01m3 0h.01"]
];
const giftPath = "M4 11h16v10H4zM3 7h18v4H3zM12 7v14m0-14H8a2 2 0 1 1 2-2zm0 0h4a2 2 0 1 0-2-2z";

function giftIcon(name) {
  const namespace = "http://www.w3.org/2000/svg";
  const frame = element("span", "icon");
  frame.setAttribute("aria-hidden", "true");
  const svg = document.createElementNS(namespace, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  const path = document.createElementNS(namespace, "path");
  path.setAttribute("d", iconPaths.find(([pattern]) => pattern.test(name.toLowerCase()))?.[1] ?? giftPath);
  svg.append(path);
  frame.append(svg);
  return frame;
}

function archiveCard(gift) {
  const card = element("li", "gift-card");
  const meta = element("p", "card-meta");
  const date = gift.pickup_date ? dateLabel(gift.pickup_date) : "Дата получения не указана";
  meta.append(element("span", "", date), element("strong", "", prices.format(gift.price)));
  const link = element("a", "more", "Подробнее");
  link.href = "gift.html?id=" + encodeURIComponent(gift.id);
  link.setAttribute("aria-label", "Подробнее о подарке №" + gift.id);
  card.append(
    giftIcon(gift.gift),
    element("p", "record-number", "Подарок №" + gift.id),
    element("h2", "", gift.gift),
    element("p", "institution", gift.institution),
    element("p", "birthday", "День рождения · " + birthdayLabel(gift.birthday)),
    meta,
    element("span", "status", statusLabel(gift)),
    link
  );
  return card;
}

function normalize(value) {
  return value.toLowerCase().replaceAll("ё", "е").trim();
}

function compareGifts(a, b, order) {
  if (!a.pickup_date || !b.pickup_date) {
    return Number(!a.pickup_date) - Number(!b.pickup_date) || collator.compare(b.id, a.id);
  }
  const byDate = a.pickup_date.localeCompare(b.pickup_date);
  return (order === "oldest" ? byDate : -byDate) || collator.compare(b.id, a.id);
}

function renderArchive(gifts) {
  const institutions = [...new Set(gifts.map(gift => gift.institution))].sort(collator.compare);
  const years = [...new Set(gifts.map(gift => gift.pickup_date?.slice(0, 4)).filter(Boolean))].sort().reverse();
  $("gift-count").textContent = gifts.length;
  $("institution-count").textContent = institutions.length;
  const form = $("filters");
  const year = $("year");
  const institution = $("institution");
  years.forEach(value => year.add(new Option(value, value)));
  institutions.forEach(value => institution.add(new Option(value, value)));

  function update() {
    const query = normalize($("search").value);
    const number = query.match(/^(?:№\s*|#\s*)?(\d+)$/)?.[1];
    const results = gifts.filter(gift => {
      const matches = number
        ? gift.id === number.padStart(4, "0")
        : normalize(gift.gift).includes(query);
      return matches
        && (!year.value || gift.pickup_date?.startsWith(year.value + "-"))
        && (!institution.value || gift.institution === institution.value);
    }).sort((a, b) => compareGifts(a, b, $("sort").value));
    $("results").textContent = results.length ? "Найдено: " + results.length : "По этим условиям подарков не найдено.";
    $("gift-list").replaceChildren(...results.map(archiveCard));
  }

  form.addEventListener("submit", event => event.preventDefault());
  $("search").addEventListener("input", update);
  form.addEventListener("change", update);
  form.hidden = false;
  update();
}

function renderGift(gifts) {
  const id = new URLSearchParams(location.search).get("id");
  const gift = gifts.find(record => record.id === id);
  const content = $("content");
  if (!gift) {
    content.textContent = "Подарок не найден.";
    return;
  }
  document.title = "Подарок №" + gift.id + " — Равный старт";
  const price = prices.format(gift.price);
  const status = statusLabel(gift);
  const hero = element("section", "detail-hero");
  const summary = element("div", "detail-summary");
  summary.append(element("strong", "", price), element("span", "status", status));
  hero.append(
    giftIcon(gift.gift),
    element("p", "record-number", "Архивная запись №" + gift.id),
    element("h1", "", gift.gift),
    summary
  );

  const panel = element("section", "facts-panel");
  const facts = element("table", "facts");
  facts.createCaption().textContent = "Сведения о подарке";
  const rows = facts.createTBody();
  const age = new Intl.NumberFormat("ru-RU", { style: "unit", unit: "year", unitDisplay: "long" });
  for (const [label, value] of [
    ["Возраст", age.format(gift.age)],
    ["День рождения", birthdayLabel(gift.birthday)],
    ["Стоимость", price],
    ["Дата получения в ПВЗ", dateLabel(gift.pickup_date)],
    ["Учреждение", [gift.city, gift.institution].filter(Boolean).join(" · ")],
    ["Место получения", gift.pickup_place || "—"],
    ["Статус", status]
  ]) {
    const row = rows.insertRow();
    const heading = element("th", "", label);
    heading.scope = "row";
    row.append(heading, element("td", "", value));
  }
  panel.append(facts);
  if (statementIds.has(gift.id)) {
    const documentRow = element("p", "document");
    const link = element("a", "", "Выписка Озон Банка (PDF)");
    link.href = "Ozon_Bank_public_redacted_2025-2026.pdf";
    documentRow.append(link);
    panel.append(documentRow);
  }
  content.replaceChildren(hero, panel);
}

const isArchive = document.body.dataset.page === "archive";
try {
  const response = await fetch("gifts.json");
  if (!response.ok) throw new Error("HTTP " + response.status);
  const gifts = await response.json();
  if (isArchive) renderArchive(gifts);
  else renderGift(gifts);
} catch (error) {
  console.error(error);
  $(isArchive ? "results" : "content").textContent = isArchive
    ? "Архив временно недоступен. Попробуйте обновить страницу."
    : "Архивная запись временно недоступна. Попробуйте обновить страницу.";
}
