import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Authentication
      "welcome": "Welcome to EduTutor",
      "signin_description": "Sign in to access your interactive learning platform",
      "username": "Username",
      "password": "Password",
      "signin": "Sign In",
      "signing_in": "Signing in...",
      "enter_username": "Enter your username",
      "enter_password": "Enter your password",
      
      // Role Selection
      "select_role": "Select Your Role",
      "role_description": "Choose how you'll be using the platform today",
      "im_tutor": "I'm a Tutor",
      "im_student": "I'm a Student",
      "tutor_description": "Teach students with interactive lessons and real-time notepad tools",
      "student_description": "Learn through interactive exercises and engaging lesson content",
      "continue_as_tutor": "Continue as Tutor",
      "continue_as_student": "Continue as Student",
      
      // Subject Selection
      "choose_subject": "Choose a Subject",
      "subject_description_tutor": "Select the subject you'd like to teach today",
      "subject_description_student": "Select the subject you'd like to learn today",
      "start_learning": "Start Learning",
      
      // Subjects
      "mathematics": "Mathematics",
      "math_description": "Algebra, Geometry, Calculus and more",
      "programming": "Computer Programming",
      "programming_description": "Learn coding fundamentals and advanced concepts", 
      "languages": "Language Learning",
      "languages_description": "Master new languages with interactive exercises",
      
      // Levels
      "select_level": "Select Level",
      "level_description": "Choose your skill level to get started with personalized content",
      "beginner": "Beginner",
      "intermediate": "Intermediate", 
      "advanced": "Advanced",
      "beginner_description": "Start with the fundamentals",
      "intermediate_description": "Build upon your knowledge",
      "advanced_description": "Master complex concepts",
      "chapters": "chapters",
      "estimated_time": "estimated time",
      "progress": "Progress",
      "start_level": "Start {{level}} Level",
      "easy": "Easy",
      "medium": "Medium",
      "hard": "Hard",
      
      // Chapters
      "select_chapter": "Select a chapter to begin your learning journey",
      "lessons": "lessons",
      "duration": "duration",
      "completed": "Completed",
      "available": "Available",
      "locked": "Locked",
      "start_chapter": "Start Chapter",
      "review_chapter": "Review Chapter",
      
      // Lesson Interface
      "tutor_notepad": "Tutor Notepad",
      "theory": "theory",
      "exercise": "exercise",
      "previous": "Previous",
      "next": "Next",
      "complete": "complete",
      "submit_answers": "Submit Answers",
      "examples": "Examples:",
      "questions": "Questions",
      "question": "Question",
      
      // Notepad
      "quick_notes": "Quick Notes:",
      "add_notes": "Add your notes here...",
      "size": "Size:",
      
      // Navigation
      "back": "Back",
      "home": "Home",
      "settings": "Settings",
      "logout": "Logout",
      
      // Math Content
      "basic_numbers": "Basic Numbers",
      "intro_numbers": "Introduction to Numbers",
      "counting_place_value": "Counting & Place Value",
      "practice_exercise": "Practice Exercise",
      "understanding_fractions": "Understanding Fractions",
      "fraction_exercises": "Fraction Exercises",
      "decimal_numbers": "Decimal Numbers",
      
      // Exercise Hints
      "hint": "Hint",
      "show_hint": "Show Hint",
      "close_hint": "Close Hint",
      "theory_help": "Theory Help",
    }
  },
  el: {
    translation: {
      // Authentication
      "welcome": "Καλώς ήρθατε στο EduTutor",
      "signin_description": "Συνδεθείτε για πρόσβαση στην διαδραστική πλατφόρμα μάθησης",
      "username": "Όνομα χρήστη",
      "password": "Κωδικός πρόσβασης", 
      "signin": "Σύνδεση",
      "signing_in": "Συνδέεται...",
      "enter_username": "Εισάγετε το όνομα χρήστη σας",
      "enter_password": "Εισάγετε τον κωδικό πρόσβασης σας",
      
      // Role Selection  
      "select_role": "Επιλέξτε τον Ρόλο σας",
      "role_description": "Επιλέξτε πως θα χρησιμοποιήσετε την πλατφόρμα σήμερα",
      "im_tutor": "Είμαι Καθηγητής",
      "im_student": "Είμαι Μαθητής",
      "tutor_description": "Διδάξτε μαθητές με διαδραστικά μαθήματα και εργαλεία σημειώσεων σε πραγματικό χρόνο",
      "student_description": "Μάθετε μέσω διαδραστικών ασκήσεων και ελκυστικού περιεχομένου μαθημάτων",
      "continue_as_tutor": "Συνέχεια ως Καθηγητής",
      "continue_as_student": "Συνέχεια ως Μαθητής",
      
      // Subject Selection
      "choose_subject": "Επιλέξτε Μάθημα",
      "subject_description_tutor": "Επιλέξτε το μάθημα που θέλετε να διδάξετε σήμερα",
      "subject_description_student": "Επιλέξτε το μάθημα που θέλετε να μάθετε σήμερα",
      "start_learning": "Ξεκινήστε τη Μάθηση",
      
      // Subjects
      "mathematics": "Μαθηματικά",
      "math_description": "Άλγεβρα, Γεωμετρία, Λογισμός και άλλα",
      "programming": "Προγραμματισμός Υπολογιστών",
      "programming_description": "Μάθετε τα βασικά του προγραμματισμού και προχωρημένες έννοιες",
      "languages": "Εκμάθηση Γλωσσών",
      "languages_description": "Κατακτήστε νέες γλώσσες με διαδραστικές ασκήσεις",
      
      // Levels
      "select_level": "Επιλογή Επιπέδου",
      "level_description": "Επιλέξτε το επίπεδο δεξιοτήτων σας για να ξεκινήσετε με εξατομικευμένο περιεχόμενο",
      "beginner": "Αρχάριος",
      "intermediate": "Μεσαίος",
      "advanced": "Προχωρημένος",
      "beginner_description": "Ξεκινήστε με τα βασικά",
      "intermediate_description": "Χτίστε πάνω στις γνώσεις σας",
      "advanced_description": "Κατακτήστε πολύπλοκες έννοιες",
      "chapters": "κεφάλαια",
      "estimated_time": "εκτιμώμενος χρόνος",
      "progress": "Πρόοδος",
      "start_level": "Ξεκινήστε {{level}} Επίπεδο",
      "easy": "Εύκολο",
      "medium": "Μεσαίο",
      "hard": "Δύσκολο",
      
      // Chapters
      "select_chapter": "Επιλέξτε ένα κεφάλαιο για να ξεκινήσετε το ταξίδι μάθησης",
      "lessons": "μαθήματα",
      "duration": "διάρκεια",
      "completed": "Ολοκληρωμένο",
      "available": "Διαθέσιμο",
      "locked": "Κλειδωμένο",
      "start_chapter": "Ξεκινήστε Κεφάλαιο",
      "review_chapter": "Επανεξέταση Κεφαλαίου",
      
      // Lesson Interface
      "tutor_notepad": "Σημειωματάριο Καθηγητή",
      "theory": "θεωρία",
      "exercise": "άσκηση",
      "previous": "Προηγούμενο",
      "next": "Επόμενο",
      "complete": "ολοκληρωμένο",
      "submit_answers": "Υποβολή Απαντήσεων",
      "examples": "Παραδείγματα:",
      "questions": "Ερωτήσεις",
      "question": "Ερώτηση",
      
      // Notepad
      "quick_notes": "Γρήγορες Σημειώσεις:",
      "add_notes": "Προσθέστε τις σημειώσεις σας εδώ...",
      "size": "Μέγεθος:",
      
      // Navigation
      "back": "Πίσω",
      "home": "Αρχική",
      "settings": "Ρυθμίσεις",
      "logout": "Αποσύνδεση",
      
      // Math Content
      "basic_numbers": "Βασικοί Αριθμοί",
      "intro_numbers": "Εισαγωγή στους Αριθμούς",
      "counting_place_value": "Μέτρηση & Αξία Θέσης",
      "practice_exercise": "Άσκηση Εξάσκησης",
      "understanding_fractions": "Κατανόηση Κλασμάτων",
      "fraction_exercises": "Ασκήσεις Κλασμάτων",
      "decimal_numbers": "Δεκαδικοί Αριθμοί",
      
      // Exercise Hints
      "hint": "Υπόδειξη",
      "show_hint": "Εμφάνιση Υπόδειξης",
      "close_hint": "Κλείσιμο Υπόδειξης",
      "theory_help": "Βοήθεια Θεωρίας",
    }
  },
  de: {
    translation: {
      // Authentication
      "welcome": "Willkommen bei EduTutor",
      "signin_description": "Melden Sie sich an, um auf Ihre interaktive Lernplattform zuzugreifen",
      "username": "Benutzername",
      "password": "Passwort",
      "signin": "Anmelden",
      "signing_in": "Anmeldung läuft...",
      "enter_username": "Geben Sie Ihren Benutzernamen ein",
      "enter_password": "Geben Sie Ihr Passwort ein",
      
      // Role Selection
      "select_role": "Wählen Sie Ihre Rolle",
      "role_description": "Wählen Sie aus, wie Sie die Plattform heute nutzen möchten",
      "im_tutor": "Ich bin ein Tutor",
      "im_student": "Ich bin ein Student", 
      "tutor_description": "Unterrichten Sie Studenten mit interaktiven Lektionen und Echtzeit-Notiztools",
      "student_description": "Lernen Sie durch interaktive Übungen und ansprechende Lerninhalte",
      "continue_as_tutor": "Als Tutor fortfahren",
      "continue_as_student": "Als Student fortfahren",
      
      // Subject Selection
      "choose_subject": "Wählen Sie ein Fach",
      "subject_description_tutor": "Wählen Sie das Fach aus, das Sie heute unterrichten möchten",
      "subject_description_student": "Wählen Sie das Fach aus, das Sie heute lernen möchten",
      "start_learning": "Lernen beginnen",
      
      // Subjects
      "mathematics": "Mathematik",
      "math_description": "Algebra, Geometrie, Analysis und mehr",
      "programming": "Computerprogrammierung", 
      "programming_description": "Lernen Sie Programmiergrundlagen und fortgeschrittene Konzepte",
      "languages": "Sprachenlernen",
      "languages_description": "Meistern Sie neue Sprachen mit interaktiven Übungen",
      
      // Levels
      "select_level": "Level auswählen",
      "level_description": "Wählen Sie Ihr Kompetenzniveau, um mit personalisierten Inhalten zu beginnen",
      "beginner": "Anfänger",
      "intermediate": "Fortgeschrittener",
      "advanced": "Experte",
      "beginner_description": "Beginnen Sie mit den Grundlagen",
      "intermediate_description": "Bauen Sie auf Ihrem Wissen auf",
      "advanced_description": "Meistern Sie komplexe Konzepte",
      "chapters": "Kapitel",
      "estimated_time": "geschätzte Zeit",
      "progress": "Fortschritt",
      "start_level": "{{level}} Level starten",
      "easy": "Einfach",
      "medium": "Mittel",
      "hard": "Schwer",
      
      // Chapters
      "select_chapter": "Wählen Sie ein Kapitel, um Ihre Lernreise zu beginnen",
      "lessons": "Lektionen",
      "duration": "Dauer",
      "completed": "Abgeschlossen",
      "available": "Verfügbar",
      "locked": "Gesperrt",
      "start_chapter": "Kapitel starten",
      "review_chapter": "Kapitel wiederholen",
      
      // Lesson Interface
      "tutor_notepad": "Tutor-Notizblock",
      "theory": "Theorie",
      "exercise": "Übung",
      "previous": "Zurück",
      "next": "Weiter",
      "complete": "abgeschlossen",
      "submit_answers": "Antworten einreichen",
      "examples": "Beispiele:",
      "questions": "Fragen",
      "question": "Frage",
      
      // Notepad
      "quick_notes": "Schnelle Notizen:",
      "add_notes": "Fügen Sie hier Ihre Notizen hinzu...",
      "size": "Größe:",
      
      // Navigation
      "back": "Zurück",
      "home": "Startseite",
      "settings": "Einstellungen",
      "logout": "Abmelden",
      
      // Math Content
      "basic_numbers": "Grundzahlen",
      "intro_numbers": "Einführung in Zahlen",
      "counting_place_value": "Zählen & Stellenwert",
      "practice_exercise": "Übungsaufgabe",
      "understanding_fractions": "Brüche verstehen",
      "fraction_exercises": "Bruchübungen",
      "decimal_numbers": "Dezimalzahlen",
      
      // Exercise Hints
      "hint": "Hinweis",
      "show_hint": "Hinweis anzeigen",
      "close_hint": "Hinweis schließen",
      "theory_help": "Theoriehilfe",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // default language
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;