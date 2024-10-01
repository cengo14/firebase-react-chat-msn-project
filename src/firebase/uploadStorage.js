// bu fonksiyondan beklentimiz dosyayı alıp storage yükleyip ardından storagedeki url'i return etmesi

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from ".";

const uploadToStorage = async (files) => {
  console.log(files);
  //    1 dosya resim/video/ses/ değilse veya dosya yoksa fonksiyon dursun
  if (!files) return null;
  if (files.size > 5 * 1024 * 1024)
    return alert("media boyutu 10mb'den büyük olamaz");
  // 2 dosyanın yükleneceği konumun referansını al
  const imageRef = ref(storage, `msn/images/${v4() + files.name}`);

  // 3 referansını oluşturduğumuz konuma dosyayı yükle
  await uploadBytes(imageRef, files);
  // 4 yüklenen dosyanın url'ini al ve return et

  const url = await getDownloadURL(imageRef);
  return url;
};
export default uploadToStorage;
