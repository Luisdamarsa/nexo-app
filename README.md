# Nexo App

A React Native mobile application that connects lawyers with clients in Colombia, streamlining the process of finding and consulting with legal professionals.

## 🚀 Features

- **User Authentication**: Secure login and registration system for both lawyers and clients
- **Lawyer Discovery**: Find nearby lawyers based on specialization and location
- **Real-time Chat**: Direct communication between lawyers and clients
- **Case Management**: Create and track legal cases
- **Document Sharing**: Secure file upload and sharing system
- **Location Services**: Find lawyers in your vicinity
- **Multi-topic Support**: Various legal specialties including:
  - Traffic Law
  - Credit & Finance
  - Healthcare Law
  - Property Law
  - Family Law
  - Labor Law
  - Criminal Law
  - Administrative Law
  - Commercial Law

## 🛠️ Tech Stack

- React Native
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- React Native Paper (UI Components)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native development environment setup
- Firebase project setup
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Luisdamarsa/nexo-app.git
cd nexo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install pods (iOS):
```bash
cd ios && pod install && cd ..
```

4. Create a `.env` file in the root directory and add your Firebase configuration:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

5. Start the application:
```bash
# For Android
npm run android
# or
yarn android

# For iOS
npm run ios
# or
yarn ios
```

## 🎨 Theme

The app uses a custom theme with the following primary colors:
- Primary (Dark Blue): `#1B264F`
- Secondary (Terracotta): `#E07A5F`

## 📱 Screens

- Authentication (Login/Register)
- User Profile
- Lawyer Discovery
- Case Creation
- Chat Interface
- Document Upload
- Case Management
- Settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Luis Daniel Martinez - [@Luisdamarsa](https://github.com/Luisdamarsa)

Project Link: [https://github.com/Luisdamarsa/nexo-app](https://github.com/Luisdamarsa/nexo-app) 