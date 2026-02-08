async function loadComponent(name_file, name_sel){
    let component = await fetch(name_file)
    let div_cont = document.querySelector(name_sel)
    div_cont.innerHTML = await component.text()
}
async function loadData(name_file) {
    let data = await fetch(name_file)
    let data_obg = await data.json()
    return data_obg
}
function choice(arr) {
  if (!arr.length) {
    throw new Error("Cannot choose from an empty array");
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
