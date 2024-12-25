import CryptoJS from "crypto-js";

 export const saveDataToLocalStorage = (data) => {
  const storageKey = "encryptedLinks";

  // Retrieve existing data from localStorage
  const encryptedData = localStorage.getItem(storageKey);
  let links = encryptedData
    ? JSON.parse(CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString(CryptoJS.enc.Utf8))
    : [];

  // Check if the limit is reached
  if (links.length >= 5) {
    console.warn("Limit reached. Cannot store more data.");
    return;
  }

  // Add new data
  links.push(data);

  // Encrypt the data and store it
  const encryptedLinks = CryptoJS.AES.encrypt(JSON.stringify(links), process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString();
  localStorage.setItem(storageKey, encryptedLinks);
};


