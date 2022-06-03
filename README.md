# What is Trackr?

  Trackr is a time management tool. I found the list of movies and shows I wanted to watch kept growing over the years, and nothing was ever getting checked off. So I decided to do something about it. It started as a spreadsheet, I took all of my movies and shows, their runtimes, and what services they were on and kept an Excel doc. Since I was working and in college, it was a lifesaver being able to say *"This show is only 8 hours long, I can do that."* and then knocking out the larger shows over Christmas break. But maintaining that list eventually became a chore. I found myself annoyed any time something caught my interest, since I'd have to scour for the streaming services and calculate the runtime for another show. So I thought to myself, *"What if I had a tool to do that for me?"* And that is how Trackr was born. I don't just want to give you a tool to help organize your time, but I want to make you feel good for checking things off. For me, this tool is also a great way for me to learn React. But for you, I want this to be a tool that's free, convenient, and easy to use.

  Trackr has been deployed on Vercel! [You can visit now!](https://trackrv2.vercel.app)

NOTE: After doing some digging on the abnormal behavior of shows (Season 0 of everything, and many seasons of Judge Judy having 0 episodes) I have determined this to be an issue with TMDB API, and not an issue with Trackr, as frustrating as that is since it means I cannot fix it.

---

## What's New?

- Completely fixed the Season 0 issue, no workaround needed.
- Home icon now changes based on the color mode for more consistency with the rest of the header.
- Added placeholder images on list items, episode items, and the Details page that will load if the image either failed to retrieve or one does not exist.
- Added some (very) primitive responsiveness to the watchlist, just to play around with how I want to go about implementing a responsive UI.

---

## What's Next?

Well, to be honest, there's a lot I want to do. I'm not sure how much of it is feasible, but there are a few things that I need to do as opposed to what I want to do. Here's a few:

- Consider removing Season 0 entirely, thus avoiding the need for workarounds and preventing it from skewing runtimes and progress bars
- Add runtime calculations
- Include screenshots and documentation on how to use the tool
- Add mobile support
- Add pagination for the search page
- Add toasts to celebrate the user accomplishing something

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
