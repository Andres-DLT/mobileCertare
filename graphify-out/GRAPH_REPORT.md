# Graph Report - mobileCertare  (2026-10-23)

## Corpus Check
- 194 files · ~204,704 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 57 file(s) not represented in the graph (top: .ttf 19, .css 12, .log 10)

## Summary
- 1642 nodes · 2144 edges · 126 communities (109 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15fcc3c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_firebase_admin
- functions/package.json
- options
- product-list.component.ts
- ProductListComponent
- App Hosting CLI Commands
- AuthService
- pillar.component.ts
- migrate-product-store.js
- Deterministic Rules for Migration
- Firebase Remote Config iOS Setup Guide
- Automatizaciones de Github (Avanzado)
- @angular/router
- Mutations
- Key Attributes
- Configuration Reference
- Security Reference
- package.json
- Firebase Crashlytics iOS Setup Guide
- @angular/core
- @angular/common
- DiscoveryService
- Configuración de Firebase
- Schema Reference
- shared-ui.spec.ts
- firebase-basics/SKILL.md
- Diseño de Aplicación
- 1. Vector Similarity Search (Semantic)
- Firestore Web SDK Usage Guide
- Advanced Validation for Business Logic
- Teoría completa de Angular
- dependencies
- devDependencies
- DEPLOY.md
- Firebase Authentication Web SDK
- Web SDK
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- Firestore Indexes Reference
- ⛔️ CRITICAL RULES & ENVIRONMENT CHECKS
- compilerOptions
- Step-by-Step Migration Execution
- Firebase SQL Connect
- Writing Data
- Instalación de GitHub CLI y Git en macOS
- Examples
- Cloud Functions Integration Reference
- Realtime Reference
- iOS SDK
- Templates
- Flutter & Firebase Setup Guide
- Flutter SDK
- 🧠 Instalación de Node.js con NVM (Node Version Manager)
- Descarga y Configura Proyecto Phone Developers
- Firebase AI Logic Basics
- 🛠️ Firebase Android Setup Guide
- Android SDK Usage (Enterprise Native Mode)
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- main.swift
- CxFilterBarComponent
- firebase-data-connect/SKILL.md
- Admin Node SDK
- Android SDK
- Cloud Firestore on Android (Kotlin)
- Firebase Functions V1 vs V2 Signature Mapping
- firebase-auth-basics/SKILL.md
- Firebase Authentication on Android (Kotlin)
- ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️
- firebase-basics/references/ios_setup.md
- Native SQL Operations
- Document Data Model
- Firestore Indexes Reference
- Web SDK Usage (Enterprise Native Mode)
- AppComponent
- Firebase AI Logic iOS Setup Guide
- Firebase AI Logic on Android (Kotlin)
- Basic Checks
- Alternative: Manual MCP Configuration (Project Scope)
- Native SQL Examples
- Manual Initialization
- scripts
- auth-routing.module.ts
- Flutter Setup for Firebase AI Logic
- Firebase AI Logic Basics
- Core Capabilities
- Firebase Auth & Google Sign-In for Flutter
- Cloud Firestore in Flutter
- Cloud Firestore in Flutter
- Manual Initialization
- 1. Instance Selection and Edition Detection
- Assessment: Security Validator (Red Team Edition)
- OrderEmailService
- Certare Design Decisions (living log)
- CartComponent
- App Check Debug Tokens for Local Development & CI/CD
- Workflow
- Firebase Local Environment Setup
- Recommended: Global Setup
- Recommended: Global Setup
- Firebase Web Setup Guide
- 1. Local Prototyping: Data Seeding
- [1.0.1] - 2026-09-18
- ScheduleComponent
- Antigravity Setup
- Recommended Method: Using Plugins
- Cursor Setup
- BRAND — Certare
- Certare — project overview
- SECURITY — Certare
- SPEC — Certare (aplicación de servicios móviles)
- Public experience release — verification record
- PaypalService
- Android Studio Setup
- DOMAIN — connecting a paid domain
- overrides
- dotenv
- capacitor.config.ts
- Package.swift
- 4-angular2ios-migration.md
- 5-angular2androi-migration.md

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 53 edges
2. `@angular/router` - 33 edges
3. `CartService` - 29 edges
4. `rxjs` - 28 edges
5. `AuthService` - 27 edges
6. `ProductListComponent` - 26 edges
7. `@angular/common` - 24 edges
8. `SeoService` - 22 edges
9. `CatalogItem` - 17 edges
10. `Firebase Authentication Web SDK` - 15 edges

## Surprising Connections (you probably didn't know these)
- `5. Robust `AuthService` Boilerplate` --references--> `AuthService`  [INFERRED]
  .agents/skills/firebase-auth-basics/references/flutter_setup.md → src/app/auth/auth.service.ts
- `Collection Standard v1` --references--> `CollectionConfig`  [INFERRED]
  docs/DESIGN-SYSTEM.md → src/app/collections/collection-config.ts
- `Open improvements (not yet done)` --references--> `DiscoveryService`  [INFERRED]
  docs/QUALITY.md → src/app/agency/discovery.service.ts
- `Open improvements (not yet done)` --references--> `PillarComponent`  [INFERRED]
  docs/QUALITY.md → src/app/agency/pillar/pillar.component.ts
- `Data model and collections` --references--> `AuthService`  [INFERRED]
  docs/PROJECT.md → src/app/auth/auth.service.ts

## Import Cycles
- None detected.

## Communities (126 total, 17 thin omitted)

### Community 0 - "ref_firebase_admin"
Cohesion: 0.05
Nodes (30): admin, app, key, admin, db, serviceAccount, admin, serviceAccount (+22 more)

### Community 1 - "functions/package.json"
Cohesion: 0.05
Nodes (41): dependencies, cors, firebase-admin, firebase-functions, nodemailer, description, devDependencies, jest (+33 more)

### Community 2 - "options"
Cohesion: 0.05
Nodes (44): build, extract-i18n, serve, test, builder, configurations, defaultConfiguration, options (+36 more)

### Community 3 - "product-list.component.ts"
Cohesion: 0.13
Nodes (12): Data model and collections, CollectionConfig, COLLECTIONS, SORT_OPTIONS, SortKey, CatalogItem, CatalogSector, ProductService (+4 more)

### Community 4 - "ProductListComponent"
Cohesion: 0.07
Nodes (6): Common Property Translations, Conventions, Open improvements (not yet done), QUALITY — Certare code standards, Removed legacy (2026-09-22 cleanup), ProductListComponent

### Community 5 - "App Hosting CLI Commands"
Cohesion: 0.06
Nodes (30): App Hosting CLI Commands, Automated deployment via GitHub (CI/CD), Backend Management, Initialization, `npx -y firebase-tools@latest apphosting:backends:create`, `npx -y firebase-tools@latest apphosting:backends:delete <backend-id>`, `npx -y firebase-tools@latest apphosting:backends:get <backend-id>`, `npx -y firebase-tools@latest apphosting:backends:list` (+22 more)

### Community 6 - "AuthService"
Cohesion: 0.12
Nodes (6): @angular/forms, firebase, AuthService, LoginComponent, RegisterComponent, testProviders

### Community 7 - "pillar.component.ts"
Cohesion: 0.09
Nodes (9): COLLECTIONS, DevSector, DevSectorService, DevStage, InsightDetailComponent, PillarComponent, PillarContent, PILLARS (+1 more)

### Community 8 - "migrate-product-store.js"
Cohesion: 0.09
Nodes (18): admin, db, destination(), encode(), equal(), fs, { isDeepStrictEqual }, main() (+10 more)

### Community 9 - "Deterministic Rules for Migration"
Cohesion: 0.07
Nodes (26): 1. Per-Function Configuration, 2. Global Configuration (`setGlobalOptions`), 3. Migrating Environment Configurations (`functions.config()`), Advanced Interpolation & Logic, Built-ins, Deterministic Rules for Migration, Initialization & Scope, Migrating Runtime Configurations (runWith) (+18 more)

### Community 10 - "Firebase Remote Config iOS Setup Guide"
Cohesion: 0.07
Nodes (25): Add Dependencies to Gradle Build, App-level `build.gradle.kts` (`<project>/<app-module>/build.gradle.kts`), Fetch and Activate Values, Firebase Remote Config Android Setup Guide, Follow up Steps, Project and App Setup, Project-level `build.gradle.kts` (`<project>/build.gradle.kts`), Set In-App Defaults (+17 more)

### Community 11 - "Automatizaciones de Github (Avanzado)"
Cohesion: 0.07
Nodes (27): Agregar cambios al área de preparación, Agregar directorio seguro (si es necesario), Automatizaciones de Github (Avanzado), Comandos Básicos de Git (Los Más Comunes), Configuración de GitHub, Configuración de Usuario en Git, Configurar directorio seguro, Configurar tu Aplicación como Proyecto de Github (+19 more)

### Community 12 - "@angular/router"
Cohesion: 0.16
Nodes (9): @angular/router, rxjs, AboutComponent, routes, Insight, InsightService, HomeComponent, SeoService (+1 more)

### Community 13 - "Mutations"
Cohesion: 0.07
Nodes (26): Aliases, Basic Query, Contents, Create, Create with Server Values, Delete, Embedded Queries, Expression Operators (Compare with Server Values) (+18 more)

### Community 14 - "Key Attributes"
Cohesion: 0.08
Nodes (23): `cleanUrls` (Optional), Full Example, `headers` (Optional), Hosting Configuration (`firebase.json`), `ignore` (Optional), Key Attributes, `public` (Required), `redirects` (Optional) (+15 more)

### Community 15 - "Configuration Reference"
Cohesion: 0.08
Nodes (24): Breaking Changes, CI/CD Integration, Cloud SQL Configuration, Configuration Reference, Connect from SDK, connector.yaml, Contents, dataconnect.yaml (+16 more)

### Community 16 - "Security Reference"
Cohesion: 0.08
Nodes (24): Access Levels, Anti-Patterns, @auth Directive, auth.token Fields, Authorization Data Lookup, Authorization Patterns, Available Bindings, CEL Expressions (+16 more)

### Community 17 - "package.json"
Cohesion: 0.08
Nodes (24): firebase-admin, typescript, name, private, version, @angular/cli, @angular/compiler, @angular/compiler-cli (+16 more)

### Community 18 - "Firebase Crashlytics iOS Setup Guide"
Cohesion: 0.08
Nodes (21): Add Dependencies to Gradle Build, App-level `build.gradle.kts` (`<project>/<app-module>/build.gradle.kts`), Firebase Crashlytics Android Setup Guide, Follow up Steps, Optional: Add custom debugging information, Optional: Install the NDK SDK to capture native crashes, Project and App Setup, Project-level `build.gradle.kts` (`<project>/build.gradle.kts`) (+13 more)

### Community 19 - "@angular/core"
Cohesion: 0.21
Nodes (10): @angular/core, @angular/fire, @angular/platform-browser, appConfig, routes, CartItem, OrderEmailData, PageSeo (+2 more)

### Community 20 - "@angular/common"
Cohesion: 0.09
Nodes (9): @angular/common, @capacitor/core, AgencyModule, AgencyRoutingModule, ProductsModule, ProductsRoutingModule, NavbarComponent, FilterGroup (+1 more)

### Community 21 - "DiscoveryService"
Cohesion: 0.13
Nodes (7): DiscoveryRequest, DiscoveryService, NewDiscoveryRequest, SalesHistoryComponent, SalesModule, routes, SalesRoutingModule

### Community 22 - "Configuración de Firebase"
Cohesion: 0.09
Nodes (21): Archivo 1: Configuración de la App Web (firebase-config.ts), Archivo 2: Cuenta de Servicio (serviceAccountKey.json), Archivo 3: Variables de Entorno (.env), Configuración de Firebase, Crear un Proyecto en Firebase, Despliegue de la Aplicación a Firebase Hosting, Flujo Completo de Despliegue, Paso 1: Acceder a Cuentas de Servicio (+13 more)

### Community 23 - "Schema Reference"
Cohesion: 0.10
Nodes (20): @col, Contents, Core Directives, Customizing Tables, Data Types, @default, Defining Types, Enumerations (+12 more)

### Community 24 - "shared-ui.spec.ts"
Cohesion: 0.13
Nodes (6): Shared UI (`src/app/shared/ui/`, standalone, `@Input` variants), CxCardComponent, CxCtaSectionComponent, CxEmptyStateComponent, CxHeroComponent, HeroStat

### Community 25 - "firebase-basics/SKILL.md"
Cohesion: 0.11
Nodes (11): Exploring Commands, Initialization, Refresh Android Studio Local Environment, Refresh Antigravity Local Environment, Refresh Claude Code Local Environment, Refresh Gemini CLI Local Environment, Refresh Other Local Environment, Common Issues (+3 more)

### Community 26 - "Diseño de Aplicación"
Cohesion: 0.11
Nodes (18): 1. `.ts` - Archivo TypeScript (Lógica), 2. `.html` - Archivo HTML (Estructura), 3. `.css` - Archivo CSS (Estilos), 4. `.spec.ts` - Archivo de Testing (NO se edita normalmente), Componentes, Configurar las Rutas, Crear componentes dentro de cada módulo, Crear Espacio de Trabajo de Angular (+10 more)

### Community 27 - "1. Vector Similarity Search (Semantic)"
Cohesion: 0.11
Nodes (17): 1. Query Formats (`queryFormat` argument), 1. Vector Similarity Search (Semantic), 2. Full-Text Search (Lexical), 2. Relevance Thresholding (`relevanceThreshold` and `_metadata.relevance`), A. Auto-Embedding Search, A. Generation on Insert, Automatic Embedding Generation (`_embed` server value), B. Custom Vector Search (+9 more)

### Community 28 - "Firestore Web SDK Usage Guide"
Cohesion: 0.12
Nodes (16): Add a Document with Auto-ID (`addDoc`), Firestore Web SDK Usage Guide, Get a Single Document (`getDoc`), Get Multiple Documents (`getDocs`), Handle Changes (Added/Modified/Removed), Initialization, Listen to a Document/Query (`onSnapshot`), Order and Limit (+8 more)

### Community 29 - "Advanced Validation for Business Logic"
Cohesion: 0.12
Nodes (16): 1. Enforce Enum Values, 2. Validate State Transitions, 3. Strict Path and Relationship Scoping, 4. Secure Counter Updates, 5. **CRITICAL** Ensure Application Validity, Advanced Validation for Business Logic, Critical Constraints, Critical Directives for Secure Generation (+8 more)

### Community 30 - "Teoría completa de Angular"
Cohesion: 0.12
Nodes (16): Arquitectura básica, Atributos Dinámicos, Bootstrap en un NgModule, Directivas estructurales, Estructura básica de un NgModule, Herramientas y flujo de trabajo, Historia y versiones, Módulos Comunes en Angular (+8 more)

### Community 31 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @angular/common, @angular/compiler, @angular/core, @angular/fire, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic (+9 more)

### Community 32 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, @capacitor/cli, dotenv, firebase-admin, jasmine-core (+9 more)

### Community 33 - "DEPLOY.md"
Cohesion: 0.12
Nodes (14): Android, Nota de dominio/identidad, Paso 0 — Autenticación (manual, una vez), Paso 2 — Deploy Hosting (SPA), Paso 3 — Seed de catálogo en producción (opcional, una vez), Paso 4 — Verificación post-deploy, Requisitos previos, Rollback (+6 more)

### Community 34 - "Firebase Authentication Web SDK"
Cohesion: 0.13
Nodes (15): Connect to Emulator, Email Link Authentication, Firebase Authentication Web SDK, Initialization, Observe Auth State, Sign In Anonymously, Sign In with Apple (Popup), Sign In with Facebook (Popup) (+7 more)

### Community 35 - "Web SDK"
Cohesion: 0.13
Nodes (14): Best Practices for Agents, Calling Operations, Client-Side Caching, Data Type Mapping Reference, Initialization, Installation, Resilient Enum Handling, Subscriptions (Realtime) (+6 more)

### Community 36 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.13
Nodes (14): 1. Import and Initialize, 2. Type-Safe Data Models (Codable), 3. Basic CRUD Operations, 4. Pipeline Queries, 5. Realtime Listeners in SwiftUI (Lifecycle Best Practices), ⛔️ CRITICAL RULE: NO FirebaseFirestoreSwift ⛔️, ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Examples (+6 more)

### Community 37 - "Firestore Indexes Reference"
Cohesion: 0.13
Nodes (15): 1. High Write Rates (Sequential Values), 2. Large String/Map/Array Fields, 3. TTL Fields, Automatic vs. Manual Management, Best Practices & Exemptions, CLI Commands, Composite Indexes, Config files (+7 more)

### Community 38 - "⛔️ CRITICAL RULES & ENVIRONMENT CHECKS"
Cohesion: 0.13
Nodes (14): 1. The Anti-Ruby Mandate, 2. Modern Xcode Folder Synchronization, 3. Allowed Scripting Languages, 4. Toolchain Verification, 5. Mandatory Linker Flags for Static Frameworks (Firebase), **CRITICAL: Always Use Latest SDK Version**, ⛔️ CRITICAL RULES & ENVIRONMENT CHECKS, Empty Directory Workflow (+6 more)

### Community 39 - "compilerOptions"
Cohesion: 0.13
Nodes (14): compileOnSave, compilerOptions, esModuleInterop, module, noImplicitReturns, noUnusedLocals, outDir, skipLibCheck (+6 more)

### Community 40 - "Step-by-Step Migration Execution"
Cohesion: 0.14
Nodes (13): 1. Declarative IAM & APIs (Zero-Local-Overhead), 2. Global Parameter Access Restriction, 3. V2 Concurrency & Cost Parity, Core Rules & Constraints, Extension to Functions Codebase & npm Package Migration, Overview, Step 1: Inventory Extension Resources, Step 2: Configure `package.json` (+5 more)

### Community 41 - "Firebase SQL Connect"
Cohesion: 0.14
Nodes (14): 1. Define Data Model (`schema/schema.gql`), 2. Define Authorized Operations (`connector/queries.gql`, `connector/mutations.gql`), 3. Use type-safe SDK in your apps, Deployment & CLI, Development Workflow, Examples, Feature Capability Map, Firebase SQL Connect (+6 more)

### Community 42 - "Writing Data"
Cohesion: 0.14
Nodes (13): Add a Document with Auto-ID, Get a Single Document, Get Multiple Documents, Order and Limit, Pipeline Queries, Python SDK Usage, Queries, Reading Data (+5 more)

### Community 43 - "Instalación de GitHub CLI y Git en macOS"
Cohesion: 0.14
Nodes (13): ✅ 1. Verificar o Instalar Git, ⚖️ 2. Configurar Git con tus datos de GitHub, 🚀 3. Instalar GitHub CLI (`gh`), 🔑 4. Autenticarse en GitHub, 🌐 5. Comandos básicos para verificar funcionamiento, Instalación de GitHub CLI y Git en macOS, Instalar con Homebrew:, Instalar Git con Homebrew (si no está instalado): (+5 more)

### Community 44 - "Examples"
Cohesion: 0.15
Nodes (12): Blog with Permissions, E-Commerce Store, Examples, Movie Review App, Mutations, Operations, Operations with Role Checks, Queries (+4 more)

### Community 45 - "Cloud Functions Integration Reference"
Cohesion: 0.15
Nodes (12): Accessing User Authentication Context, Auth Context Mappings, Auth Extraction Example, Cloud Functions Integration Reference, Comprehensive Example, Core Trigger Configuration, 🚨 Critical Infinite Loop Constraint, Event Filtering (+4 more)

### Community 46 - "Realtime Reference"
Cohesion: 0.15
Nodes (12): CEL Bindings in Conditions, Combining Multiple @refresh Directives, Common Patterns, Contents, Explicit Mutation Signals (`onMutationExecuted`), Implicit Entity Refresh signals, `mutation` — The Triggering Event, Realtime Reference (+4 more)

### Community 47 - "iOS SDK"
Cohesion: 0.15
Nodes (12): Basic Query, Best Practices for Agents, Calling Operations, Client-Side Caching, Data Type Mapping Reference, Dependencies (Package.swift or SPM), Initialization, iOS SDK (+4 more)

### Community 48 - "Templates"
Cohesion: 0.15
Nodes (12): Basic CRUD Schema, Client Subscribe (Web), connector.yaml Template, dataconnect.yaml Template, Event-Driven Refresh, Firebase Init Commands, Many-to-Many Relationship, Realtime Query Templates (+4 more)

### Community 49 - "Flutter & Firebase Setup Guide"
Cohesion: 0.17
Nodes (11): 1. Re-running `flutterfire configure` Upon Renaming, 2. Platform-Specific Build Requirements, 3. Web CORS Best Practices, 4. Elaborating on `WidgetsFlutterBinding.ensureInitialized()`, Flutter & Firebase Setup Guide, Prerequisites, Step 1: Create a Flutter Project, Step 2: Configure Firebase (+3 more)

### Community 50 - "Flutter SDK"
Cohesion: 0.17
Nodes (12): Basic Query, Best Practices for Agents, Calling Operations, Client-Side Caching, Data Type Mapping Reference, Flutter SDK, Imports, Initialization (+4 more)

### Community 51 - "🧠 Instalación de Node.js con NVM (Node Version Manager)"
Cohesion: 0.17
Nodes (11): 1. 🔽 Instalar NVM (Node Version Manager), 2. ✅ Verifica que `nvm` se instaló correctamente, 3. 📅 Instalar la versión LTS de Node.js, 4. 📌 Establecer una versión por defecto, 5. 🧼 Ver versiones instaladas, 6. 🗑️ Desinstalar una versión (opcional), 7. 🧪 Verifica que Node y NPM funcionan, 🧠 Instalación de Node.js con NVM (Node Version Manager) (+3 more)

### Community 52 - "Descarga y Configura Proyecto Phone Developers"
Cohesion: 0.17
Nodes (11): Configuración de Github, Configuración de Ángular CLI, Crear cuentas, Descarga y Configura Proyecto Phone Developers, Download Tools, Firebase CLI, Firebase SDK y AngularFire (Integración en la App), Firebase Tools (CLI - Línea de Comandos) (+3 more)

### Community 53 - "Firebase AI Logic Basics"
Cohesion: 0.18
Nodes (11): Advanced Features, Firebase AI Logic Basics, Initialization Code References, Installation, On-Device AI (Hybrid), Overview, Prerequisites, References (+3 more)

### Community 54 - "🛠️ Firebase Android Setup Guide"
Cohesion: 0.18
Nodes (10): 0. Create an Android application, 1. Create a Firebase Project, 2. Register Your Android App, 3. Download `google-services.json`, Before running these commands, ensure you are authenticated: `npx -y firebase-tools@latest login` (or `npx -y firebase-tools@latest login --no-localhost` on remote servers), Fetch the configuration file using the App ID (which is printed in the output of the previous command): `npx -y firebase-tools@latest apps:sdkconfig ANDROID <APP_ID> --project <PROJECT_ID>` *Example output extraction to file:* ` # (Output must be saved as app/google-services.json)`, 🛠️ Firebase Android Setup Guide, Manual Verification (+2 more)

### Community 55 - "Android SDK Usage (Enterprise Native Mode)"
Cohesion: 0.18
Nodes (10): 1. Initialization, 2. Decision Framework: Mandatory Pipeline Architecture, 3. Pipeline Examples, 4. Real-Time Listener & Document Operations, Add Dependencies, Android SDK Usage (Enterprise Native Mode), Full-Text Search, Initialize Firestore (+2 more)

### Community 56 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.18
Nodes (10): 1. Import and Initialize, 2. Type-Safe Data Models (Codable), 3. Writing Data (Modern Concurrency & Codable), 4. Reading Data (Modern Concurrency & Codable), 5. Realtime Listeners in SwiftUI (Lifecycle Best Practices), ⛔️ CRITICAL RULE: NO FirebaseFirestoreSwift ⛔️, ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Firebase Firestore iOS Setup Guide (+2 more)

### Community 57 - "main.swift"
Cohesion: 0.33
Nodes (8): addCrashlyticsRunScriptBuildPhase(), hasCrashlyticsRunScriptBuildPhase(), isUserScriptSandboxingEnabled(), main(), setDwarfWithDsymDebugInformationFormat(), Foundation, PathKit, XcodeProj

### Community 59 - "firebase-data-connect/SKILL.md"
Cohesion: 0.20
Nodes (6): 2. Production: Admin SDK Bulk Operations, 3. Production: Bulk Operations via raw SQL, 🚨 Critical SQL Operations Constraint, Data Seeding & Bulk Operations Reference, SDK Bulk APIs Features:, SDK Bulk Operations Example

### Community 60 - "Admin Node SDK"
Cohesion: 0.20
Nodes (9): 1. Impersonating an Unauthenticated User, 2. Impersonating a Specific User (Cloud Functions), 3. Impersonating a Specific User (Plain HTTP), 4. Running with Unrestricted Access, Admin Node SDK, Best Practices for Agents, Configuration in `connector.yaml`, Generation (+1 more)

### Community 61 - "Android SDK"
Cohesion: 0.20
Nodes (10): Android SDK, Basic Query, Best Practices for Agents, Calling Operations, Client-Side Caching, Data Type Mapping Reference, Dependencies (build.gradle.kts), Initialization (+2 more)

### Community 62 - "Cloud Firestore on Android (Kotlin)"
Cohesion: 0.20
Nodes (9): 1. Add Dependencies, 2. Initialize Firestore, 3. Add Data, 4. Read Data, 5. Update Data, 6. Delete Data, Cloud Firestore on Android (Kotlin), Enable Firestore via CLI (+1 more)

### Community 63 - "Firebase Functions V1 vs V2 Signature Mapping"
Cohesion: 0.22
Nodes (8): Auth (Blocking), Cloud Firestore, Cloud Pub/Sub, Cloud Storage, Cloud Tasks, Firebase Functions V1 vs V2 Signature Mapping, HTTP / Callables, Realtime Database

### Community 64 - "firebase-auth-basics/SKILL.md"
Cohesion: 0.22
Nodes (5): Core Concepts, Identity Providers, Prerequisites, Tokens, Users

### Community 65 - "Firebase Authentication on Android (Kotlin)"
Cohesion: 0.22
Nodes (9): 1, Enable Authentication via CLI, 2. Add Dependencies, 3. Initialize FirebaseAuth, 4. Check Current Auth State, 5. Sign Up New Users (Email/Password), 6. Sign In Existing Users (Email/Password), 7. Sign Out, Firebase Authentication on Android (Kotlin) (+1 more)

### Community 66 - "⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️"
Cohesion: 0.22
Nodes (8): 1. Import and Initialize, 2. Authentication State, 3. Email and Password Authentication (Modern Concurrency), 4. Sign Out, ⛔️ CRITICAL RULE: NO INLINE INITIALIZATION ⛔️, Firebase Auth iOS Setup Guide, Sign In, Sign Up

### Community 67 - "firebase-basics/references/ios_setup.md"
Cohesion: 0.22
Nodes (8): 1. Create a Firebase Project and App (Automated), 2. Installation (Automated via Swift Package Manager CLI), 3. Initialization, AppDelegate (Traditional / UIKit), ⛔️ CRITICAL RULE: INITIALIZATION ORDER ⛔️, ⛔️ CRITICAL RULE: STATE MANAGEMENT (OBSERVATION VS COMBINE) ⛔️, Firebase iOS Setup Guide, SwiftUI (Modern - SAFE PATTERN)

### Community 68 - "Native SQL Operations"
Cohesion: 0.22
Nodes (8): Core Agent Constraints, Mutation Fields (DML), Native SQL Operations, Native SQL Root Fields, PostgreSQL Extensions, Query Fields (Read-Only), ⚠️ Security: Stored Procedures & Dynamic SQL, Syntax rules & limitations

### Community 69 - "Document Data Model"
Cohesion: 0.22
Nodes (8): Collection Group Support, Collections, Document Data Model, Documents, Examples, Firestore Data Model Reference, Subcollections, Use Cases

### Community 70 - "Firestore Indexes Reference"
Cohesion: 0.22
Nodes (9): CLI Commands, Config files, Firestore Indexes Reference, Index Density, Index Ordering, Index Structure, Management, Query Support Examples (+1 more)

### Community 71 - "Web SDK Usage (Enterprise Native Mode)"
Cohesion: 0.22
Nodes (8): 1. Initialization, 2. Decision Framework: Pipelines vs. Standard Queries, 3. Pipeline Examples, 4. Real-Time Listener & Document Operations, Full-Text Search, Relational Joins Pattern, Rules & Accountability, Web SDK Usage (Enterprise Native Mode)

### Community 73 - "Firebase AI Logic iOS Setup Guide"
Cohesion: 0.25
Nodes (7): 1. Import and Initialize, 2. SwiftUI Integration (Best Practices), 3. Safety Settings, Advanced Features, Chat Session (Multi-turn), Firebase AI Logic iOS Setup Guide, Function Calling (Tools)

### Community 74 - "Firebase AI Logic on Android (Kotlin)"
Cohesion: 0.25
Nodes (8): 0. Enable Firebase AI Logic via CLI, 1. Add Dependencies, 2. Initialize and Generate Content, 3. Multimodal Input (Text and Images), 4. Chat Session (Multi-turn), 5. Streaming Responses, Firebase AI Logic on Android (Kotlin), Jetpack Compose (Modern)

### Community 75 - "Basic Checks"
Cohesion: 0.25
Nodes (7): Authentication in Security Rules, Basic Checks, Check if user is signed in, Check if user owns the data, Check if user owns the document (field-based), Example: Email Verification Check, Token Properties

### Community 76 - "Alternative: Manual MCP Configuration (Project Scope)"
Cohesion: 0.25
Nodes (7): 1. Configure and Verify Firebase MCP Server, 1. Install and Verify Firebase Extension, 2. Restart and Verify Connection, 2. Restart and Verify Connection, Alternative: Manual MCP Configuration (Project Scope), Gemini CLI Setup, Recommended: Installing Extensions

### Community 77 - "Native SQL Examples"
Cohesion: 0.25
Nodes (8): Advanced aggregation with RANK, Advanced CTE with upserts (atomic get-or-create), Basic SELECT with field aliasing, Basic UPDATE, Multi-statement Transactions, Native SQL Examples, UPDATE with RETURNING and Auth Context, Use of extensions (e.g. PostGIS for geospatial data)

### Community 78 - "Manual Initialization"
Cohesion: 0.25
Nodes (8): 1. Create a Firestore Enterprise Database, 2. Create `firebase.json`, 2. Create `firestore.rules`, 3. Create `firestore.indexes.json`, Deploy rules and indexes, Local Emulation, Manual Initialization, Provisioning Firestore Enterprise Native Mode

### Community 79 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, android:sync, build, ng, set-env, start, test, watch

### Community 80 - "auth-routing.module.ts"
Cohesion: 0.29
Nodes (4): AuthModule, AUTH_ROUTES, AuthRoutingModule, routes

### Community 81 - "Flutter Setup for Firebase AI Logic"
Cohesion: 0.29
Nodes (6): Chat Session, Flutter Setup for Firebase AI Logic, Initialization, Installation, Text Generation, Usage

### Community 82 - "Firebase AI Logic Basics"
Cohesion: 0.29
Nodes (7): Advanced Features, Chat Session (Multi-turn), Core Capabilities, Firebase AI Logic Basics, Initialization Pattern, Multimodal (Text + Images/Audio/Video/PDF input), Streaming Responses

### Community 83 - "Core Capabilities"
Cohesion: 0.29
Nodes (7): Chat Session (Multi-turn), Core Capabilities, Generate Images with Nano Banana, Multimodal (Text + Images/Audio/Video/PDF input), Search Grounding with the built in googleSearch tool, Streaming Responses, Text-Only Generation

### Community 84 - "Firebase Auth & Google Sign-In for Flutter"
Cohesion: 0.29
Nodes (7): 1. `google_sign_in` 7.2.0 API Changes, 2. Initialization & Web Hang/Crash Pitfalls, 3. Web Logout Crashes, 4. Prototyping Workaround: Bypassing Firestore Composite Indices, 5. Robust `AuthService` Boilerplate, 6. Troubleshooting `auth/unauthorized-domain` on Flutter Web, Firebase Auth & Google Sign-In for Flutter

### Community 85 - "Cloud Firestore in Flutter"
Cohesion: 0.29
Nodes (6): 1. Setup, 2. Best Practices: Type-Safe Models, 3. The Service Layer, 4. Listening to Streams in the UI (`StreamBuilder`), Cloud Firestore in Flutter, Initialization & References

### Community 86 - "Cloud Firestore in Flutter"
Cohesion: 0.29
Nodes (6): 1. Setup, 2. Best Practices: Type-Safe Models, 3. The Service Layer, 4. Listening to Streams in the UI (`StreamBuilder`), Cloud Firestore in Flutter, Initialization & References

### Community 87 - "Manual Initialization"
Cohesion: 0.29
Nodes (7): 1. Create `firebase.json`, 2. Create `firestore.rules`, 3. Create `firestore.indexes.json`, Deploy database, rules and indexes, Local Emulation, Manual Initialization, Provisioning Cloud Firestore

### Community 88 - "1. Instance Selection and Edition Detection"
Cohesion: 0.29
Nodes (7): 1. Instance Selection and Edition Detection, 2. Specialized Guides, A. Instance Found, B. No Instance Found (or New Requested), Cloud Firestore Database and Operations, Enterprise Edition / Native Mode (`references/enterprise/`), Standard Edition (`references/standard/`)

### Community 89 - "Assessment: Security Validator (Red Team Edition)"
Cohesion: 0.29
Nodes (6): Admin Bootstrapping & Privileges:, Assessment: Security Validator (Red Team Edition), Mandatory Audit Checklist:, Overview, Scoring Criteria, Scoring Criteria (1-5):

### Community 90 - "OrderEmailService"
Cohesion: 0.29
Nodes (3): Added, Paso 1 — Deploy Cloud Functions (correo de pedido), OrderEmailService

### Community 91 - "Certare Design Decisions (living log)"
Cohesion: 0.29
Nodes (5): Certare Design Decisions (living log), Collection Standard v1, Discarded, Tokens (`theme.css`), SharedModule

### Community 93 - "App Check Debug Tokens for Local Development & CI/CD"
Cohesion: 0.33
Nodes (6): App Check, App Check Debug Tokens for Local Development & CI/CD, CI/CD Pipelines (Pre-Provisioned), Local Development (Auto-Generated), Remote Config, Security & Production

### Community 94 - "Workflow"
Cohesion: 0.33
Nodes (6): 1. Provisioning, 2. Client Setup & Usage, 3. Security Rules, Option 1. Enabling Authentication via CLI, Option 2. Enabling Authentication in Console, Workflow

### Community 95 - "Firebase Local Environment Setup"
Cohesion: 0.33
Nodes (5): 1. Verify Node.js, 2. Verify Firebase CLI, 3. Verify Firebase Authentication, 4. Install Agent Skills and MCP Server, Firebase Local Environment Setup

### Community 96 - "Recommended: Global Setup"
Cohesion: 0.33
Nodes (5): 1. Install and Verify Firebase Skills, 2. Configure and Verify Firebase MCP Server, 3. Restart and Verify Connection, GitHub Copilot Setup, Recommended: Global Setup

### Community 97 - "Recommended: Global Setup"
Cohesion: 0.33
Nodes (5): 1. Install and Verify Firebase Skills, 2. Configure and Verify Firebase MCP Server, 3. Restart and Verify Connection, Other Agents Setup, Recommended: Global Setup

### Community 98 - "Firebase Web Setup Guide"
Cohesion: 0.33
Nodes (5): 1. Create a Firebase Project and App, 2. Installation, 3. Initialization, 4. Using Services, Firebase Web Setup Guide

### Community 99 - "1. Local Prototyping: Data Seeding"
Cohesion: 0.33
Nodes (6): 1. Local Prototyping: Data Seeding, Resetting Seed Data, ⚠️ Seeding Directives Rule, Seeding Independent Tables (FK Order), Seeding Related Tables (Nested Relational Inserts), The `seed_data.gql` Workflow

### Community 100 - "[1.0.1] - 2026-09-18"
Cohesion: 0.33
Nodes (5): [1.0.1] - 2026-09-18, Changed, Docs, [Unreleased] - 2026-09-21, [Unreleased] - 2026-09-23

### Community 103 - "Antigravity Setup"
Cohesion: 0.40
Nodes (4): 1. Install and Verify Firebase Skills, 2. Configure and Verify Firebase MCP Server, 3. Restart and Verify Connection, Antigravity Setup

### Community 104 - "Recommended Method: Using Plugins"
Cohesion: 0.40
Nodes (4): 1. Install and Verify Plugins, 2. Restart and Verify Connection, Claude Code Setup, Recommended Method: Using Plugins

### Community 105 - "Cursor Setup"
Cohesion: 0.40
Nodes (4): 1. Install and Verify Firebase Skills, 2. Configure and Verify Firebase MCP Server, 3. Restart and Verify Connection, Cursor Setup

### Community 107 - "BRAND — Certare"
Cohesion: 0.40
Nodes (4): BRAND — Certare, Logo, Pending (before public launch), Rules

### Community 108 - "Certare — project overview"
Cohesion: 0.40
Nodes (4): Certare — project overview, Decisions and operations, Local commands, Routes and visitor flow

### Community 109 - "SECURITY — Certare"
Cohesion: 0.40
Nodes (4): Current controls, Known risks and actions, Rules for contributors, SECURITY — Certare

### Community 110 - "SPEC — Certare (aplicación de servicios móviles)"
Cohesion: 0.40
Nodes (4): 1. Propósito, 2.1 Entidades, 2. Modelo de negocio (REFACTOR APLICADO), SPEC — Certare (aplicación de servicios móviles)

### Community 111 - "Public experience release — verification record"
Cohesion: 0.40
Nodes (4): Delivered structure, Operational facts and limitations, Public experience release — verification record, Verified before the production release

### Community 113 - "Android Studio Setup"
Cohesion: 0.50
Nodes (3): Android Studio Setup, MCP Setup, Skills Installation

### Community 114 - "DOMAIN — connecting a paid domain"
Cohesion: 0.50
Nodes (3): DOMAIN — connecting a paid domain, Later (same window or after), Steps on purchase day (example: `certare.mx`)

### Community 115 - "overrides"
Cohesion: 0.50
Nodes (4): overrides, serialize-javascript, tar, @tootallnate/once

## Knowledge Gaps
- **29 isolated node(s):** `PackageDescription`, `Foundation`, `PathKit`, `cors`, `firebase-admin` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1015 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AuthService` connect `AuthService` to `product-list.component.ts`, `ProductListComponent`, `@angular/common`, `.initPayment`, `Firebase Auth & Google Sign-In for Flutter`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `AuthService` (e.g. with `5. Robust `AuthService` Boilerplate` and `Data model and collections`) actually correct?**
  _`AuthService` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `Foundation`, `PathKit` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_firebase_admin` be split into smaller, more focused modules?**
  _Cohesion score 0.047872340425531915 - nodes in this community are weakly interconnected._
- **Why does `5. Robust `AuthService` Boilerplate` connect `Firebase Auth & Google Sign-In for Flutter` to `AuthService`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Should `functions/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.04830917874396135 - nodes in this community are weakly interconnected._
- **Why does `Firebase Auth & Google Sign-In for Flutter` connect `Firebase Auth & Google Sign-In for Flutter` to `firebase-auth-basics/SKILL.md`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._