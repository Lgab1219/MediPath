# Getting Started (For Developers)

> **Note:** Make sure the following are installed:
1. Node
2. Android Studio
3. JDK 
[Follow me](https://reactnative.dev/docs/set-up-your-environment?os=windows) to install them. (Or ask AI for help)

## Step 1: Clone MediPath from repository.

## Step 2: On the terminal, install node_modules by typing the following:

```sh
# Install node_modules for frontend
npm install

cd api
# Install another node_modules for backend, and install the following dependencies
npm install

# Install express, cors, dotenv, jsonwebtoken, pg, bcrypt through npm (Ask AI for help)
```

## Step 3: Start the Express server by typing on the terminal:

```sh
# Make sure you're still at /api directory
npx tsx watch src/server.ts

# Then open a new terminal
```

## Step 4: Enable Developer Mode on your phone

## Step 5: In Developer Mode settings, enable wireless debugging, and tap "Pair device with pairing code"

## Step 6: In another terminal, type the following:

```sh
adb devices
# Exchange with generated IP from your phone
adb pair 192.168.1.x:xxxxx

# Enter the pairing code when prompted

# Connect to IP address (scroll up and look for another IP address and port, different from pairing code)
adb connect 192.168.1.x:xxxx
```

## Step 7: Open another terminal and type the following:

```sh
npx react-native start
```

## Step 8: Open another terminal and type the following:

```sh
npx react-native run-android --active-arch-only
```