# Brewery Catalog React App

For this exercise, you'll be creating a brewery catalog app powered by React and the [Open Brewery DB](https://www.openbrewerydb.org). Your app will display a list of breweries that can be filtered & searched. In addition, a brewery can be selected to view more information about it. In other words, you'll be making a SPA with list & detail views. Upon completing these two initial exercises, feel free to tackle the stretch goals listed below.

Spend no more than 90 minutes on these exercises. Commit all your work to a public GitHub repo, then submit the link upon completion. Make sure to commit often!

---

### Setup

1. Create a public GitHub repo
2. Copy the contents of the `/brewery-catalog` directory into your GitHub repo to use as a starting point
3. Complete the exercises
4. Submit your GitHub repo's URL

---

## Exercise 1: List & Search Breweries

Update the `views/Brewery/List.jsx` component to fetch 10 breweries from [https://api.openbrewerydb.org/breweries](https://www.openbrewerydb.org/documentation#list-breweries) and display them. Each list item should display the brewery's name, city, and state. Each brewery should have a link to its corresponding detail view.

In addition, complete the implementation for the search input by using [https://api.openbrewerydb.org/breweries/search?query={search}](https://www.openbrewerydb.org/documentation#search) to retrieve results and display them.

## Exercise 2: Brewery Detail View

Update `views/Brewery/Detail.jsx` to fetch the brewery info from [https://api.openbrewerydb.org/breweries/:id](https://www.openbrewerydb.org/documentation#single-brewery) and display additional information. The detail view should display the following info for the chosen brewery:

* name
* city
* state
* country
* phone number
* website URL (if available)

## Stretch Goals

If you have additional time, feel free implement any of the following:

* Tests for the list & detail views
* Styling
* Pagination for the brewery list view
* Filter breweries by city/state/type
* Sort breweries by name, with the ability to toggle between ascending and descending
