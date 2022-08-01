export const jsonToFormData = (json) => {
  const formData = new FormData();
  for (let key in json) {
    formData.set(key, json[key]);
  }
  return formData;
};
