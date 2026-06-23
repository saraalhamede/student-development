# Student Development 
 Student Development is a simple REact mid-project for an education center. It ihas seprate student and teacher dashboards, course pages, learning materails, assignments, announcement,and local teacher forms.

 The project intentionally uses a small and easy stack:
 - React + Vite
 - React Router
 - Tailwind CSS
 - Local mock data
 - `localStorage` for fake login and teacher-created content

# Project Structure

student-development/
  src/
    components/
      Sidebar.jsx
      Header.jsx
      CourseCard.jsx
      MaterialCard.jsx
      AssignmentCard.jsx
      AnnouncementCard.jsx
      SearchBar.jsx
      ProtectedRoute.jsx

    pages/
      Login.jsx
      Register.jsx
      StudentDashboard.jsx
      TeacherDashboard.jsx
      Courses.jsx
      CourseDetails.jsx
      Materials.jsx
      Assignments.jsx
      Settings.jsx

    data/
      mockData.js

    App.jsx
    main.jsx
    index.css

  index.html
  package.json
  tailwind.config.js
  postcss.config.js
  vite.config.js
  eslint.config.js
  README.md

# Run The Project

    Open a terminal inside the project folder:

    ```bash
    npm run lint
    npm run build
    npm run preview
    ```
    
# Steps
    Step 1: 
    creating The Vite Project by bash: 

    ```bash
    npm create vite@latest student-development -- --template react
    cd student-development
    npm install
    ```


    Step 2: 
    Install React Router and Tailwind CSS by bash:

    ```bash
    npm install react-router-dom
    npm install -D tailwindcss postcss autoprefixer
    ```

    Steps 3:
    creating the mockData.js file (the project Data) to helping us to know how the project going to be.
    arrays we export 
    - users
    - courses
    - materials
    - assignments
    - announcements

    steps 4: componemts building 
    - `SearchBar.jsx`
    - `CourseCard.jsx`
    - `MaterialCard.jsx`
    - `AssignmentCard.jsx`
    - `AnnouncementCard.jsx`
    - `ProtectedRoute.jsx`
    - `Sidebar.jsx`
    - `Header.jsx`

    ## Component Responsibilities

        - Sidebar.jsx

            Displays navigation links and the logout button.

        - Header.jsx

            Displays the top search field and current user information.

        - SearchBar.jsx

            A controlled input that receives `value` and `onChange` props.

        - CourseCard.jsx

            Displays course title, teacher, description, material count, and progress. Clicking it opens the course details route.

        - MaterialCard.jsx

            Displays material type, title, course, date, and an Open button.

        - AssignmentCard.jsx

            Displays the deadline, title, course, and time.

        - AnnouncementCard.jsx

            Displays an announcement title, message, and relative date.

        - ProtectedRoute.jsx

            Prevents logged-out users from opening dashboard pages.

    step 5: Creating the authentication pages
        - Login page
        - Register page

    step 6: Create StudentDashboard.jsx
    
        The student dashboard receives its data from `App.jsx` and displays:
        - Welcome message
        - Search bar
        - Course cards
        - Recent materials
        - Announcements
        - Upcoming assignments
    
    Step 7: Create TeacherDashboard.jsx

        The teacher dashboard displays:
        - Welcome message
        - Add Course form
        - Upload Material form
        - Course list
        - Recent uploads

    Step 8: Create The Remaining Pages

        Create these pages next:
        - `Courses.jsx`
        - `CourseDetails.jsx`
        - `Materials.jsx`
        - `Assignments.jsx`
        - `Settings.jsx`

        `CourseDetails.jsx` reads the route parameter using `useParams()`:

        ```jsx
        const { id } = useParams();
        ```
        It then finds the matching course and filters materials, assignments, and announcements by `courseId`.

    Step 9: Connect Everything In App.jsx

        After components and pages exist, connect them in `App.jsx`.

        Important responsibilities:
        1. Read saved values from `localStorage`.
        2. Create React state for the user, courses, materials, and search.
        3. Save courses and materials when state changes.
        4. Create login and logout functions.
        5. Create add-course and add-material functions.
        6. Create the shared dashboard layout.
        7. Add all React Router routes.
        8. Protect private pages with `ProtectedRoute`.
        9. Redirect users to the correct dashboard based on role.
    
    Step 10: Render App From main.jsx

        Finally, import `App.jsx` into `main.jsx` and wrap it with `BrowserRouter`.



            

    





