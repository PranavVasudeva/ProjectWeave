# WEAVE v1

## What is WEAVE?

WEAVE is a student-focused professional networking platform inspired by the interaction patterns of professional networking products.

The goal is:

**Professional networking + opportunities + collaboration for students.**

## v1 features

- LinkedIn-style three-column layout
- Home feed
- Create posts
- Likes
- Comments
- Save posts
- Share prototype
- Profiles
- Edit profile
- Network
- Connection requests
- Accept connection requests
- Jobs/opportunities
- Applications prototype
- Search across people/jobs/posts
- Messaging
- Conversations
- Notifications
- Responsive mobile UI
- LocalStorage persistence
- Demo data

## Technology

This version deliberately uses only:

- HTML
- CSS
- Vanilla JavaScript
- localStorage

There is no framework, build system, API key or backend.

## Run

Simply open `index.html`.

For a local server:

```bash
python3 -m http.server 8000
```

Then open:

`http://localhost:8000`

## Next phases

### Phase 2
- Real authentication
- Supabase/PostgreSQL database
- Profile photos
- Real connections
- Real posts
- Real comments
- Real-time messaging
- File/image storage

### Phase 3
- Skill Exchange
- AI Team Builder
- AI Career Copilot
- Opportunity recommendations
- Personalized feed

### Phase 4
- Market Pulse
- Admin dashboard
- Moderation
- Analytics
- Deployment

## Important architecture rule

Keep the UI independent from the future AI provider.

Create a service layer for AI later so WEAVE can use OpenAI, Gemini, Claude, or a local model without rebuilding the UI.
