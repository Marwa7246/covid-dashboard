# COVID-19 Dashboard

COVID Dashboard is a full stack responsive web application built with ReactJS as the front-end and ruby-on-rails as the back-end. The dashboard lets you view COVID-19 statistics and the related news for different countries across the world.
https://covid19dashboard2020.netlify.app

## Dependencies

- Node
- React
- Ruby-on-Rails
- Postgresql
- Axios
- Material-UI
- Bootstrap

## Screenshots

!["Screenshot of Dashboard page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/01_Dashboard.png)
!["Screenshot of News page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/03_News.png)
!["Screenshot of Maps page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/05_Maps.png)
!["Screenshot of Login page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/06_Login.png)
!["Screenshot of Sign-up page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/07_Signup.png)
!["Screenshot of Settings page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/11_Settings3.png)
!["Screenshot of Favourites page"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/13_Favourites3.png)
!["Screenshot of Responsive Design"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/15_ResponsiveDesign1.png)
!["Screenshot of SMS alert"](https://github.com/Marwa7246/covid-dashboard/blob/master/screenshots/18_SMS%20alert.jpg)

## Functionalities

- View COVID-19 statistics for different countries.
- View COVID-19 news for different countries.
- Register and login to add/delete countries as your favourites.
- Login to view your favourite country's COVID-19 statistics and news.
- Get SMS alerts

## Getting Started

1. Fork this repository, then clone your fork of this repository.

2. Front-end setup: : Install dependencies using the `npm install` command.
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.

5. Back-end setup: Install dependencies using the `bundle install` command.
6. Verify that the ruby version >= 2.6 and rails versions is either 5 or 6.
7. Create the database using `rake db:create`, `rake db:migrate` commands and load sample data using `rake db:seed` command
8. Start the back-end server using `rails s -p 3001 -b 0.0.0.0` command.

Note: Register and add API keys to access related data.
