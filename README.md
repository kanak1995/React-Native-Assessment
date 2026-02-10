# 🛒 FinWiseApp – React Native E‑Commerce App

FinWiseApp is a **React Native CLI–based e‑commerce mobile application** built as a complete end‑to‑end demo.  
It uses a **mock backend (JSON Server)** with **token‑based authentication**, user‑scoped cart and orders, and a clean hook‑driven architecture.

---

## 📱 Features

### 🔐 Authentication & Onboarding

- **Onboarding Flow**: Get Started -> Welcome -> Login/Signup
- Register & Login
- Token generated on every login/signup
- Token persisted using **AsyncStorage**
- Auto‑login on app relaunch
- Logout clears token and resets navigation stack
- `401 Unauthorized` → auto logout

---

### 🛍️ Product Catalog

- Product list with infinite scroll (pagination)
- Pull‑to‑refresh
- Search with debounce (≤ 400ms)
- Category filter
- Empty state handling

---

### 📦 Product Details

- Image carousel with auto‑scroll
- Dot indicators
- Product options (Color / Size)
- Option validation before add‑to‑cart
- Stock‑aware Add to Cart button

---

### 🛒 Cart

- Add / remove items
- Increment / decrement quantity
- Auto‑calculated:
  - Subtotal
  - Tax
  - Total
- Cart is **user‑scoped**
- Empty cart UI
- Cart cleared after checkout

---

### 💳 Checkout

- Address form with validation
- Payment method (COD / Mock Card)
- Sequential order ID generation  
  Example:
  ```
  ord_1001
  ord_1002
  ```
- Order saved with `userId`
- Cart cleared on success

---

### 📑 Orders

- Orders list (user‑based)
- Order details screen
- Pagination
- Sorted by latest order
- Pull‑to‑refresh

---

## 🧱 Tech Stack

| Category   | Tech                            |
| ---------- | ------------------------------- |
| Language   | TypeScript                      |
| Framework  | React Native CLI                |
| Navigation | React Navigation (Stack + Tabs) |
| State      | Custom Hooks                    |
| Backend    | JSON Server                     |
| Storage    | AsyncStorage                    |
| API        | Fetch wrapper (`request()`)     |
| Styling    | StyleSheet & Themed Styles      |
| UI Library | Vector Icons, SVG Support       |
| Utilities  | Safe Area Context               |
| Platform   | Android & iOS                   |

---

## 📂 Project Structure

```
src/
├── api/
│   ├── auth.api.ts
│   ├── auth.helper.ts
│   ├── cart.api.ts
│   ├── category.api.ts
│   ├── checkout.api.ts
│   ├── http.ts
│   ├── orders.api.ts
│   └── product.api.ts
│
├── components/
│   ├── Button/
│   ├── Icon/
│   ├── TextField/
│   ├── BottomSheet.tsx
│   ├── CartItem.tsx
│   ├── CategoryPicker.tsx
│   ├── ImageCarousel.tsx
│   ├── OrderItem.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── ProductOptions.tsx
│   ├── SearchBar.tsx
│   └── TabIcon.tsx
│
├── config/
│   └── constants.ts
│
├── hooks/
│   ├── useCart.ts
│   ├── useCheckout.ts
│   ├── useHomeProducts.ts
│   ├── useOrderDetails.ts
│   ├── useOrders.ts
│   └── useProductDetails.ts
│
├── models/
│   ├── CartModel.ts
│   ├── OrderModel.ts
│   └── ProductModel.ts
│
├── screens/
│   ├── onboarding/
│   │   ├── GetStartedScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── WelcomeScreen.tsx
│   │
│   └── tabs/
│       ├── home/
│       │   ├── HomeScreen.tsx
│       │   └── ProductDetailsScreen.tsx
│       ├── cart/
│       │   ├── CartScreen.tsx
│       │   ├── CheckoutScreen.tsx
│       │   └── OrderSuccessScreen.tsx
│       └── order/
│           ├── OrdersScreen.tsx
│           └── OrderDetailsScreen.tsx
│
├── styles/
│   ├── CartScreen.styles.ts
│   ├── HomeScreen.styles.ts
│   └── ... (Screen-specific styles)
│
├── theme/
│   ├── colors.ts
│   ├── fonts.ts
│   └── typography.ts
│
├── types/
│   └── svg.d.ts
│
└── utils/
    ├── authEvents.ts
    ├── storage.ts
    ├── token.ts
    └── validation.ts
```

---

## 🌐 Backend (JSON Server)

### Install JSON Server

```bash
npm install -g json-server
```

### Run Backend

```bash
json-server --watch db.json --port 3000
```

---

## ⚠️ Android Emulator Networking

| Platform         | BASE_URL              |
| ---------------- | --------------------- |
| Android Emulator | http://10.0.2.2:3000  |
| iOS Simulator    | http://localhost:3000 |

### `src/config/constants.ts`

```ts
import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const TAX_RATE = 0.09;
```

---

## 🔐 Authentication Design

- Token stored in `users.token`
- Token sent via `Authorization` header
- All user data is filtered using `userId`
- Example:

```http
Authorization: Bearer <token>
```

### Auto Logout

- Any `401` response clears token
- App redirects to Login screen

---

## 🧾 Order ID Strategy

Sequential per user:

```
ord_1001
ord_1002
ord_1003
```

Logic:

- Fetch orders for current user
- Extract numeric part
- Increment max value safely

---

## ▶️ Running the App

### Install dependencies

```bash
npm install
```

### Start Metro

```bash
npm start
```

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

---

## ⚙️ Android Setup (First Time)

Required:

- Android Studio
- JDK 17
- Android SDK & Emulator

Check setup:

```bash
npx react-native doctor
```

If emulator error:

```bash
emulator -list-avds
```

---

## 🧪 Testing

### Run Unit Tests

```bash
npm test
```

---

## 🧪 Debugging

- `console.log()` for quick checks
- `debugLog()` utility for controlled logs
- Chrome / Flipper supported

---

## 🚀 Future Improvements

- Wishlist
- Price sorting
- Dark mode
- API pagination metadata
- Real backend integration

---

## ✅ Status

✔ Authentication  
✔ Catalog  
✔ Product Details  
✔ Cart  
✔ Checkout  
✔ Orders  
✔ Token Handling  
✔ User‑scoped Data  
✔ Navigation Reset on Logout
✔ Unit tests (Jest)

---

## 👨‍💻 Author

**Kanak Yadav**  
React Native Developer
