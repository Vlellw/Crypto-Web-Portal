# Money & Crypto Portal

An interactive web application for tracking cryptocurrency market trends, comparing live and historical pricing data, visualizing market capitalization, and calculating personal crypto portfolio performance.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies & APIs Used](#technologies--apis-used)
- [Getting Started](#getting-started)
- [User Manual](#user-manual)
- [Browser Compatibility](#browser-compatibility)
- [Author & Academic Context](#author--academic-context)

---

## Overview
Money & Crypto Portal is a client-side web application built with vanilla HTML, CSS, and JavaScript. It merges data from multiple external REST APIs to deliver real-time market insights, interactive SVG visualizations, a session-protected admin flow, and a portfolio profit/loss calculator.

---

## Features

### 1. Interactive Market & Capitalization Charts
* Cryptocurrency Selection: Track historical market performance for Bitcoin (BTC), Dogecoin (DOGE), and Ethereum (ETH).
* Selectable Timeframes: View data across 30 days, 3 months, or 1 year.
* Custom Chart Styling: Pick any line color dynamically using the built-in color picker.
* Interactive Data Points: Click on any point along the chart to inspect its exact date and recorded USD price in the Information panel below.
* Market Capitalization View: Toggle a secondary chart displaying historical market capitalization in billions of USD.
* SVG Export: Download the rendered chart directly as a scalable .svg file using Blob and XMLSerializer.

### 2. Multi-API Data Aggregation & Live Quote
* Dynamic Header Quote: Fetches a random motivational/financial quote on page load via the DummyJSON Quotes API (with automatic fallback text if offline).
* Price Comparison Panel: Compares the live USD price from Coinpaprika against the historical period average calculated from CoinGecko, displaying the percentage difference.

### 3. Admin Authentication & Portfolio Calculator
* **Session-Based Demo Login (admin.html):** Generates a random 3-digit passcode per session. Entering an incorrect password displays a helpful hint so evaluators/users can test the flow smoothly.
* State Management: Manages access via URL query parameters (?admin=true / ?admin=false).
* Portfolio Profit/Loss Calculator: Unlocked only in admin mode. Users select a cryptocurrency, purchase amount, and purchase date to calculate current estimated holdings, percentage gain/loss, and receive an automated BUY / SELL recommendation.

### 4. Interactive Learning Section & Security Trigger
* Educational Links: Selecting "Yes!!!" replaces the prompt with curated cryptocurrency learning video links.
* 3-Strike Admin Logout: While logged in as an administrator, clicking "No" three consecutive times triggers an alert ("You are not curious enough to be admin!"), revokes admin privileges, hides the portfolio calculator, and resets the counter.

---

## Project Structure

* **index.html** — Main dashboard containing the chart containers, price comparison details panel, portfolio calculator, and interactive learning section.
* **admin.html** — Dedicated administrator login page with session passcode validation.
* **css/**
  * **style.css** — Dark theme styling, responsive grid/flexbox layouts, typography, and UI controls.
* **js/**
  * **api.js** — Asynchronous API requests for CoinGecko, Coinpaprika, and DummyJSON Quotes.
  * **app.js** — Chart rendering, interactive data point handlers, SVG export, portfolio calculations, and UI state logic.
  * **admin.js** — Random 3-digit passcode generation, login validation, and URL parameter redirection (?admin=true).
* **Project work.pdf** — Full academic project report, grading rubric justification, and AI usage declaration.
