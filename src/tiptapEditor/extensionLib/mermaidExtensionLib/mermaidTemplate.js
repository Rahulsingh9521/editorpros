export const mermaidTemplates = [
  {
    name: "Flowchart (TD)",
    code: `flowchart TD
        A[Start] --> B{Is it?}
        B -- Yes --> C[OK]
        B -- No --> D[Not OK]
        C --> E[End]
        D --> E[End]
        `,
  },
  {
    name: "Flowchart (LR)",
    code: `flowchart LR
        A[Start] --> B{Is it?}
        B -- Yes --> C[OK]
        B -- No --> D[Not OK]
        C --> E[End]
        D --> E[End]`,
  },
  {
    name: "Sequence Diagram",
    code: `sequenceDiagram
        participant Alice
        participant Bob
        Alice->>John: Hello John, do you want to go to the pub?
        John-->>Alice: Yes!
        Amit-->John: How about a game of pool?
        John-->>Amit: Sure!
        John->>Bob: Do you want to join us?
        Bob-->>John: No, I need to work.
        John-->>Alice: No, I need to work.  
        `,
  },
  {
    name: "Gantt Chart",
    code: `gantt
        title A Gantt Diagram
        dateFormat  YYYY-MM-DD
        section Section
        A task           :a1, 2014-01-01  , 30d
        Another task     :after a1  , 12d
        section Section
        Task in sec      :2014-01-12  , 12d
        anther task      :24d`,
  },
  {
    name: "Class Diagram",
    code: `classDiagram 
        class Animal {
            +String name
            +int age
            +String species
            +String sound()
        }
        class Dog {
            +String breed
            +String bark()
        }
        class Cat {
            +String breed
            +String meow()
        }
        class Bird {
            +String species
            +String chirp()
        }
        Animal <|-- Dog
        Animal <|-- Cat
        Animal <|-- Bird`,
  },
  {
    name: "State Diagram",
    code: `stateDiagram-v2
        [*] --> Idle
        Idle --> Processing : Start
        Processing --> Success : Complete
        Processing --> Failure : Error
        Success --> [*]
        Failure --> [*]
        Idle --> [*]
        Processing --> [*]
        `,
  },
  {
    name: "Entity Relationship",
    code: `erDiagram
        CUSTOMER ||--o { ORDER : places
        ORDER ||--|{ LINE_ITEM : contains
        CUSTOMER {
            string name
            string address
            string email
            string phone
        }
        ORDER {
            int orderNumber
            date orderDate
            string status
        }
        LINE_ITEM {
            int quantity
            float price
        }
        `,
  },
  {
    name: "Pie Chart",
    code: `pie title Project Resources
        "Development" : 45
        "Marketing" : 25
        "Sales" : 15
        "Support" : 10
        "HR" : 5
        `,
  },
  {
    name: "Git Graph",
    code: `gitGraph
        commit
        branch develop
        checkout develop
        commit
        commit
        chekout master
        merge develop
        commit
        branch feature
        checkout feature
        commit
        commit
        merge feature
        checkout main`,
  },
];
