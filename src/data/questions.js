
const questions = {
  "Web Development": [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Mark Language",
        "Home Tool Markup Language"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which language is mainly used for styling web pages?",
      options: ["HTML", "CSS", "JavaScript", "Python"],
      answer: "CSS"
    },
    {
      question: "Which language is used to make web pages interactive?",
      options: ["CSS", "HTML", "JavaScript", "SQL"],
      answer: "JavaScript"
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font-color", "text-color", "color", "text-style"],
      answer: "color"
    },
    {
      question: "Which symbol is used for an ID selector in CSS?",
      options: [".", "#", "*", "&"],
      answer: "#"
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<image>", "<img>", "<picture>", "<src>"],
      answer: "<img>"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which HTML element is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      answer: "<h1>"
    },
    {
      question: "Which protocol is commonly used to access web pages?",
      options: ["FTP", "HTTP", "SMTP", "SSH"],
      answer: "HTTP"
    }
  ],

  Python: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def"
    },
    {
      question: "Which of these is a Python list?",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
      answer: "[1, 2, 3]"
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "/*", "#", "--"],
      answer: "#"
    },
    {
      question: "Which function is used to display output in Python?",
      options: ["display()", "print()", "show()", "output()"],
      answer: "print()"
    },
    {
      question: "Which data type stores True or False?",
      options: ["String", "Integer", "Boolean", "Float"],
      answer: "Boolean"
    },
    {
      question: "Which keyword is used to create a class?",
      options: ["object", "class", "struct", "create"],
      answer: "class"
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "//", "%%"],
      answer: "**"
    },
    {
      question: "Which function returns the length of an object?",
      options: ["size()", "length()", "len()", "count()"],
      answer: "len()"
    },
    {
      question: "Which collection stores key-value pairs?",
      options: ["List", "Tuple", "Dictionary", "Set"],
      answer: "Dictionary"
    },
    {
      question: "Python files usually have which extension?",
      options: [".java", ".py", ".python", ".pt"],
      answer: ".py"
    }
  ],

  Java: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "Class", "new", "object"],
      answer: "class"
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "main()", "run()", "execute()"],
      answer: "main()"
    },
    {
      question: "Which keyword is used to inherit a class?",
      options: ["inherits", "extends", "implements", "super"],
      answer: "extends"
    },
    {
      question: "Which keyword creates an object?",
      options: ["create", "object", "new", "make"],
      answer: "new"
    },
    {
      question: "Java is mainly known as which type of language?",
      options: [
        "Object-oriented",
        "Markup",
        "Query",
        "Assembly"
      ],
      answer: "Object-oriented"
    },
    {
      question: "Which keyword prevents a class from being inherited?",
      options: ["static", "private", "final", "constant"],
      answer: "final"
    },
    {
      question: "Which package contains Scanner?",
      options: [
        "java.io",
        "java.util",
        "java.lang",
        "java.net"
      ],
      answer: "java.util"
    },
    {
      question: "Which keyword is used to implement an interface?",
      options: ["extends", "implements", "interface", "inherit"],
      answer: "implements"
    },
    {
      question: "Which data type stores whole numbers?",
      options: ["float", "char", "int", "boolean"],
      answer: "int"
    },
    {
      question: "What is the extension of a Java source file?",
      options: [".class", ".java", ".jav", ".j"],
      answer: ".java"
    }
  ],

  SQL: [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Sequential Query Language",
        "System Query Language"
      ],
      answer: "Structured Query Language"
    },
    {
      question: "Which command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT"
    },
    {
      question: "Which command is used to add a new record?",
      options: ["ADD", "INSERT", "CREATE", "UPDATE"],
      answer: "INSERT"
    },
    {
      question: "Which command modifies existing data?",
      options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"],
      answer: "UPDATE"
    },
    {
      question: "Which command removes records from a table?",
      options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
      answer: "DELETE"
    },
    {
      question: "Which clause is used to filter records?",
      options: ["FILTER", "WHERE", "SELECT", "HAVING"],
      answer: "WHERE"
    },
    {
      question: "Which keyword sorts query results?",
      options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
      answer: "ORDER BY"
    },
    {
      question: "Which function counts rows?",
      options: ["TOTAL()", "COUNT()", "NUMBER()", "ROWS()"],
      answer: "COUNT()"
    },
    {
      question: "Which key uniquely identifies each record?",
      options: ["Foreign Key", "Primary Key", "Unique Row", "Main Key"],
      answer: "Primary Key"
    },
    {
      question: "Which command creates a new table?",
      options: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", "ADD TABLE"],
      answer: "CREATE TABLE"
    }
  ],

  "React JS": [
    {
      question: "React is mainly used for building what?",
      options: [
        "Databases",
        "User Interfaces",
        "Operating Systems",
        "Networks"
      ],
      answer: "User Interfaces"
    },
    {
      question: "Which hook is used to manage state?",
      options: ["useData", "useState", "useValue", "useStore"],
      answer: "useState"
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useEffect", "useSide", "useAction", "useEvent"],
      answer: "useEffect"
    },
    {
      question: "What syntax is commonly used to write HTML-like elements in React?",
      options: ["XML", "JSX", "XHTML", "TSX only"],
      answer: "JSX"
    },
    {
      question: "Which function is used to create a React component?",
      options: [
        "Components must always use a special keyword",
        "A JavaScript function",
        "createComponent() only",
        "reactComponent()"
      ],
      answer: "A JavaScript function"
    },
    {
      question: "Props are mainly used to do what?",
      options: [
        "Store databases",
        "Pass data between components",
        "Create CSS",
        "Start a server"
      ],
      answer: "Pass data between components"
    },
    {
      question: "Which command creates a React project using Vite?",
      options: [
        "npm create vite",
        "npm react start",
        "react create vite",
        "vite new react"
      ],
      answer: "npm create vite"
    },
    {
      question: "What is used to uniquely identify list elements in React?",
      options: ["id", "key", "indexOnly", "unique"],
      answer: "key"
    },
    {
      question: "Which file commonly renders the root React component in Vite?",
      options: ["main.jsx", "server.jsx", "root.html", "index.css"],
      answer: "main.jsx"
    },
    {
      question: "React uses which concept to efficiently update the UI?",
      options: [
        "Virtual DOM",
        "SQL",
        "JVM",
        "File System"
      ],
      answer: "Virtual DOM"
    }
  ],

  "Artificial Intelligence": [
    {
      question: "What does AI stand for?",
      options: [
        "Automated Internet",
        "Artificial Intelligence",
        "Advanced Integration",
        "Artificial Information"
      ],
      answer: "Artificial Intelligence"
    },
    {
      question: "Which technology allows computers to learn from data?",
      options: [
        "Machine Learning",
        "HTML",
        "Networking",
        "Encryption"
      ],
      answer: "Machine Learning"
    },
    {
      question: "Which is an example of supervised learning?",
      options: [
        "Classification",
        "Random guessing",
        "Manual sorting",
        "File compression"
      ],
      answer: "Classification"
    },
    {
      question: "What does ML stand for?",
      options: [
        "Machine Learning",
        "Model Logic",
        "Machine Language",
        "Memory Learning"
      ],
      answer: "Machine Learning"
    },
    {
      question: "Which type of neural network is commonly used for image processing?",
      options: ["CNN", "RNN", "GAN only", "DNS"],
      answer: "CNN"
    },
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Language Processing",
        "Network Language Protocol",
        "Natural Logic Programming",
        "Neural Language Process"
      ],
      answer: "Natural Language Processing"
    },
    {
      question: "Which algorithm is commonly used for classification?",
      options: [
        "Decision Tree",
        "HTML",
        "CSS",
        "FTP"
      ],
      answer: "Decision Tree"
    },
    {
      question: "What is training data?",
      options: [
        "Data used to train a model",
        "Only deleted data",
        "Computer hardware",
        "A programming language"
      ],
      answer: "Data used to train a model"
    },
    {
      question: "Which technology is used to generate human-like text?",
      options: [
        "Large Language Models",
        "CSS",
        "SQL",
        "BIOS"
      ],
      answer: "Large Language Models"
    },
    {
      question: "What is a model in machine learning?",
      options: [
        "A learned representation used to make predictions",
        "A database table",
        "A web browser",
        "A computer cable"
      ],
      answer: "A learned representation used to make predictions"
    }
  ]
};

export default questions;