<img src="/client/public/full-logo-bg.png" />

# BharatKatha  
**Preserve. Listen. Share. — Stories of India, Reimagined.**  

BharatKatha is a platform dedicated to archiving India’s folk literature, mythological tales, urban legends & culturally rooted stories in a **modern digital format**.  
Users can **write stories, generate text-to-speech audio, explore via multilingual filters, search with fuzzy matching, and experience an entire story world organized by language, regions & culture**.

Whether you are a student discovering heritage, a creator building narrative content, or someone wanting to preserve oral traditions — BharatKatha makes storytelling **accessible, searchable & heard.**

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [User Experience](#user-experience)

---

## Features

### Story Creation & Management
- Full **CRUD** support for stories  
- Each story contains:  
  - Title & description  
  - Transcript/body text  
  - Story image (Cloudinary upload)  
  - Generated **audio narration (TTS)**  
  - Associated **Language / Region / Category**  
  - Trackable **views & duration**  
- Users can manage their own stories anytime

---

### Text-to-Speech Audio Narration
- Stories become **audio podcasts instantly**
- Uses `@andresaya/edge-tts` for multilingual generation  
- Audio stored securely in Cloudinary  
- Supports **10 major Indian languages**  
- Two voice types per language (Male/Female)

---

### Fuzzy Search + Filters
- Search by **Story title** or **Author name**  
- Built with PostgreSQL `pg_trgm` + **GIN indices** for fast similarity querying  
- Combined filtering support:
  - Filter by **Language**
  - Filter by **Region**
  - Filter by **Category**
- Search + filters work together seamlessly

---

### Interactive Filtering using India Map
- **Hover or click on states/UTs** to filter stories by region  
- Implemented using **react-simple-maps**  
- Creates an intuitive & culturally immersive browsing experience  

---

### User Profiles & Auth System
- JWT + HTTP-only cookies for secure authentication  
- Email OTP verification using expiry-based system  
- Forgot-password & reset features included  
- Users can:  
  - View profile pages of authors  
  - Edit their own profile  
  - Delete their profile completely  

---

### Favorites System
- Mark any story as **favorite**  
- Favorite list accessible anytime  
- Unfavorite with a single click  

---

## Tech Stack

### **Frontend**
| Tech | Why it's used |
|---|---|
| **React + TypeScript** | Scalable component-driven interface |
| **TailwindCSS** | Utility styling for fast UI development |
| **Shadcn-UI** | Beautiful prebuilt components with Tailwind styling |
| **react-redux** | Global app state |
| **react-simple-maps** | Interactive clickable India Map for region filtering |
| **zod** | Input validation for forms & payload safety |

---

### **Backend**
| Tech | Purpose |
|---|---|
| **Node.js + Express.js + TS** | API server + modular routing |
| **PostgreSQL** | Core relational DB for structured data |
| **Prisma ORM** | Schema, migrations & type-safe queries |
| **pg_trgm + GIN Index** | High-performance fuzzy search on title/author |
| **ILIKE text search** | Supplementary full text matching |
| **Cloudinary + express-fileupload** | Image + audio file storage + CDN delivery |
| **@andresaya/edge-tts** | Multilingual Text-to-Speech audio generation |
| **bcryptjs** | Password hashing |
| **JWT + Cookies** | Auth workflow (login, tokens, protected routes) |
| **node-cron** | Periodic cleanup of expired OTP entries |
| **zod** | Request validation and schema enforcement |

---

## How It Works

1. **User signs up & verifies email via OTP**
2. **User creates a story** → uploads image → inputs transcript  
3. Story is **converted to audio using TTS**  
4. Audio & image stored in Cloudinary  
5. Story becomes visible to all users  
6. Visitors can:
   - Search stories
   - Filter by region/language/category
   - Open story → read → listen
   - Favorite stories  

---

## User Experience

### Home Page
<img src="/client/public/home-page.png" />

### Discover Page
<img src="/client/public/discover-page.png" />
<img src="/client/public/discover-page-filters.png" />

### Profile Page
<img src="/client/public/profile-page.png" />

### Story Page
<img src="/client/public/story-page.png" />

### Favorites Page
<img src="/client/public/favorites-page.png" />

### Signup Page
<img src="/client/public/signup-page.png" />
