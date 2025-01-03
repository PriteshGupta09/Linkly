import CryptoJS from "crypto-js";

const storageKey = "encryptedLinks";

// Fetch and decrypt data from localStorage
export const fetchDataFromLocalStorage = () => {
  try {
    const encryptedData = localStorage.getItem(storageKey);
    if (!encryptedData) return [];
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Failed to fetch or decrypt data:", error);
    return [];
  }
};

// Save and encrypt data to localStorage
export const saveDataToLocalStorage = (data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY
    ).toString();
    localStorage.setItem(storageKey, encryptedData);

    // Trigger storage event
    window.dispatchEvent(new Event("storage"));
    return 'Successfully ShortLink Generated'
  } catch (error) {
    console.error("Failed to save or encrypt data:", error);
  }
};

// Update the click count
export const updateCount = (shortLink) => {
  let links = fetchDataFromLocalStorage();

  const isShortLink = links.find((posts)=> posts.ShortLink == shortLink)
  if(!isShortLink){
    return false
  }
  
  links = links.map((link) =>
    link.ShortLink === shortLink ? { ...link, clicks: link.clicks + 1 } : link
  );
  saveDataToLocalStorage(links);
  return true
};


// Delete a link from localStorage
export const deleteLink = (shortLink) => {
  let links = fetchDataFromLocalStorage();
  const isShortLink = links.find((posts)=> posts.ShortLink == shortLink)
  if(!isShortLink){
    return false
  }
  links = links.filter((link) => link.ShortLink !== shortLink);
  saveDataToLocalStorage(links);
  return { success: true, message: "Successfully deleted the ShortLink" };
};


export const saveDataToLocalStorageFirst = (data) => {
  
    // Retrieve existing data from localStorage
    const encryptedData = localStorage.getItem(storageKey);
    let links = encryptedData
      ? JSON.parse(CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString(CryptoJS.enc.Utf8))
      : [];
  
    // Check if the limit is reached
    if (links.length >= 5) {
      return {success:false , message:'Limit reached. Cannot store more link.'};
    }
  
    // Add new data
    links.push(data);
  
    // Encrypt the data and store it
    const encryptedLinks = CryptoJS.AES.encrypt(JSON.stringify(links), process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY).toString();
    localStorage.setItem(storageKey, encryptedLinks);
    return {success:true , message:'Successfully ShortLink Generated'};
  };
  