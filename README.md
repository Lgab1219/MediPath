# MediPath mobile — Expo starter

This starter is based on the MediPath Figma screens inspected for:
- Welcome / onboarding
- Home dashboard
- Nearest Hospitals
- Route details

It uses React Native + Expo Router + TypeScript + Supabase JS. It is a frontend scaffold with demo data; it is **not** an operational emergency dispatch application.

## 1. Requirements

- Node.js LTS
- VS Code
- Expo Go on an Android phone (or an Android emulator)
- Internet connection for package installation

## 2. Run the project

Open this folder in VS Code, then run:

```bash
npm install
npx expo start
```

Scan the QR code using Expo Go. If the phone and computer cannot connect, try:

```bash
npx expo start --tunnel
```

## 3. Configure Supabase

1. Copy `.env.example` and rename the copy to `.env`.
2. In Supabase, open **Project Settings → API**.
3. Copy the Project URL and the publishable key (or legacy anon key) into `.env`.

Example:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
```

Restart Expo after changing environment variables:

```bash
npx expo start -c
```

Never put a Supabase `service_role` key in a mobile app. The publishable/anon key is intended for client use only when Row Level Security (RLS) is correctly enabled.

The Supabase client is initialized in `src/lib/supabase.ts`. It remains `null` until the environment variables are supplied.

## 4. Current implementation status

| Feature | Status |
|---|---|
| Welcome screen | UI and navigation |
| Home dashboard | UI and navigation |
| SOS hold gesture | 2-second demo interaction only |
| Hospital list | Sample data |
| Route detail | Static illustration; no live route |
| Profile / contacts / requests | Placeholder screens |
| Supabase | Client setup placeholder; no tables queried |
| Mapbox | Not connected |
| Barangay notifications | Not connected |
| Real emergency dispatch | Not connected |

## 5. Important before real-world use

The SOS button currently shows a demo alert. It does not send a request, share location, call emergency services, or notify barangay responders. Hospital records and routes are sample UI data, not verified live facility availability or routing.

Before connecting Supabase, obtain the team's actual schema and RLS policies for profiles, emergency requests, hospitals, and responder notifications. For a real emergency workflow, implement server-side validation and notification delivery (for example, Supabase Edge Functions plus a verified push/SMS provider). Do not expose service-role credentials in the app.

## 6. Next development steps

1. Match the remaining Figma screens and reusable components.
2. Confirm Supabase tables, columns, relationships, and RLS policies.
3. Implement authentication and profile retrieval.
4. Implement emergency request creation and responder updates.
5. Add location permissions and Mapbox maps/directions.
6. Test offline behavior, failed network requests, and emergency flows.

## Project structure

```text
app/
  _layout.tsx
  index.tsx
  home.tsx
  hospitals.tsx
  route.tsx
  first-aid.tsx
  assistant.tsx
  contacts.tsx
  requests.tsx
  profile.tsx
src/
  components/UI.tsx
  data/demo.ts
  lib/supabase.ts
  theme.ts
.env.example
```

## 7. Admin web dashboard (new)

The admin dashboard is a separate Vite + React application inside `admin/`. It is intended for barangay/admin staff on desktop browsers and shares the MediPath design language. It does not change the Expo mobile app or its SDK 58 dependencies.

Open a second VS Code terminal:

```bash
cd admin
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). The admin pages include staff sign-in, dashboard, emergency requests, hospital management, first-aid content, user management, reports, and settings.

**Preview login:** enter any valid-looking email address and a password of at least 6 characters. The role selector is for previewing the UI only. Authentication is not connected, and the records/actions are local sample data. Do not use this preview for actual emergency operations.

The admin app has its own `.env.example` for future Supabase configuration. Do not put a Supabase service-role key in the browser app. Before connecting live data, confirm the team's database schema, staff roles, authentication flow, and Row Level Security policies.

## Mobile UI — Phase 2

The mobile prototype now includes a larger set of user-facing screens and flows:

- Welcome and sign-in / registration entry points
- Home dashboard with the two-second SOS hold demonstration
- Nearest hospitals list and illustrative offline map panel
- Hospital route information screen (illustrative only)
- First Aid topic list, topic detail pages, and CPR overview
- Emergency details form and request-status demonstration
- Emergency contacts, assistant placeholder, saved requests, profile, and settings

### Run the mobile app

From the repository root:

```powershell
npm install
npx expo start --tunnel ngrok --clear
```

Scan the QR code with Expo Go on the Android phone.

### Current limitations

This phase focuses on the mobile UI and local demonstration interactions. Supabase authentication and database operations are not connected; hospital data and map routes are sample/illustrative; SOS does not send a real emergency request, share GPS coordinates, or notify barangay responders; and the assistant does not generate live answers. First-aid and CPR content must be reviewed and approved by a qualified medical professional before public use. Do not use this prototype as an operational emergency response service.
