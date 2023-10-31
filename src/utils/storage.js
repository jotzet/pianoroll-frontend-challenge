export function saveDataToFile(data) {
  localStorage.setItem("pianoRollData", JSON.stringify(data));
}

export function getDataFromFile() {
  const data = localStorage.getItem("pianoRollData");
  return data ? JSON.parse(data) : null;
}

export function get20itemsFromData() {
  const pdata = getDataFromFile();
  const partDataArray = [];

  for (let it = 0; it < 20; it++) {
    const start = it * 60;
    const end = start + 60;
    const partData = pdata ? pdata.slice(start, end) : [];
    partDataArray.push(partData);
  }
  return partDataArray;
}

export function deleteDataFromFile() {
  localStorage.removeItem("pianoRollData");
}

export function isDataInStorage() {
  const data = localStorage.getItem("pianoRollData");
  return data !== null;
}
