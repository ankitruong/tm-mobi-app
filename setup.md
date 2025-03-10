# 📱 Token Metrics Mobile App

## 📝 Description

Token Metrics mobile app built with React Native and TypeScript, providing cryptocurrency analysis and insights on the go.

## 🚀 Development Setup

### Prerequisites

- Node.js (v18 or later)
- npm
- iOS: XCode 14+ (for iOS development)
- Android: Android Studio (for Android development)
- React Native CLI
- Expo CLI

### Environment Setup

1. Clone the repository

```bash
git clone [repository-url]
cd tokenmetrics-mobile-app
```

2. Install dependencies

```bash
npm install
```

3. Environment Configuration

- Copy `.env.example` to `.env.development`
- Request environment variables from the team

### Running the App

#### Expo

```bash
# Run expo
npm run start
```

#### iOS

```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run iOS app
npm run ios
```

#### Android

```bash
# Run Android app
npm run android
```

## 🧪 Testing and Quality

```bash
# Run linter
npm run lint

# Check types
npm run check-types

# Format code
npm run format

# Run tests
npm run test:final
```

## 📱 App Structure

```
src/
├── assets/         # Images, fonts, and other static files
├── components/     # Reusable UI components
├── config/         # App configuration
├── hooks/          # Custom React hooks
├── interfaces/     # TypeScript interfaces
├── navigation/     # Navigation configuration
├── screens/        # App screens
├── services/       # API and other services
└── utils/         # Utility functions
```

## 🌿 Branch Naming Convention

- Feature: `feature/eng-[ticket-number]-description`
- Bugfix: `bugfix/eng-[ticket-number]-description`
- Hotfix: `hotfix/eng-[ticket-number]-description`
- Task: `task/eng-[ticket-number]-description`

Example: `feature/eng-888-chat-bot-integration`

## ✅ Pre-Pull Request Checklist

1. Code follows the project's style guide
2. No TypeScript errors: `npm run check-types`
3. No linting errors: `npm run lint`
4. Code is properly formatted: `npm run format`
5. All tests pass: `npm run test:final`
6. Debugging code removed
7. PR description follows template
8. Branch naming follows convention

## 💻 Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **TailwindCSS (NativeWind)**
- **React Navigation**
- **React Native Markdown**
- **ESLint & Prettier**
- **Supabase**

## 🛠 Development Tools

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "streetsidesoftware.code-spell-checker",
    "naumovs.color-highlight",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

### VS Code Settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)

## ⚠️ Notes

- Never commit sensitive information or API keys
- Keep the `.env.example` file updated with all required variables (without values)
- Follow the team's code review guidelines
- `withCustomGradlePropertiesPlugin` are both plugins patch to make `@react-native-voice/voice` work on Android. It also requires disabling the new architecture for Android. Add these to the app.json plugins section. and disable new architecture in the app.json android section if you want to use it.
- When doing a production build for android or through xCode for iOS, make sure to use `expoEnv.ts` enabled in `configurations.ts` as `.env` is not used in release builds. This is a current bug in expo.
