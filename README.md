# Maksat Muhabbet

**Maksat Muhabbet**, kullanıcıların samimi ve eğlenceli sohbetler gerçekleştirebileceği bir sohbet uygulamasıdır. Firebase altyapısını kullanarak güvenli bir şekilde kimlik doğrulama yapabilir, sohbet verilerini ve medya dosyalarını yönetebilirsiniz. 

## Özellikler

- **Kullanıcı Kimlik Doğrulama**: Firebase Authentication ile güvenli giriş yapın.
- **Gerçek Zamanlı Sohbet**: Firestore Database kullanarak mesajlarınızı anlık olarak paylaşın.
- **Medya Paylaşımı**: Firebase Storage ile fotoğraf gönderin, (video ve ses özellikleri yakında).
- **Mesajlara Emoji Ekleme**: Emoji Picker ile mesajlarınıza renk katın.
- **SCSS ile Özel Tasarım**: Modern ve duyarlı tasarım için SCSS kullanıldı.

## Ekran Görüntüsü

![Maksat Muhabbet](screenshot.gif)

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü geliştirmek için.
- **Firebase**:
  - Authentication (Kullanıcı giriş/çıkış işlemleri)
  - Firestore Database (Sohbet verilerini depolama)
  - Storage (Medya dosyalarını depolama)
- **SCSS**: Uygulamanın stil bileşenlerini özelleştirmek için.
- **UUID**: Her mesaj ve kullanıcı için benzersiz kimlik oluşturmak amacıyla.
- **Emoji Picker React**: Mesajlarınıza emoji ekleyebilmeniz için.
- **React Icons**: Uygulamada ikonları kolayca kullanabilmek için.

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Bu projeyi klonlayın:
   ```bash
   git clone https://github.com/cengo14/firebase-react-chat-msn-project.git
   ```

2. Proje dizinine gidin:
   ```bash
   firebase-react-chat-msn-project
   ```

3. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

4. Firebase yapılandırmanızı `.env` dosyasına ekleyin:
   ```plaintext
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_APP_FIREBASE_PROJECT_ID=your-project-id
   VITE_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_APP_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

5. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## Kullanılan Kütüphaneler

- [Firebase](https://firebase.google.com/)
- [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react)
- [react-icons](https://react-icons.github.io/react-icons/)
- [uuid](https://www.npmjs.com/package/uuid)

## Katkıda Bulunma

Her türlü geri bildirime açığız! Projeye katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya bir issue açın.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.

---
