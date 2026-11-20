# MediPath — Emergency Assistance Mobile Application

MediPath is an emergency assistance mobile application designed to help users access emergency-related information, locate nearby hospitals, and navigate essential emergency assistance features.

The project is based on the MediPath UI/UX designs created in Figma. It consists of two applications:

- **Mobile Application:** React Native, Expo, Expo Router, and TypeScript.
- **Admin Web Dashboard:** React, Vite, and TypeScript.

The project currently focuses on frontend development, UI implementation, and demonstration interactions. It is **not yet an operational emergency dispatch system**.

---

## 1. Technologies Used

### Mobile Application
- React Native
- Expo SDK 58
- Expo Router
- TypeScript
- Supabase JavaScript Client
- Expo Go

### Admin Web Dashboard
- React
- Vite
- TypeScript
- CSS

### Planned Integrations
- Supabase Authentication and Database
- Mapbox Maps and Directions API
- Location Services
- Barangay Notifications
- Emergency Request Management

---

## 2. Requirements

Before running the project, make sure you have installed:

- Node.js LTS
- Visual Studio Code
- Git
- Expo Go on an Android phone (or an Android emulator)
- Internet connection for package installation

---

## 3. Project Structure

```text
medipath_work/
│
├── admin/                    # Admin web dashboard
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── app/                      # Expo Router screens
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── home.tsx
│   ├── hospitals.tsx
│   ├── route.tsx
│   ├── first-aid.tsx
│   ├── assistant.tsx
│   ├── contacts.tsx
│   ├── requests.tsx
│   ├── profile.tsx
│   └── ...
│
├── assets/
│   └── brand/                # MediPath logos and branding
│
├── src/
│   ├── components/           # Reusable UI components
│   ├── data/                 # Demo data
│   ├── lib/                  # Supabase client setup
│   └── theme.ts              # App theme and styling
│
├── .env.example
├── .gitignore
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 4. Running the Mobile Application

Open the project root folder in VS Code.

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start Expo

```bash
npx expo start
```

Scan the generated QR code using Expo Go on your Android phone.

If your phone and computer cannot connect through the local network, use:

```bash
npx expo start --tunnel
```

If you need to clear the Expo cache:

```bash
npx expo start --tunnel --clear
```

---

## 5. Running the Admin Web Dashboard

The admin dashboard is a separate React + Vite application located inside the `admin/` directory.

It is intended for barangay and administrative staff to manage emergency-related information through a desktop web interface.

### Step 1: Open a second terminal

Make sure you are in the project root, then navigate to the admin folder:

```bash
cd admin
```

### Step 2: Install admin dependencies

```bash
npm install
```

### Step 3: Start the development server

```bash
npm run dev
```

### Step 4: Open the dashboard

Visit the local URL displayed by Vite. The default address is:

```text
http://localhost:5173
```

### Admin Dashboard Pages

The current admin interface includes:

- Staff Login
- Dashboard
- Emergency Requests
- Hospital Management
- First Aid Content
- User Management
- Reports
- Settings

**Preview Login:**

For the current UI demonstration, enter any valid-looking email address and a password containing at least six characters.

The role selector is only for previewing the interface. Authentication is not connected, and the records and actions use local sample data.

---

## 6. Configuring Supabase

Supabase is planned as the backend service for MediPath. The current client setup remains inactive until the required environment variables are provided.

### Mobile Application Setup

1. Create a Supabase project.
2. Open **Project Settings → API**.
3. Copy your Project URL and publishable key (or legacy anon key).
4. Copy `.env.example` and rename the copy to `.env`.
5. Add your Supabase credentials.

Example:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

Restart Expo after changing environment variables:

```bash
npx expo start -c
```

The Supabase client is initialized in:

```text
src/lib/supabase.ts
```

It remains `null` until the required environment variables are supplied.

### Admin Dashboard Setup

The admin application has its own environment configuration file:

```text
admin/.env.example
```

Create a corresponding `admin/.env` when configuring the admin application for future Supabase integration.

**Security Reminder:**

Never expose a Supabase `service_role` key in a mobile application or browser-based admin application. Use the publishable/anon key with properly configured Row Level Security (RLS) policies.

---

## 7. Current Implementation Status

### Mobile Application

| Feature | Current Status |
|---|---|
| Welcome and onboarding | UI and navigation implemented |
| Login and registration | UI implemented |
| Home dashboard | UI and navigation implemented |
| SOS button | 2-second hold demonstration |
| Nearest hospitals | Sample hospital data |
| Hospital route details | Static illustration |
| First Aid | Topic list and detail screens |
| CPR Guide | Overview and instructional UI |
| Emergency details | Form demonstration |
| Request status | Demonstration screen |
| Emergency contacts | UI implemented |
| AI Assistant | Placeholder interface |
| Profile and settings | UI implemented |
| Saved requests | Demonstration interface |
| Supabase | Client setup placeholder |
| Mapbox | Not connected |
| Barangay notifications | Not connected |
| Real emergency dispatch | Not connected |

### Admin Web Dashboard

| Feature | Current Status |
|---|---|
| Staff login | UI preview only |
| Dashboard | UI with sample data |
| Emergency requests | Sample data |
| Hospital management | UI with sample data |
| First Aid content | UI with sample data |
| User management | UI with sample data |
| Reports | UI with sample data |
| Settings | UI implemented |
| Supabase authentication | Not connected |
| Live database operations | Not connected |

---

## 8. Important Limitations and Safety Notice

MediPath is currently a frontend prototype with demonstration interactions.

The following features are not yet operational:

- The SOS button does not send a real emergency request.
- The application does not automatically notify barangay responders.
- The application does not send the user's GPS coordinates to emergency personnel.
- Hospital information is sample data and does not represent verified facility availability.
- Route information is illustrative and does not use live navigation.
- Supabase authentication and database operations are not connected.
- The AI Assistant does not generate live responses.
- Admin dashboard records and actions are currently based on local sample data.

**Do not use this prototype as an actual emergency response or dispatch service.**

First Aid and CPR content must be reviewed and approved by a qualified medical professional before public use.

---

## 9. Next Development Steps

The planned development tasks include:

1. Complete the remaining Figma screen implementations and improve UI consistency.
2. Finalize the Supabase database schema, relationships, and RLS policies.
3. Implement user authentication and profile management.
4. Connect the admin dashboard to Supabase.
5. Implement emergency request creation and responder status updates.
6. Integrate location permissions and Mapbox maps and directions.
7. Develop barangay notification functionality.
8. Implement appropriate server-side validation and notification delivery.
9. Test offline functionality, failed network requests, and emergency workflows.
10. Conduct usability and functionality testing.

---

## 10. Development Notes

The mobile application and admin dashboard have separate dependency configurations.

When setting up the project on a new computer, install their dependencies separately:

**Mobile Application:**

```bash
npm install
```

**Admin Web Dashboard:**

```bash
cd admin
npm install
```

You do not need to reinstall dependencies every time you run the applications. Installation is normally required only during initial setup, after deleting `node_modules`, or when project dependencies change.

The `node_modules` folders are excluded from GitHub. The corresponding `package.json` and `package-lock.json` files should remain in the repository.

---

**MediPath — Emergency Assistance Mobile Application**

*Developed as an academic software development project.*