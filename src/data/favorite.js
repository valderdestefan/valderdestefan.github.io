export function getList() {
  const list = localStorage.getItem("favorite_list");

  if (!list) {
    return [];
  }
  return JSON.parse(list);
}

// export function addGif(gif) {
//   const list = getList();
//   const newList = [...list, gif];
//   localStorage.setItem("favorite_list", JSON.stringify(newList));
// }

export function setList(newList) {
  localStorage.setItem("favorite_list", JSON.stringify(newList));
}
//Сделать из этого getList()
const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

export function deleteGifById(gifId) {
  const gifList = getList();
  const newList = gifList.filter((item) => item.id !== gifId);
  localStorage.setItem("favorite_list", JSON.stringify(newList));
}
