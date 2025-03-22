# Flash Memory Cards

A React Native application for creating and managing flashcards to help with memorization and studying.

## Features

- Create and manage categories for organizing your study materials
- Create subjects within categories
- Add detailed notes with rich text formatting
- Search and filter functionality
- PDF resume export
- Color coding and icon selection for visual organization
- Notification system for revision reminders

## Tech Stack

- React Native
- TypeScript
- Watermelon DB
- Redux (state management)
- React Navigation
- Jest for testing

## Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/flashMemoryCards.git
cd flashMemoryCards
```

2. Install dependencies
```bash
yarn install
```

3. Run the application
```bash
# For Android (iOS application in progress)
yarn android
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/screens` - Application screens
- `/src/databases` - Database models and schemas
- `/src/navigation` - Navigation configuration
- `/src/utils` - Utility functions
- `/src/context` - React context providers

## Testing

Run tests with Jest:
```bash
yarn test
```

## License

See the [LICENSE](LICENSE) file for details.