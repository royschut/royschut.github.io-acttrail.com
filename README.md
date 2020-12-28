App to manage bookings, artists and events within the Music scene.   (in progress)

### Status
De huidige versie heeft een login en laadt op basis van de user.team_id: artists, events en bookings.
Je kunt artists en events toevoegen en deze met elkaar koppelen als 'bookings'.
Alle metadata is momenteel placeholder.

### Technical decisions (/stack)
- MaterialUI
- Redux, Redux Toolkit en createAsyncThunk
- Async api calls
- Function components en effect hooks
- Backend: PHP API en MySQL DB

De UI is mobile-first responsive met de items in Grid- of Listweergave.
Bij een gekozen item, kun je de grid singleline weer openen, om snel te switchen tussen subpagina's van verschillende artists/events.
Bij het openen van een booking kan dit vervolgens ook, dus kun je snel switchen tussen de artist/event combinatie.

Laatste leuke feature: de 'Bookings details' is een herhaling van de 'Artist/Event details' page (ManagerPage.js). Hij herhaalt zichzelf dus met andere waardes. :)

### Future features
- Travel overview
- Checklists
- Asset manager (media)
- Papers (contracts, invoices, statements)


And of course the Artist Module, for artists to see their schedule.
