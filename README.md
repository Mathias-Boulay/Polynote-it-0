# Technical Architecture Document
## Web Oriented Application - POLYNOTES (V0)

  
  
 History of versions: 
| Version Number | Changelog | Author | 
|--|--|--|
| 1.0 | Initial Release | Mathias Boulay |











  

  

  

  

  

  

  

![](https://lh5.googleusercontent.com/OlLj-WYT7K1JG5DzDzp25zYeSmu71sJOh8c4Krai01m-4XDaj6pWsVBFibK01NOBvzwtgM3sOoMqPo4pU3ACo0LL8beYDNNpf6Vyh4N1lYss44SuItR1SON7S_RzN5XebQryc6TBBXuWOZsWUQj5MAk)



# I - Introduction

 
This TAD will be equally divided into 3 parts: Introduction of the objectives, the technology choices and a post mortem of this first iteration.

  

### 1.1 - Objectives

Polynotes is a note taking web application, with the ability of editing the same document from any device.  
For this first iteration, the scope of both frontend and backend were fairly simplified.  
The backend required:

-   A CRUD for the editable documents , accompanied with a “share anonymously” feature.
    
-   In place authentication, along with an email verification system.
    

  

The frontend required:

-   A file explorer to navigate
    
-   The document editor with blocks. This is the main part of the first iteration.
    

  

Note: Full details available [here](https://mattermost.polytech.umontpellier.fr/api/v4/files/5ketog3xiig3j8ad6ugg4ksoie?download=1)

# II - Technical choices

  

## 2.1 - Frontend

  

As per the full specification of this iteration, the major constraint was to use React. Therefore, only the rest of the tech stack will be discussed here.  
  

### 2.1.1 - State management  
Regarding State Management, the only data that had to be stored inside the LocalStorage was account related data, which was a single flat object that was always entirely erased upon a new login.  
I ended up using *Recoil* to benefit from a simple API similar to React *useState()*, instead of more convoluted options like *Redux* which forces the use of reducers, even for the simplest of cases.

This may prove difficult to scale more complex data to be stored and modified, as reducers are not a native part of the library. It can be mitigated with React usual reducers.

  

### 2.1.2 - Component library

To help build the whole layout, the *Ant Design* Component library was used. It featured the necessary layouts and components for this project, and the documentation was full of ready to tinker examples.  
  

### 2.1.3 - Editor

As for the Editor, the library *TipTap* was used (wrapper for *ProseMirror*). It featured a block system that was similar to the idea of the full specifications, a lot of extendable pre-made plugins, a powerful customizable schema system (plugins are based upon it) and solid documentation accompanied by examples.

  
To exploit the library, the approach taken to use only one instance of the TipTap editor, feeding it a custom schema that would fit the both draggable blocks and multi columns, with extensions to add support for commands and new blocks from scratch.  
This approach has the major downside of making the schema harder and harder to maintain when new blocks and groups (category of blocks) are introduced.

  
  
  

## 2.2 - Back end
![Structure du backend](https://i.ibb.co/Rb4x2Mk/Untitled-Diagram-drawio-3.png)


### 2.2.1 - Reverse Proxy and Web Server

*NGINX* was chosen for both its high performance amongst other reverse proxies, in addition to being a fully featured web server to serve front end content and assets.

It also handles load balancing, which is important to scale horizontally.  
  
However, handling of SSL encryption is scheduled to be delegated to a separate instance of NGINX Proxy Manager which handles redirection of all projects.

  
### 2.2.2 - Mail server

The server provided for the student mail addresses is used to send verification emails. No special reason to use this aside from saving the hassle of setting up a custom SMTP server or buying a third party service to send mails via an API.

  

### 2.2.3 - Database

The database of choice for this iteration was MongoDB , to benefit from its flexibility during the development, and to handle some data where the shape was not entirely known.  
It also gave me an opportunity to try out the new skills I learned through the mongo db courses.

  ![The simplest db schema since a while](https://i.ibb.co/BC36V9V/image.png)
  Notes:
   - LinkPermission is either 'READ' or 'WRITE'
  

### 2.2.4 - REST API

This part of the backend was handled by NestJS, using Fastify as the underlying framework. Main reasons for using it are the extensive documentation of many subjects (like authentication) reinforced by community resources.

Additionally since later iterations of Polynotes will with a high enough certainty be realized in NestJS, learning it now will save time for the whole group later.

  

## 2.3 - Deployment  
To make deployment easier, all parts of the application are shipped as containers and are orchestrated by Docker Compose.  
  
  
  

  

# III - Post Mortem

## 3.1 - What went well

Building the REST API with NestJS was surprisingly easy, once you get the hang of it.  
It took me roughly 2 days to properly wrap my head around many concepts and its file structure.  
  
I learned quite a bit about React and the notion of purity in functions. Indirectly the Strict Mode forced me to write idempotent endpoints on the back, which is nice. I even properly protected my authentication token by using an HttpOnly cookie this time !

I also made the deployment easier on me by using multi-staged builds, to be more host agnostic and avoid installing hundreds of npm modules on the server.

One last thing, of quite an importance. I think I learned what the “Golden Zone” means.

## 3.2 - What went badly: The front end
Aside from the local storage, I discovered too late many edge cases from my component library: Improper path detection on the TreeView, convoluted Table component that ate my database state for some god forsaken reason.  
But by the time I resigned, I was out of the "Golden Zone" and I had to roll along with it.  
  

On the editor side, the stability of the editor schema is a nightmare, and unwanted blocks tend to pop out where they shouldn’t be.  
  
And on top of that, I started working on this iteration too late, mostly because of how slow I was at wrapping my head around React when following the labs and all. 
I only understood the purpose of the reducers a few days before the deadline !


# User manual
To interact with the editor, you can type the following commands:
- `/h{1-4} ` - Create a <h{1-4}> header
- `/ol` - Create a bullet list
- `/ul` - Create a numbered list
- `/db` - Create a database
- `/img(<url>)` - Create an image block displaying the image linked
- `/col` - Create a second column block
- `/table<number>x<number>` - Create a table with the specified dimensions


