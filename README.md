# movie_app

This applicaiton is a small movie application which fetches, returns, and displays tv show data fromt he tvmaze api.
Features include:
- Search for a show by name
- Filter shows by genre, status, and rating
- Pagination of shows
- View show details

## Prerequisites

This applicaiton was built with recent versions of Node.js and npm. Please ensure you have the following installed at minimum:

- Node.js >= 22.0.0
- npm >= 10.0.0

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


# Approach / Design

This application is built with the Vue 3 framework and uses Typescript, Pinia and Vitest. It is a pretty simple setup and I chose to go this route as these are some of the current technologies that are common setup for a Vue application. It also allowed me to keep the app lean and free of extra plugins and third party packages. The application is styled to the best of my ability as a mobile responsive app using vanilla CSS as opposed to a third party component library or something similar (such as Vuetify, Bootstrap, etc.).

My goal was to showcase a bit of everything that I would put into a larger application, even if this meant that it took me a bit longer to build this application and resulted in a few less extra features. Some of the main areas I considered during building the application about are...

## Typescript
- I chose to use Typescript for this application simply because I feel that it is the right choice and allows for much more descriptive code that is easier to read and helps significantly in reducing bugs and debugging.

## Reusable Components
- I built a number of reusable components from scratch (again as opposed to using a component library). The goal here was to build reusable components that could work beyond the scope of this application. For example the Search or Filters components being reusable and not tight coupled to specific data / information but was an important consideration. This allows for a component that can be inserted in multiple different situations.

## Folder Structure
- While for a small application this level of folder separation is not needed really (in fact some folders are even empty), I wanted to set up the folder structure in a way that I could easily extend the application from here and if it were to grow larger it would be easily organised and understandable.

## Path Builder (/core/api/utils.ts file) and API
- I chose to implement a PathBuilder and a QueryBuilder utility class in order to build all Paths in the same way. They then take a set of Path strings that are set in an enum. This sort of setup is quite a bit of overkill I think for such a small application, and I could likely have added an additional feature relating to the movies themselves had I just hard coded all of the api strings from the documentation into the code. That said, I find it very useful to avoid magic strings whenever possible and in a large application with hundreds of API calls, such a builder service for API routes could make it much easier if for example a Backend was to update the naming or query of a route in some way. In this way there is only one single source of true and that is the Path enums. From there all paths rely on that utility and a developer would not have to manual change every API route for example that had the route /shows in it if were say to be updated to /tv-shows.
- I also condensed the API imports using the `index.ts` file and imported them all through “import api from…” import. This could have been done differently and some might argue that it removes the explicit import of where a function comes from, however I find this a clean way to just have one import for all api’s while still having a modular approach.

## Unit Tests
- I covered a decent amount of functionality in unit tests, especially the utilities and components that I built from scratch. I think there is definitely opportunity to cover more of the code in additional unit tests (and in a large application perhaps I would consider Cypress or an e2e solution to cover some important user happy flows). There are some areas which are still lacking unit tests that I have yet to cover, specifically the `shows.store` file and larger pages. In a real application I would strive for making sure all logic built is covered by testing before moving on to add other features.

## Styling
- I have not worked with vanilla CSS in a while however I decided to take this on as a challenge. It has also been quite a while since I have had to build a mobile responsive app as my current role is working on a web app that is specifically meant only for desktop web application. That said I am happy with how it turned out. In an actual role with a company I would presume to have a component library where much of what I build would already be available and I could focus more time on adding a feature or building out the component library itself with more advanced features.

## Naming
- Personally I find naming very important and try to be very intentional about choosing a name for a variable or a function so that the code reads a bit more like a story and if someone is looking at it for the first time (or the first time after a while) they don’t have to struggle to understand what is happening. This also involves component naming, and keeping logic in small chunks that can be abstracted with a name that makes sense. A good example could be found in the `ShowsPage.vue` page with this logic -- `const areMoreShowsNeeded = newPage * showsStore.itemsPerPage > showsStore.shows.length - showsStore.itemsPerPage;`
- Again with naming I looked to remove magic strings as much as possible and make sure to use enums for any sort of string that is used in multiple places. This significantly reduces the liklihood that an incorrect string is passed, resulting in a bug in the code.

## Small UI Items to Make Big Impact
- I tried to make sure that some smart UI features were enabled in this application so that components were not just added without thought as to how they may affect the product. Some examples would be the folowing...
- The search bar has buttons that are disabled if the search is empty which is a small but very user friendly feature as searching on an empty string would break the app
- Loading indicators so a user isn’t left wondering why they are staring at a blank screen
- Having on hover styling changes for buttons and cards that are clickable
- Adding simple items like the “Image not available” placeholder or “N/A” if some fields for a show were returned as null

# Future Considerations
- I would have liked to have added an episode list to the UI in the specific Show Overview screen. Ideally there would be additional navigation to see the seasons of a show on a separate page as well since these are easily available through the UI.
- Ideally it would be good to extract some more logic into separate components - the loading spinner would be a good example of this.
- Extracting CSS styles that are reused and placing them int he App.vue file would be a good idea so there is less repitition and a signle source of truth for styles that are used in multiple places.
- I would want to write a reusable Card.vue component that could be used in multiple places and fed data probably using <slots> to allow for more flexibility and reuse -- specifically in the Overview page for a show.
- Adding a schedule section and information would be helpful.
- I am “ok” with the way I set up the pagination to work in the product, however the fact that the API does not provide a filtered response for shows is not the most ideal. I think in a real world application (based on the API documentation) I would set up a Backend that fetches and stores the data of the shows and such in a database and then updates this information on a weekly basis. By doing this you could add specific query routes to for example query shows by genre, by network etc
- I would add a snackbar system that would allow users to see completed requests or rejections / errors in the UI as a pop up.
- I would add additional filter considerations such as “Country” and “Network”.
- In a much larger application (also dependent Backend) I would want to have a system in which a user could favourite click a show and they could then have a user specific page where they can see all of their favourited shows or favourited actors.