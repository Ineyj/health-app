# Health App - First Aid Quick Guide

A React Native health app with authentication that provides instant first aid instructions for various emergencies.

## Features

### 🔐 Authentication System
- **User Login**: Secure login with email and password validation
- **User Registration**: Sign up with name, email, and password
- **Session Management**: Persistent login sessions using AsyncStorage
- **Protected Routes**: Main app content is only accessible to authenticated users

### 🚑 First Aid Features
- **Emergency Guides**: Comprehensive first aid instructions for various situations
- **Search & Filter**: Find guides by keywords or categories
- **Favorites**: Save frequently used guides for quick access
- **Emergency Contacts**: Quick access to emergency service numbers
- **Severity Levels**: Color-coded emergency levels (Minor, Moderate, Emergency)

## Authentication Details

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

### User Registration
- Create new accounts with custom credentials
- Password requirements: minimum 6 characters
- Automatic login after successful registration

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install AsyncStorage** (if not already installed)
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## Project Structure

```
Health-App-2/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with authentication
│   ├── index.tsx          # Main app screen (protected)
│   ├── login.tsx          # Login screen
│   ├── signup.tsx         # Registration screen
│   └── guide/[id].tsx     # Individual guide details
├── components/             # Reusable components
│   ├── ui/                # UI components (Button, Input, etc.)
│   └── auth-guard.tsx     # Authentication guard component
├── lib/                    # Utilities and contexts
│   ├── auth-context.tsx   # Authentication context
│   └── utils.ts           # Helper functions
└── assets/                 # Images, fonts, and static files
```

## Authentication Flow

1. **App Launch**: Checks for existing user session
2. **Unauthenticated**: Redirects to login screen
3. **Login**: Validates credentials and creates session
4. **Signup**: Creates new account and logs in automatically
5. **Main App**: Protected content with user-specific features
6. **Logout**: Clears session and returns to login

## Security Features

- **Input Validation**: Client-side form validation
- **Session Persistence**: Secure storage of user sessions
- **Protected Routes**: Authentication guard prevents unauthorized access
- **Secure Logout**: Confirmation dialog and session cleanup

## Customization

### Adding New Emergency Guides
Edit the `firstAidGuides` array in `app/index.tsx` to add new emergency scenarios.

### Styling
The app uses NativeWind (Tailwind CSS for React Native) for styling. Modify `tailwind.config.js` for custom design tokens.

### Authentication Backend
Replace the mock authentication in `lib/auth-context.tsx` with real API calls to your backend service.

## Troubleshooting

### Common Issues

1. **Metro Bundler Errors**: Clear cache with `npx expo start --clear`
2. **Authentication Issues**: Check AsyncStorage permissions and clear app data
3. **Styling Issues**: Ensure NativeWind is properly configured

### Development Tips

- Use Expo DevTools for debugging
- Enable Fast Refresh for rapid development
- Test on both iOS and Android for compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
