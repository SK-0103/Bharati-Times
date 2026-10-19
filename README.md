📰 Bharati Times: A Modern News Portal

A responsive, full-stack news portal built with React, Tailwind CSS, and Strapi (headless CMS) with MySQL. It replaces a legacy WordPress setup with a faster, more flexible and easier-to-maintain architecture, and lets editors publish news without developer involvement.

Built as my MCA dissertation project at Bharati Vidyapeeth's Institute of Computer Applications & Management (BVICAM), New Delhi (GGSIPU), Jan to May 2025.

<img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/352541d7-6791-4f42-b465-f0e28e9b93dc" /> <img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/58655741-6bb2-4de6-989a-842c7781b536" /> 
<img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/dc6d9dd8-feca-4977-bb80-bc55b6d2e3e0" /> <img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/7b53f70d-7cc2-4c72-bcdd-0d9d8afa2dca" /> <img width="300" height="150" alt="image" src="https://github.com/user-attachments/assets/8331fc54-b3f3-46d3-bd54-468dea39a476" />

----------------------------------------------------------------------
🎯 Problem & Solution

The existing Bharati Times site, built on WordPress with a traditional SQL backend, struggled with:

Difficulty customizing layouts and adding new features
Poor scalability as content and traffic grew
An inflexible backend that was hard to maintain

Solution: a custom stack with a React frontend, Node.js/Strapi backend and MySQL database, giving editors a simple admin panel and readers a faster, mobile-friendly experience.

----------------------------------------------------------------------
✨ Features

For readers

📂 Category-wise news: National, International, Technology, Business, Education, Lifestyle, Entertainment, Sports and more
🚨 Breaking news ticker and top-stories section
🔍 Keyword search and category filtering
📖 Flipbook-style archive viewer for current and past newspaper editions
🌐 Bilingual content support (English and Hindi fields)
📬 Contact form with validation and a simple captcha
🔐 Sign in / Sign up UI (reader accounts are disabled in the current phase)
📱 Fully responsive across mobile, tablet and desktop

For admins and editors (via Strapi)

✍️ Create, edit and publish articles with rich text and images
🗂️ Manage archive volumes
📥 View and respond to contact form submissions
🔑 Secure admin login and role-based access

----------------------------------------------------------------------
🛠️ Tech Stack

Frontend: 	React 18.3.1, Tailwind CSS 4.0
Backend / CMS:	Node.js, Strapi 5.11.3 (headless CMS, REST APIs)
Database:	MySQL
Tools:	Git, GitHub, VS Code, Postman
Methodology:	Agile 

----------------------------------------------------------------------
🏗️ Architecture

DATA FLOW DIAGRAM (LVL 0):

<img width="1252" height="236" alt="image" src="https://github.com/user-attachments/assets/b1ac5757-1318-4a38-bf18-9d1510b8ece0" />

----------------------------------------------------------------------

DATA FLOW DIAGRAM (LVL 1):

<img width="1028" height="658" alt="image" src="https://github.com/user-attachments/assets/38f70f5b-1c70-46bb-9e93-bc821e17eaa4" />

----------------------------------------------------------------------

USE CASE DIAGRAM:

<img width="950" height="652" alt="image" src="https://github.com/user-attachments/assets/ebc139da-5d1c-4c61-a7d1-b8584e5f25d4" />

----------------------------------------------------------------------

ACTIVITY DIAGRAM: 

<img width="876" height="660" alt="image" src="https://github.com/user-attachments/assets/1a972974-cb49-4f32-bf99-a66f5b881139" />

----------------------------------------------------------------------

ENTITY RELATIONSHIP (ER) DIAGRAM: 

<img width="1002" height="651" alt="image" src="https://github.com/user-attachments/assets/1033b153-016a-4822-9e3c-ab370eab7dca" />


----------------------------------------------------------------------
🚀 Getting Started

Prerequisites
   - Node.js (LTS) and npm
   - MySQL server running locally

1. Clone the repository
```
  git clone https://github.com/SK-0103/<your-repo-name>.git
  cd <your-repo-name>
```
2. Set up the backend (Strapi)
  ``` 
   cd backend
   npm install
 ```

   Create a .env file and set your database details:
  ``` 
   DATABASE_CLIENT=mysql
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=3306
   DATABASE_NAME=bharati_times
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
  ```
  Start Strapi:
  ```
  npm run develop
```
  The admin panel will be available at http://localhost:1337/admin

3. Set up the frontend (React)
   ```
   cd frontend
   npm install
   npm run dev     # or npm start, depending on your setup
   ```
   
----------------------------------------------------------------------   
🧪 Testing

Manual unit and functional testing covered:

- Admin login (valid and invalid credentials)
- Article submission and validation
- Article viewing, keyword search and category filters
- Archive flipbook loading and invalid-date handling
- Contact form validation (missing and invalid email)
- Responsive layout on mobile, tablet and resized browser windows

----------------------------------------------------------------------   
⚠️ Current Limitations

- Reader registration and personalization are not yet active
- No commenting or social engagement features
- The flipbook archive depends on PDF generation and third-party viewer tooling

----------------------------------------------------------------------   
🔮 Future Scope

- User accounts, bookmarks and personalized feeds
- Android/iOS app (React Native or Flutter)
- Push notifications for breaking news
- Comments and reactions
- SEO improvements: structured metadata, Open Graph tags, sitemap


----------------------------------------------------------------------   
👨‍💻 Author

Shaunit Kataria MCA Graduate (BVICAM, 2025) | Full-Stack Developer (MERN)

📧 shaunitkataria@gmail.com 
