import { storage } from ".";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

/**
 * Dosyaları Firebase Storage'a yükleyen fonksiyon
 * @param {FileList} files - Yüklenmek üzere seçilen dosyalar
 * @returns {Promise<{uploadedFiles: Array, errors: Array}>}
 */
const uploadToStorage = async (files) => {
  const uploadedFiles = {
    image: "",
    video: "",
    audio: "",
  };
  const errors = [];

  const uploadPromises = Array.from(files).map((file) => {
    return new Promise((resolve, reject) => {
      const fileType = file.type.split("/")[0]; // 'image', 'video', 'audio'

      // Dosya türüne göre maksimum boyutu belirleme
      const MAX_FILE_SIZE = {
        image: 10 * 1024 * 1024, // 10MB
        video: 50 * 1024 * 1024, // 50MB
        audio: 10 * 1024 * 1024, // 10MB
      };

      const maxSize = MAX_FILE_SIZE[fileType] || 20 * 1024 * 1024; // Varsayılan 20MB

      if (file.size > maxSize) {
        errors.push(
          `${file.name} dosyası ${fileType} türü için maksimum boyut olan ${
            maxSize / (1024 * 1024)
          }MB'ı aşıyor.`
        );
        reject(new Error(`${file.name} boyutu aşılmış.`));
        return;
      }

      // Dosya türüne göre klasör belirleme
      let storageFolder = "";
      switch (fileType) {
        case "image":
          storageFolder = "images";
          break;
        case "video":
          storageFolder = "videos";
          break;
        case "audio":
          storageFolder = "audios";
          break;
        default:
          storageFolder = "others";
      }

      const storageRefPath = `${storageFolder}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, storageRefPath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // İlerlemeyi burada yönetebilirsiniz (isteğe bağlı)
          // Örneğin, ilerleme durumunu güncellemek için bir callback fonksiyonu ekleyebilirsiniz
        },
        (error) => {
          errors.push(`Yükleme hatası: ${file.name} - ${error.message}`);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedFiles[fileType] = downloadURL;
            resolve();
          } catch (downloadError) {
            errors.push(
              `URL alma hatası: ${file.name} - ${downloadError.message}`
            );
            reject(downloadError);
          }
        }
      );
    });
  });

  try {
    await Promise.all(uploadPromises);
  } catch (e) {
    // Hatalar zaten errors dizisine ekleniyor
  }

  return { uploadedFiles, errors };
};
