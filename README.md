# COVID-19 Dashboard

COVID Dashboard is a full stack responsive web application built with ReactJS as the front-end and ruby-on-rails as the back-end. The dashboard lets you to view COVID-19 statistics and the related news for different countries across the world.

## Dependencies

- Node
- React
- Ruby-on-Rails
- Postgresql
- Axios
- Material-UI
- Bootstrap

## Screenshots

!["Screenshot of Dashboard page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/1_Dashboard.png)
!["Screenshot of News page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/3_News.png)
!["Screenshot of Maps page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/5_Maps.png)
!["Screenshot of Login page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/6_Login.png)
!["Screenshot of Sign-up page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/7_Signup.png)
!["Screenshot of Settings page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/11_Settings3.png)
!["Screenshot of Favourites page"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/13_Favourites3.png)
!["Screenshot of Responsive Design"](https://github.com/Marwa7246/covid-dashboard/blob/master/Screenshots/15_ResponsiveDesign1.png)

## Functionalities

- View COVID-19 statistics for world-wide and Canada.
- View COVID-19 news for world-wide and Canada.
- Register and login to add/delete countries as your favourites.
- Post login, view your favourite country's COVID-19 statistics and news.

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
