```mermaid
sequenceDiagram
    participant Browser
    participant Server

    note right of Browser: event handler in spa.js submits the form instead of the site posting it

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Server-->>Browser: 201 Created
    deactivate Server

    note right of Browser: same spa.js renders the notes again with the addition of the new notes
```