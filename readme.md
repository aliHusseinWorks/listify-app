# Listify App

Listify is a React Native mobile application designed to provide users with a seamless experience for browsing and searching ads. The app features location-based filtering, category selection, search capabilities, and user authentication with a user-friendly interface supporting multi-languages.

## Features

- **User Authentication:** Secure login and logout functionality with username and password.
- **Location Selector:** Users can select their location from a modal dropdown, which filters ads based on the selected location.
- **Category Carousel:** A horizontal carousel that displays categories allowing users to select multiple categories to filter ads.
- **Ads Listing:** Displays ads in a grid layout with images, titles, prices, and locations.
- **Search Bar:** Allows users to search ads by title with a clear button and dismisses the keyboard when tapping outside.
- **Price Filtering:** (Planned/Implemented) Users can filter ads based on a price range.
- **Internationalization (i18n):** Supports English and Arabic with proper RTL handling.
- **Theming:** Supports light and dark themes with dynamic styles.
- **Redux Integration:** State management using Redux toolkit for fetching locations, categories, ads, and handling authentication state with loading indicators.

## Technologies Used

- React Native (Expo)
- Redux Toolkit
- React Navigation
- react-i18next
- Expo Localization
- TypeScript
- React Native Vector Icons
- AsyncStorage

## Project Structure

- **styled/** - Reusable UI components (Carousel, AdsList, SearchBar, LocationSelect, etc.)
- **store/** - Redux slices and store setup for managing app state, including authentication
- **theme/** - Theming and styling utilities
- **translation/** - Translation handling for both Arabic and English with RTL support
- **components/** - Screen components integrating UI and logic, including login and account management screens
- **navigation/** - Navigation setup using React Navigation
- **hooks/** - Custom hooks for heavy logic
- **constants/** - Defined static data
- **services/** - Handles API fetches

## Setup & Running

1. Clone the repo:

   ```bash
   git clone https://github.com/aliHusseinWorks/listify-app.git
   cd listify-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
    npm start
    # or
    yarn start
   ```

4. Run on your device or emulator via Expo.

© 2025 Ali Hussein
