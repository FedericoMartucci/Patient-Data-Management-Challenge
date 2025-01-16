# Medify: A Patient Data Management Application

## Overview

**Medify** is a frontend application designed to enable users to manage patient records efficiently. It allows users to view, edit, and add new patient data through an intuitive and responsive interface. Built with **React** and **TypeScript**, this project demonstrates reusable components, robust form validation, and interactive user interactions without relying on persistent data storage.

## Key Features

- **Patient Records Display**: Retrieves and displays patient data in individual cards.
- **Expandable Details**: Users can expand/collapse patient cards to view additional information.
- **Modal-Based Editing and Creation**: Provides a user-friendly modal interface to edit existing records or add new patients.
- **Form Validation**: Ensures accuracy and completeness of patient data through form validation.
- **Optional Features**:
  - **Notifications**: Provides feedback for successful or failed actions.
  - **Smooth Animations**: Adds interactivity with responsive and animated components.

## Technology Stack

- **React**: For building a modular and interactive user interface.
- **Vite**: A fast build tool for optimized development.
- **Redux**: For centralized and predictable state management.
- **TypeScript**: To ensure type safety and maintainability.

## Getting Started

### Prerequisites

- Node.js (version 20)
- npm or Yarn

### QuickStart

1. **Clone the Repository**

   ```bash
   git clone [https://github.com/sirius-valley/tricker-front.git](https://github.com/FedericoMartucci/Patient-Data-Management-Challenge)
   cd Patient-Data-Management-Challenge

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Create a .env file**

Copy the contents from .env.template adding your custom variables

4. **Run the application**

   ```bash
   npm run dev
   ```

### Project Structure

```
src/
├── components/         # Reusable components (e.g., Modal, PatientCard, etc.)
├── hooks/              # Custom hooks to abstract business logic
├── pages/              # Page components for different views
├── redux/              # Global state management with Redux
├── router/             # Route management and navigation
├── utils/              # Utility functions (e.g., form validation)
└── App.tsx             # Main application component
```

### Design Decisions

- **Custom Components**: No external UI libraries were used to highlight proficiency in creating components from scratch.
- **State Management**: Redux was chosen to manage global state efficiently, enabling predictable behavior for form validation and patient record updates.

### Future Improvements

- **Persistent Data**: Integrate a backend or local storage for data persistence.
- **Error Handling**: Implement comprehensive error boundaries for better reliability.
- **Storybook Integration**: Document reusable components and improve collaboration by introducing Storybook.
- **Formik for Form Validation**: Replace custom validation logic with Formik for more scalable and robust form handling, including better handling of complex validation rules.
