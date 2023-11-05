//all the functions below are for manipulating the data in the storage;

export function saveDataToFile(data) {
  localStorage.setItem("pianoRollData", JSON.stringify(data));
}

export function getDataFromFile() {
  const data = localStorage.getItem("pianoRollData");
  return data ? JSON.parse(data) : null;
}

export function getItemsFromData(numberOfItems) {
  const pdata = getDataFromFile();
  const partDataArray = [];

  for (let it = 0; it < numberOfItems; it++) {
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
