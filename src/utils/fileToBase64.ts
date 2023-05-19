const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e: any) {
      resolve(e.target.result);
    };
  });
};
export default fileToBase64;
