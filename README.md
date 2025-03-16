# Event Countdown Timer

## Description

Event Countdown Timer is an Angular application that allows users to set an event name and an end date, displaying a countdown timer that updates in real-time. The application dynamically adjusts text size to fit the screen width and ensures persistence of event details across page reloads.

## Features

- Set and save an event title.
- Set and save an event date.
- Countdown updates in real-time.
- Text dynamically resizes to fit the screen width.
- Works in both portrait and landscape mode.
- Event details persist between sessions.
- Built with Angular, TypeScript and Material UI.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/MartaLourido/event-countdown-timer.git
    cd event-countdown-timer
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    ng serve
    ```

4. Open the application in your browser at:
    ```sh
    http://localhost:4200/
    ```

## Usage

- Enter an event title in the input field.
- Select an event date from the date picker.
- The countdown timer will display the time remaining until the event.
- Resize the browser window to see the text dynamically adjust.
- Refresh the page, and your event details will remain saved.

## Components

### `AppComponent`
- Manages the overall application state.
- Loads and saves event details in local storage.

### `CountdownTimerComponent`
- Displays and updates the countdown timer in real-time.
- Formats remaining time in "Days, Hours, Minutes, Seconds".

### `EventInputComponent`
- Handles user input for the event title.
- Emits changes to the parent component.

### `DatePickerComponent`
- Provides a date picker for selecting an event date.
- Emits changes to the parent component.

### `AutoFitTextDirective`
- Dynamically resizes text to fit within its container.
- Adjusts font size based on screen width.

## Testing

### Running Tests
To execute unit tests, run:
```sh
ng test
```
This will launch Karma and execute all tests in a browser.

### Test Coverage
- Unit tests cover components, directives, and services.
- Ensures proper formatting and persistence of event details.
- Validates real-time countdown updates.

## Future Improvements

- **Improve UI/UX**: Enhance styling and animations.
- **Time Zone Support**: Allow users to select a time zone for the event.
- **Notifications**: Send notifications when the event countdown is near zero.
- **Multi-Language Support**: Implement i18n for global usability.

## Links

- [GitHub Repository](https://github.com/MartaLourido/event-countdown-timer)
- [Angular Documentation](https://angular.io/docs)
- [Material UI Documentation](https://material.angular.io/)

## License

This project is licensed under the MIT License.

