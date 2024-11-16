const favicon = document.getElementById("favicon");
const input = document.querySelector(".gradient-text");
const img = document.querySelector(".img");
const downloadBtn = document.querySelector(".download");

const setValue = (value) => {
  if (value.trim() === "") value = "asdf";

  const href = `/${value}`;
  img.src = href;
  favicon.href = href;
};

input.addEventListener("input", (e) => {
  setValue(e.target.value);
});

setValue(input.value);

const downloadImage = async () => {
  const size = 256;
  try {
    const value = input.value.trim() || "asdf";
    const response = await fetch(`/${value}`);
    const svgContent = await response.text();
    const dataUrl =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgContent);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataUrl;
    img.width = size;
    img.height = size;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  } catch (e) {}
};

downloadBtn.addEventListener("click", downloadImage);
