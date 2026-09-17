# Algo Galaxy — Online Judge (V1)

> *Where Every Algorithm Finds Its Star*

An online judge platform where users solve algorithmic problems in **C++, Java, Python, or JavaScript**, with a built-in compiler playground, problem submission flow, role-based dashboards, and a community contribution pipeline.

Hello

Live: **[algogalaxy.in](http://13.204.2.198:3000)**

---

## Table of Contents

- [Overview](#overview)
- [Features (V1)](#features-v1)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Reference](#api-reference)
- [Roles &amp; Permissions](#roles--permissions)
- [Code Execution Flow](#code-execution-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup (npm)](#local-setup-npm)
  - [Docker Setup](#docker-setup)
  - [Environment Variables](#environment-variables)
- [Usage Walkthrough](#usage-walkthrough)

---

## Overview

Algo Galaxy is a full-stack online judge built with **Next.js 14 (App Router)** and **MongoDB**. It offers three things competitive programmers expect:

1. A **playground** for free-form code execution against custom input.
2. A **problem set** with statements, test cases, and per-problem submit/verdict flow.
3. A **community pipeline** where users contribute new problems and test cases that moderators review and admins manage.

Languages supported by the judge: **C++, Java, Python, JavaScript**.

---

## Features (V1)

### Authentication

- Email + password signup with **email-verification flow** (UUID token, 15-minute expiry, auto-delete unverified users).
- Login issues a **JWT** stored in an `httpOnly` cookie (1-day expiry).
- Logout, "me" endpoint, and password-reset email scaffolding via Nodemailer.

### Playground (`/playground`)

- CodeMirror editor with VS Code Dark theme.
- Language switcher (C++ / Java / Python / JavaScript) with sample boilerplate.
- Custom stdin via textarea, runs against `POST /api/run`, displays stdout.

### Problems (`/problems`)

- Lists all **verified** problems with title, number, difficulty (easy/medium/hard), acceptance %.
- Per-problem page (`/problems/[slug]`):
  - Description / All-Submissions / Submissions tabs.
  - Resizable split layout: problem statement (left), code editor + I/O panel (right).
  - **Run** — executes user code against the problem's visible test-case inputs, returns per-input verdict (Accepted / Wrong Answer + actual vs expected).
  - **Submit** — runs against all stored test cases, persists a `ProblemSubmission` with verdict (Accepted / Rejected) and stops on first failing case.
  - Built-in timer widget (cosmetic in V1).
  - Problem-list slide-out (Sheet) for navigating between problems.

### Contribute (`/contribute`)

- Multi-step form to submit a new problem (`background → question → solution → testcases`).
- Test-case-only contribution path also wired up.
- Submitted problems land in the moderator pending queue with status `pending`.
- Sidebar shows the contributor's own submissions with verification status.

### Moderator Dashboard (`/moderator`)

Visible only to users with `roles.isModerator`.

- **Pending** queue — review unverified contributed problems; per-problem detail page allows verify-and-update or reject with reason.
- **Verified** and **Rejected** tabs for completed reviews.

### Admin Dashboard (`/admin`)

Visible only to users with `roles.isAdmin`.

- **Users** — list, toggle `isAdmin` / `isModerator` flags, save role changes, delete users.
- **Problems** — list every problem regardless of status, soft-delete (move to trash), restore from trash, hard-delete.

### Coming-Soon Sections

`/contest`, `/courses`, `/discuss` — page stubs only in V1.

---

## Tech Stack

| Layer      | Technology                                                                      |
| ---------- | ------------------------------------------------------------------------------- |
| Framework  | **Next.js 14.2** (App Router, Server Components + Route Handlers)         |
| Language   | **TypeScript**                                                            |
| Database   | **MongoDB** via Mongoose 8                                                |
| Auth       | JWT (`jsonwebtoken`) + `bcryptjs` + `httpOnly` cookies                    |
| Validation | Zod                                                                             |
| Styling    | Tailwind CSS + shadcn/ui (Radix primitives)                                     |
| Editor     | CodeMirror 6 (`@uiw/react-codemirror`) with C++/Java/Python/JS language packs |
| Animations | Framer Motion,`tsparticles` (sparkle background)                              |
| Markdown   | `@uiw/react-md-editor`, `react-markdown`                                    |
| Mail       | Nodemailer                                                                      |
| Toasts     | `react-hot-toast`                                                             |
| Container  | Docker + docker-compose (Node 18 + g++ + python3 + JDK + Mongo)                 |

---

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                      Browser (React)                      │
│  HomePage · Playground · Problems · Contribute · Admin    │
│            JWT cookie · axios · CodeMirror                │
└───────────────────────────────────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────────┐
│           Next.js App Router (route handlers)             │
│  /api/user/*    /api/problem/*    /api/run    /api/submit │
│  /api/contribution    /api/admin/*    /api/moderator/*    │
└───────────────────────────────────────────────────────────┘
            │                                    │
            ▼                                    ▼
   ┌─────────────────┐               ┌──────────────────────┐
   │    MongoDB      │               │   Code Execution     │
   │ User · Problem  │               │ child_process.exec   │
   │ ProblemSubmission│              │ g++ / javac+java /   │
   └─────────────────┘               │ python / node        │
                                     │ writes file → exec   │
                                     │ → unlink → return    │
                                     └──────────────────────┘
```

The judge runs **inside the Next.js process** via Node's `child_process.exec`. Source is written to a uuid-named file in `src/helpers/CodeExecution/<lang>codes/`, compiled/run with stdin redirected from a separate input file, then both files are unlinked. C++ binaries land in `outputs/`; Java compiles with `Main.java` → `Main.class`.

---

## Project Structure

```
OJ-Project/
├── Dockerfile                   # Node 18 + g++ + JDK + python3
├── docker-compose.yaml          # app + mongodb services
├── next.config.mjs              # redirects (/admin→/admin/users, etc.)
├── package.json
├── public/
└── src/
    ├── app/
    │   ├── layout.tsx           # Root layout, AuthProvider, Toaster
    │   ├── page.tsx             # Landing (Algo Galaxy hero)
    │   ├── (auth)/              # /login /signup /verifyemail /profile/[id]
    │   ├── (sections)/
    │   │   ├── playground/      # Standalone compiler
    │   │   ├── problems/        # List + [problem]/{description,submissions,allSubmissions}
    │   │   ├── contribute/      # question/{background,question,solution,testcases} · testcase/*
    │   │   ├── admin/           # users · problems · problems/trash
    │   │   ├── moderator/       # pending/[problemName] · verified · rejected
    │   │   ├── contest/         # Coming soon
    │   │   ├── courses/         # Coming soon
    │   │   └── discuss/         # Coming soon
    │   └── api/
    │       ├── user/            # signup · login · logout · me · userInfo · verifyemail
    │       ├── problem/         # createProblem · deleteProblem · verifiedProblems · [problemName]/*
    │       ├── run/             # POST / · POST /[problemName]
    │       ├── submit/          # POST /[problemName]
    │       ├── contribution/    # GET (current user's contributions)
    │       ├── moderator/       # pendingProblemVerification · problemVerified · problemRejected · [name]/{updateAndVerify,rejectProblem}
    │       ├── admin/           # users{/,/role,/delete} · problems{/,/remove,/restore,/delete,/trash}
    │       └── health/          # GET (sanity check)
    ├── components/
    │   ├── ui/                  # shadcn-style primitives (sheet, sparkles, resizable, etc.)
    │   ├── HomePage/            # Navigation, Footer
    │   ├── Auth/                # Login, Signup, Verify
    │   ├── ProblemPage/         # ProblemSection (renders statement)
    │   ├── ContributePage/      # ContributionCard, TestCase
    │   ├── TestCase/            # TestCaseSection, TestResultSection, VerdictSection
    │   ├── Section/             # SectionSideBar
    │   ├── ProblemEditor.tsx
    │   ├── CodeEditor.tsx
    │   └── InputOutputEditor.tsx
    ├── config/
    │   ├── constants.ts         # Language, Difficulty, Verification, Success enums + sampleCode
    │   └── database.ts          # mongoose connect singleton
    ├── context/                 # AuthContext, ProblemFormContext, FormContext, AllProblemContext, AddProblemForm
    ├── helpers/
    │   ├── CodeExecution/
    │   │   ├── executeCode.ts   # dispatcher
    │   │   ├── executeCpp.ts    # g++ compile + run
    │   │   ├── executeJava.ts   # javac + java
    │   │   ├── executePython.ts # python <file>
    │   │   └── executeJavascript.ts # node <file>
    │   ├── generateFile.ts      # uuid-named file writer
    │   ├── getCodeExtension.ts
    │   ├── Authorization.ts     # JWT role checks
    │   ├── getDataFromToken.ts
    │   ├── getDataFromHeader.ts
    │   ├── generateToken.ts
    │   ├── mailer.ts            # Nodemailer verify/reset emails
    │   └── generateFiltered{Problem,User}Pipeline.ts
    ├── models/                  # user · problem · problemSubmission (Mongoose)
    ├── lib/                     # auth, utils
    ├── types/                   # forms (zod schemas) · models · Data (cookie shape)
    └── utils/                   # cn (tailwind class merger)
```

---

## Data Models

### `User`

```
username  (unique, lowercase, indexed)   firstname  lastname  email (unique, indexed)
password  (bcrypt hash)                  isVerified  (default false)
roles: { isAdmin, isModerator }          forgotPasswordToken / Expiry
verifyToken / verifyTokenExpiry          createdAt / updatedAt
```

### `Problem`

```
number  title (unique)  description  difficulty (easy|medium|hard)
topics[]  companies[]   hints[]      inputFormat[]  outputFormat[]
constraints[]           testCases: [{ input, output?, visible, explanation? }]
solution: { language, code }   followUp
verification (pending|verified|rejected|deleted)
reasonForContribution  _createdBy  _approvedBy  _rejectedBy
```

### `ProblemSubmission`

```
whoSolved (username)   problemTitle
solution: { language, code }
verdict: {
  testcasePassed, totalTestcase,
  status: { success: accepted|rejected, message }
}
```

---

## API Reference

> All authenticated endpoints expect the `token` cookie set by `/api/user/login`.

### Auth (`/api/user`)

| Method   | Path             | Purpose                                                                     |
| -------- | ---------------- | --------------------------------------------------------------------------- |
| `POST` | `/signup`      | Validates with Zod, hashes password, creates user, sends verification email |
| `POST` | `/verifyemail` | Confirms verification token, marks`isVerified: true`                      |
| `POST` | `/login`       | Verifies password &`isVerified`, returns JWT in `httpOnly` cookie       |
| `GET`  | `/logout`      | Clears cookie                                                               |
| `GET`  | `/me`          | Returns the user document for the cookie owner                              |
| `GET`  | `/userInfo`    | Lightweight session info used by`AuthContext`                             |

### Problems (`/api/problem`)

| Method     | Path                             | Purpose                                                          |
| ---------- | -------------------------------- | ---------------------------------------------------------------- |
| `POST`   | `/createProblem`               | Creates a problem (status`pending`) — used by Contribute flow |
| `GET`    | `/verifiedProblems`            | Public list of verified problems                                 |
| `GET`    | `/[problemName]`               | Single problem detail                                            |
| `GET`    | `/[problemName]/submission`    | Current user's submissions for this problem                      |
| `GET`    | `/[problemName]/allSubmission` | All users' submissions for this problem                          |
| `DELETE` | `/deleteProblem`               | (admin path; see admin section)                                  |

### Run / Submit

| Method   | Path                          | Purpose                                                                                                                  |
| -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `POST` | `/api/run`                  | Playground — executes`{ lang, code, input }` and returns stdout                                                       |
| `POST` | `/api/run/[problemName]`    | Runs user code against given inputs, returns per-input verdict (compares vs reference solution)                          |
| `POST` | `/api/submit/[problemName]` | Runs against every stored test case, persists a`ProblemSubmission`, returns Accepted/Wrong Answer + first failing case |

### Contribute (`/api/contribution`)

| Method  | Path  | Purpose                                                               |
| ------- | ----- | --------------------------------------------------------------------- |
| `GET` | `/` | Returns problems created by the current user (any verification state) |

### Moderator (`/api/moderator`) — gated by `isModerator`

| Method   | Path                               | Purpose                           |
| -------- | ---------------------------------- | --------------------------------- |
| `GET`  | `/pendingProblemVerification`    | Pending queue                     |
| `GET`  | `/problemVerified`               | Verified queue                    |
| `GET`  | `/problemRejected`               | Rejected queue                    |
| `GET`  | `/[problemName]`                 | Pending detail                    |
| `POST` | `/[problemName]/updateAndVerify` | Apply edits & flip to`verified` |
| `POST` | `/[problemName]/rejectProblem`   | Flip to`rejected`               |

### Admin (`/api/admin`) — gated by `isAdmin`

| Method     | Path                  | Purpose                             |
| ---------- | --------------------- | ----------------------------------- |
| `GET`    | `/users`            | List all users                      |
| `POST`   | `/users/role`       | Toggle`isAdmin` / `isModerator` |
| `POST`   | `/users/delete`     | Hard-delete user                    |
| `GET`    | `/problems`         | List all problems                   |
| `PATCH`  | `/problems/remove`  | Soft-delete (mark`deleted`)       |
| `GET`    | `/problems/trash`   | List soft-deleted problems          |
| `POST`   | `/problems/restore` | Restore from trash                  |
| `DELETE` | `/problems/delete`  | Hard-delete                         |

### Health

`GET /api/health` → `{ "message": "Everythings work perfect" }`

---

## Roles & Permissions

JWT payload carries `{ username, roles: { isAdmin, isModerator } }`. Helpers in `helpers/Authorization.ts` (`checkIfUserIsAdmin`, `checkIfUserIsModerator`, `getUserId`, `getUsername`) verify the token and gate routes/UI accordingly.

| Action                           | Guest | User | Moderator | Admin |
| -------------------------------- | :---: | :--: | :-------: | :---: |
| Browse problems list             |  ✅  |  ✅  |    ✅    |  ✅  |
| Read problem statement           |  ✅  |  ✅  |    ✅    |  ✅  |
| Run / Submit code                |  —  |  ✅  |    ✅    |  ✅  |
| Use playground                   |  ✅  |  ✅  |    ✅    |  ✅  |
| Contribute problem / testcase    |  —  |  ✅  |    ✅    |  ✅  |
| Verify / reject contributions    |  —  |  —  |    ✅    |  ✅  |
| Manage users (roles, delete)     |  —  |  —  |    —    |  ✅  |
| Manage problems (trash, restore) |  —  |  —  |    —    |  ✅  |

---

## Code Execution Flow

```
client                Next.js route handler             helpers/CodeExecution
  │   POST /api/run        │                                       │
  ├──────────────────────▶ │                                       │
  │ { lang, code, input }  │ generateFile(code, lang) ────────────▶│ writes <uuid>.<ext>
  │                        │ generateFile(input)        ──────────▶│ writes <uuid>.txt
  │                        │ executeCode(lang, file, in) ─────────▶│
  │                        │                                       │ ┌─ executeCpp:    g++ src -o out && ./out < in
  │                        │                                       │ ├─ executeJava:   javac → java < in
  │                        │                                       │ ├─ executePython: python src < in
  │                        │                                       │ └─ executeJS:     node src < in
  │                        │                                       │ unlink(out, input)
  │                        │ ◀───────────────────── stdout/stderr ─┤
  │ ◀─ json {output} ──────┤                                       │
```

For `/api/run/[problemName]` and `/api/submit/[problemName]`, the **reference solution** stored on the problem is also executed against each input; verdicts compare normalized stdout (trimmed trailing whitespace, blank lines dropped).

---

## Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **MongoDB** running locally (or a connection string to a hosted instance)
- For full code execution support, the host must have:
  - `g++` (C++)
  - JDK with `javac` and `java` (Java)
  - `python3` (Python)
  - `node` (JavaScript — already installed)
- An SMTP account if you want signup verification emails to actually send

### Local Setup (npm)

```bash
git clone https://github.com/RRITIK11/OJ-Project.git
cd OJ-Project
cp .env.sample .env       # then fill in values (see below)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available scripts:

| Command           | Action                   |
| ----------------- | ------------------------ |
| `npm run dev`   | Next.js dev server       |
| `npm run build` | Production build         |
| `npm run start` | Run the production build |
| `npm run lint`  | ESLint                   |

### Docker Setup

The repo ships a `Dockerfile` (Node 18 + g++ + JDK + python3) and a `docker-compose.yaml` that brings up the app and MongoDB together.

```bash
docker build -t online-judge .
docker compose up
```

The compose file maps the app to `localhost:3000` and Mongo to `localhost:27017`, and injects `MONGO_URL=mongodb://mongodb:27017` for the app container. Add the rest of your secrets via an env file or compose `environment:` block.

### Environment Variables

`.env.sample`:

```env
MONGO_URL =
TOKEN_SECRET =
DOMAIN =
MAIL_HOST =
MAIL_USER =
MAIL_PASS =
```

| Var                                           | Used for                                              |
| --------------------------------------------- | ----------------------------------------------------- |
| `MONGO_URL`                                 | Mongoose connection string                            |
| `TOKEN_SECRET`                              | JWT signing secret                                    |
| `DOMAIN`                                    | Base URL embedded in verification / reset email links |
| `MAIL_HOST` / `MAIL_USER` / `MAIL_PASS` | SMTP creds for Nodemailer (port 587, non-secure)      |

---

## Usage Walkthrough

1. **Sign up** at `/signup`. A verification link is emailed (link expires in 15 min; unverified accounts are auto-deleted after that window).
2. **Verify** via the link → you're logged in.
3. **Solve a problem**:
   - Visit `/problems`, pick one, write code in the right-side editor.
   - Hit **Run** to test against visible inputs (per-input verdict shown).
   - Hit **Submit** to evaluate against the full hidden test suite — verdict is persisted.
4. **Contribute** at `/contribute` → fill background, statement, reference solution, and test cases.
5. **(Moderator)** Open `/moderator/pending`, review the contribution, then **verify-and-update** or **reject**.
6. **(Admin)** Open `/admin/users` to grant roles, `/admin/problems` to manage the catalog.

---

## License

No license is currently declared. Contact the author before reusing.

## Author

Built by **[@RRITIK11](https://github.com/RRITIK11)** · live at **[algogalaxy.in](https://algogalaxy.in)](http://13.204.2.198:3000)**.
