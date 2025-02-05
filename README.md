> [!IMPORTANT]  
> Hello, sadly I will discontinue the project for a while... The project uses many old dependencies and kind of bad structuring, which makes it tedious to work in and takes the fun out for me. I attempted to upgrade everything at once within 2 hours. This optimistic attempt did not work out as one might expect haha (see on branch `complete-overhaul` `MIGRATE.md`). I have some really cool ideas to make a super good data-first UI/UX and bring senseBox into a more day-to-day setting with nice analytics, location-based weather and extensions. If I find some more time or some rich philantropist is willing to pay me for it, I will continue this project with passion! The website hosting will continue for now.

# Sensebox Data Dashboard
[![NPM](https://img.shields.io/badge/webapp-red?label=sensebox-data-dashboard.de)](https://sensebox-data-dashboard.de/)
[![NPM](https://img.shields.io/badge/senseBox_website-51AA46?label=sensebox.de)](https://sensebox.de/en/)

The Sensebox Data Dashboard is a analytics dashboard for data collected from Senseboxes around the world (for more info on Senseboxes [follow this link](https://sensebox.de/en/))

![Dashboard Live Data Preview](https://github.com/tworkool/sensebox.data.dashboard/blob/main/webapp/src/assets/content/dashboard-preview.jpg)

The motivation behind this project is mainly to create a better approach to visualising data collected from Senseboxes. The [Opensensemap](https://opensensemap.org/) is a great native approach for doing so, but in my opinion it could be improved from many perspectives.
If you would like to use a published version of this dashboard, please visit his link: [sensebox-data-dashboard.de](sensebox-data-dashboard.de)

#### Motivation
One prominent feature which will be implemented in the future, is a Map visualising different sensor data from multiple Senseboxes. The main focus is the development of a user-driven dashboard for managing the overview of data.

#### Contribution
The dashboard is currently still in an early version. Many features and improvements will be added over time, so please be patient. **If you find issues or want to contribute, please open a discussion or PR**.

#### Development
Stack:
* React v16
* Redux + Redux-Saga
* SCSS

Frameworks etc.:
* Design System: Mantine
* Bundler: Parcel v2

To reduce API loads, a very simple implementation for mock API calls is included.
In order to use Mapbox for displaying maps, adjust the environment variables. I usually use a different config for prod (.env.production) and dev (.env.development). The .env-template file is a template for how your env file could look like.

In order to run the project, run the command ```npm run start``` which will use parcel to start the local dev server.
