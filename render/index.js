const information = document.getElementById("info");
information.innerText = `本应用正在使用Chrome (V${versions.chrome()}),Node.js(V${versions.node()}),和Electron(V${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};
func();
