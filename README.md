# 📊 Dashboard Builder - Angular 17

## 🔍 Overview

This is a Dashboard Builder application built using **Angular 17**. Admin users can add, configure, and preview reusable UI widgets such as charts and text blocks. The application uses dynamic forms, reactive design patterns, Angular Signals and local storage for layout persistence.

---

## 🏗️ Application Structure & Reasoning

```
src/
├── app/
│   ├── charts/               # All kind of reusable charts
│   ├── core/                 # Common necessary services(e.g., storage)
│   ├── dashboard/            # Dashboard Feature module
│   │   ├── components/       # Smart/dumb components (create, layout)
│   │   ├── services/         # Feature-specific services (dashboard data)
│   │   ├── models/           # dashboard models/interfaces
│   ├── shared/               # Reusable UI elements
│   │   ├── components/       # Reusable components (e.g., header)
│   │   ├── utils/            # Helper utility functions
│   ├── widget/               # Widget Feature module
│   │   ├── components/       # Smart/dumb components (create, layout)
│   │   ├── services/         # Feature-specific services (widget helper)
│   │   ├── models/           # widget models/interfaces
│   └── app.routes.ts         # Routing definitions
```

### 📚 Reasoning:

- **Feature-based foldering** ensures modularity and separation of concerns.
- **Reactive Forms** allow flexibility in widget configuration.
- **Angular Signals** improve reactivity and performance.
- **LocalStorage service** supports persistent layout saving.

---

## ✨ Key Features

- 📊 Widget creation with configuration
- 📄 Chart/Text type selector
- 🧠 Dynamic forms by widget type
- 📐 Responsive layout using grid system
- 📊 Easy resizable and draggable Widgets
- 💾 LocalStorage persistence
- 🧱 Reusable, testable components
- 🚀 Github hosted application for quicker demo

---

## ⚖️ Trade-offs / Limitations

| Area              | Trade-off / Limitation                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| **UI Styling**    | Basic SCSS used to focus on logic; could use Tailwind/Material for polish |
| **Charts**        | Static data with PrimeNG; dynamic API integration not implemented         |
| **Form UX**       | Basic form validation only|
| **Resuable UI Elements**  | Resuable button, icon, input elements are not created
| **CSS Variables** | Variables are not used since we might move to tailwind css later on |

---

## 🚀 What I'd Improve With More Time

- 📊 Multiple Dashboard Support with configurable widgets
- 💅 Integrate TailwindCSS for faster, consistent UI styling
- 📡 Connect to live API for real-time KPI data
- 📊 Expand widget library with more chart types (pie, doughnut,. etc.)
- 📱 Improvise mobile experience
- ✨ ESLint and Prettier integration for readable and maintainable code
- 🧱 Develop resuable button, icon, input and other UI elements

---

## 🛠 Getting Started

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

---

## **Live Demo**

Click the [Live Demo](https://jprasad21.github.io/straiv-dashboard/) to explore the application in action.

---