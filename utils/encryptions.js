import CryptoJS from "crypto-js";
import { localstorage } from '@/utils/localstorage';
import TableCompo from "@/components/layout/TableCompo";

const ENCRYPT_SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_SECRET_KEY;

export const encryptData = (data) => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const newDate = `${day}-${month}-${year}`;

  data.date = newDate

  const stringifiedData = JSON.stringify(data);
  const EncryptData = CryptoJS.AES.encrypt(stringifiedData, ENCRYPT_SECRET_KEY).toString();
  localstorage(EncryptData)
};

export const decryptData = (encryptedValue) => {

  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPT_SECRET_KEY);
  console.log(bytes)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};


// Retrieve and decrypt all stored data
export const getAllDecryptedData = () => {
  const decryptedData = [];
  
  // Loop through keys in localStorage
  for (let i = 0; i <= localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(key)
      const data = decryptData(key);
      decryptedData.push(data);
  }

  return decryptedData;
};