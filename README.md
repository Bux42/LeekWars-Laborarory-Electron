# LeekWars Laboratory Electron

This electron project used the [electron react boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) as base code

It is the frontend of the [Leekwars Tools](https://github.com/Bux42/Leekwars-Tools) project

## How to use (dev)

Clone the project

```
git clone https://github.com/Bux42/LeekWars-Laborarory-Electron
```

Create a .env file in the root project directory and configure it (see .env.example)

Install npm packages, and run

```
cd LeekWars-Laborarory-Electron
npm i
npm npm start:renderer
```

## Installer

You can also just install the electron app using the installer (WIP)

## First use

When you first install the tool, nothing is configured yet.

### Step 1: Add a leekscript AI

Start by going to the "AIs" using the navigation on the left and click the "Add AI" button
A file picker will appear, where you will select the "main" leekscript file, like you would on the officiel website.

🛑 The file must be inside a git repository, without any pending changes (it is recommended to have a private git repository for your AIs) 🛑

Then name your AI, and click the "Register AI" button at the bottom.

## Step 2: Add at least two leek

Go to the "Leeks" panel using the navigation on the left, then click "Add leek"
You will be prompted to select the json build file, you can create / export builds using https://leek-wars-restator.vercel.app/

Then, set a name, leek image, select the AI you just added, and click "Create Leek"

The minimum amount of leeks in a duel pool is two, so you can create another one.

## Step 3: Create a duel pool

On the left menu, under "Pools", there is a "Duel" view.
When clicking it, you will be prompted to create a new pool.

After configuring it by giving the pool a name, whether it's deterministic or not etc, and adding the two leeks you previously added, you will be able to click the "Create pool" button at the bottom
