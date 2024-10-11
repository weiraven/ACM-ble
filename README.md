# **ACM Event Management App**

This app is an event management and meet-up platform designed for the **UNC Charlotte Student Chapter of ACM**. It allows users to create, edit, and manage events, upload event-related images, and display event details on a user-friendly interface.

## **Features**
- **Create and manage events**
- **Form validation for event details**
- **Upload event-related images**
- **Edit and delete existing events**
- **View detailed event information**
- **Categorize events by type (Meetings, Workshops, Tech Talks, Panels)**

## **Prerequisites**
- **Node.js (v14.x or higher)**
- **NPM**

## **Installation**

1. **Clone the repository:** 
```
git clone https://github.com/weiraven/ACM-meet-up.git
```

2. **Navigate to project directory**
```
cd project
```

3. **Install dependencies**
```
npm install
```

4. **Start the application**
```
npm start
```
or if using nodemon for live-loading during development:
```
nodemon app
```

5. **Open in your browser**
```
http://localhost:3000
```

## File Structure
```
  ├── public/              # Static files (CSS, JS, images)
  ├── views/               # EJS templates
  ├── routes/              # Express routes
  ├── controllers/         # Application logic
  ├── models/              # Data models
  ├── middleware/          # Custom middleware (file upload, etc.)
  ├── app.js               # Main application file
  ├── package.json         # npm dependencies and scripts
  └── README.md            # Project documentation
```

## Feedback
Feel free to submit issues or pull requests if you find any bugs or want to suggest features!


