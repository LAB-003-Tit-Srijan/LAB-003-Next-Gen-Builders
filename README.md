# SmartCampus

Firebase is used for authentication, and MongoDB is used for app data storage.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in your Firebase web app values.
3. Enable Email/Password and Google sign-in in the Firebase console.
4. Configure MongoDB Atlas Data API values:
   - `MONGODB_DATA_API_URL`
   - `MONGODB_DATA_API_KEY`
   - `MONGODB_DATA_SOURCE`
   - `MONGODB_DATABASE`
   - `MONGODB_USERS_COLLECTION`
5. Run the app with `npm run dev`.

Successful sign-in and sign-up both route to the dashboard.
After successful auth, the app calls `/api/users/sync` and upserts the user profile into MongoDB.
