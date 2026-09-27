# Game Platform Architecture

## Core Principle

The platform core must not depend on any specific game.

Games depend on the core engine, not the other way around.

## Layers

### app
Application setup, routing, providers, and configuration.

### components
Reusable UI components and layouts.

### features
Product features such as authentication, profiles, games, sessions, and multiplayer.

### engine
Reusable game infrastructure:
- GameEngine
- GameSession
- GameRegistry
- scoring
- timers
- persistence

### games
Individual games.

Each game must be isolated from other games.

### services
External integrations:
- Supabase
- analytics
- storage

### hooks
Reusable React hooks.

### types
Shared TypeScript types.

### utils
Pure utility functions.

## Rules

1. A game must not directly control global application state.
2. A game must not depend on another game.
3. Shared logic belongs in the engine, not inside individual games.
4. External services must be isolated inside services/.
5. Database access must not be scattered throughout UI components.
6. The platform must remain usable without authentication.
7. Game versions must be preserved so old sessions remain valid.
8. New games should be added without rewriting the platform core.
