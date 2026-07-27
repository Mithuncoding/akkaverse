# Supabase Setup for Akkaverse

Supabase supplies the free authentication, Postgres database, realtime events,
and private voice-file storage used by Akkaverse. The application code and
security policies are already implemented. Complete these dashboard steps once.

## 1. Create the free project

1. Open <https://supabase.com/dashboard> and sign in.
2. Select **New project**.
3. Choose an organization, set the project name to `akkaverse`, choose a nearby
   region, and create a strong database password.
4. Store that database password in your password manager. Do not paste it into
   Akkaverse and do not send it through chat.
5. Wait until the project reports that it is ready.

## 2. Create the secure database

1. In the Supabase project, open **SQL Editor**.
2. Select **New query**.
3. Open
   [`supabase/migrations/202607270001_auth_realtime.sql`](../supabase/migrations/202607270001_auth_realtime.sql)
   from this repository and paste its complete contents into the query.
4. Select **Run**.
5. The result should finish without an error. The script is safe to run again.

The migration creates:

- private profiles;
- one private realtime family archive per user;
- a publicly readable, authenticated-write community memory wall;
- row-level security policies for every table;
- a three-posts-per-minute database rate limit;
- a private `voice-legacies` Storage bucket;
- user-scoped Storage policies;
- secure self-service account deletion; and
- realtime publication for family archives and community memories.

Do not disable Row Level Security.

## 3. Configure email authentication

1. Open **Authentication → Providers**.
2. Open **Email**.
3. Enable email/password sign-ins.
4. Keep **Confirm email** enabled. This prevents unverified accounts from
   publishing to the community wall.
5. Save.

Supabase's built-in mailer is sufficient for development and a hackathon demo.
It has delivery limits. Connect custom SMTP later for a public launch.

## 4. Add allowed URLs

Open **Authentication → URL Configuration**.

For local development:

- **Site URL:** `http://localhost:3000`
- **Redirect URL:** `http://localhost:3000/**`

For Vercel, add the exact production address as another redirect URL:

```text
https://YOUR-APP.vercel.app/**
```

After deployment, change **Site URL** to the production address. Keep the local
redirect while developing.

If you use a custom domain, add it too:

```text
https://YOUR-DOMAIN/**
```

## 5. Copy only the public browser credentials

1. Select **Connect** in the Supabase dashboard.
2. Choose the **Next.js** framework instructions.
3. Copy the **Project URL** and **Publishable key**.
4. Open `frontend/.env.local` and add:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

Older Supabase projects may show an `anon` key. Akkaverse also accepts:

```dotenv
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_LEGACY_ANON_KEY
```

Use one public key form, not both. Never use any of these in frontend code:

- `service_role` key;
- secret key;
- database password; or
- JWT signing secret.

The publishable/anon key is designed to be visible in a browser. Security comes
from the included Row Level Security policies.

## 6. Restart and create the first account

Stop the existing development or production server, then run:

```powershell
$env:NODE_OPTIONS='--use-system-ca'; npm --prefix frontend run dev
```

Open <http://localhost:3000/login>.

1. Select **Create account**.
2. Enter your name, email, and a password of at least eight characters.
3. Open the verification email and select its confirmation link.
4. Sign in.
5. Open **Account** from the header and confirm the email status.

Do not send your password or verification link to anyone.

## 7. Verify every critical flow

### Authentication

1. Sign out and sign back in.
2. Select **Forgot password**, open the email, and set a new password.
3. Update the profile name from `/account`.

### Private family sync

1. Sign in to the same account in two different browser profiles.
2. Open `/roots` in both.
3. Add or edit a family member in the first browser.
4. Wait for **Cloud synced**.
5. The second browser should update through realtime, or after one reload.

The first login migrates a non-demo anonymous tree into that account. The
preloaded Mithun demo tree is not silently copied to a new account.

### Private original audio

1. Add an original voice file to a Voice Legacy capsule while signed in.
2. Wait for **Cloud synced**.
3. Sign in on the second browser and open Roots.
4. **Play original voice** should use a short-lived signed Storage URL.

Original audio is private. It is never placed inside the public family link.

### Realtime community wall

1. Open `/memories` in two browsers.
2. Select **Community live** in both.
3. Publish from the signed-in browser.
4. The contribution should appear immediately in both windows.
5. Only its author should see the delete button.

## 8. Configure Vercel

In **Vercel → Project → Settings → Environment Variables**, add:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Apply them to Production and Preview, then redeploy. Also add the deployed URL
to Supabase Authentication URL Configuration as described above.

## Data visibility

| Data | Visibility |
|---|---|
| Login and email | Managed by Supabase Auth |
| Family tree and text capsules | Only that authenticated user, enforced by RLS |
| Original voice files | Private bucket; only that user receives signed URLs |
| Private Memory Wall tab | Browser cache scoped to the current account |
| Community Memory Wall tab | Publicly readable; verified users publish; authors delete |
| Family share link | Contains selected capsule text and metadata, not private audio/tree data |

## Troubleshooting

| Problem | Check |
|---|---|
| Login page says Supabase is not connected | Variables are in `frontend/.env.local`; restart Next.js |
| Verification link returns to the wrong site | Correct Site URL and Redirect URLs in Supabase Auth settings |
| `family_archives` or `community_memories` not found | Run the complete SQL migration |
| Community tab shows a connection error | Confirm the migration added both tables to `supabase_realtime` |
| Upload says cloud sync failed | Confirm the private `voice-legacies` bucket and Storage policies exist |
| Works locally but not on Vercel | Add both public variables to Vercel and redeploy |
| Another account can read private family data | Stop testing and verify RLS is enabled; never add public family policies |

## Optional production upgrades

- custom SMTP for higher email delivery limits;
- CAPTCHA on signup if abuse appears;
- a moderator approval queue for public memories;
- social login providers; and
- a shared Redis rate limiter if AI traffic grows beyond one server instance.