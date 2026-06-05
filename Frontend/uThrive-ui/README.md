# ProductList Component

A responsive, feature-rich product listing page built with React and TypeScript. This component provides a complete shopping experience with filtering, product management, and cart functionality.

## Getting Started

### Install dependencies

```bash
npm i
```

### Run the development server

```bash
npm run dev
```

### Run tests

```bash
npm test
```

---

## Features

### Product Display
- **Responsive Grid Layout** - Adapts from 2 columns on mobile to 4 columns on extra-large screens
- **Loading States** - Skeleton loaders during initial data fetch
- **Pagination** - Navigate between product pages
- **Empty State** - User-friendly message when no products are found

### Filtering & Search
- **Sidebar Filters** - Desktop-only filter panel for advanced product filtering
- **Dynamic Meta Filtering** - Filter options based on product metadata
- **Real-time Updates** - Filters instantly update the displayed products

### Shopping Cart
- **Cart Drawer** - Slide-out cart interface with quick access to cart items
- **Quantity Management** - Adjust item quantities directly from the cart
- **Add/Remove Items** - Seamlessly add products to cart or remove them
- **Loading States** - Visual feedback during cart operations

### Product Management
- **View Details** - Click products to view full details in a modal
- **Archive/Restore** - Toggle product archive status
- **Delete** - Remove products permanently
- **Action Feedback** - Loading indicators for all async operations

---

## State & Actions
- `filters` - Current active filters
- `setFilters` - Update filters
- `productsPage` - Paginated product data with metadata
- `productsLoading` - Initial load state
- `productsFetching` - Background refresh state
- `meta` - Filter metadata and options
- `cartItems` - Items in the shopping cart
- `cartOpen` - Cart drawer visibility
- `setCartOpen` - Toggle cart drawer
- `cartLoading` - Cart operation state
- `selectedProduct` - Currently selected product for modal
- `setSelectedProduct` - Update selected product

## Handlers
- `handleDelete` - Delete product handler
- `handleArchive` - Archive product handler
- `handleRestore` - Restore archived product handler
- `handleAddToCart` - Add product to cart
- `handleQtyChange` - Update cart item quantity
- `handleRemoveFromCart` - Remove item from cart

## Pending States
- `pendingArchiveId` - ID of product being archived
- `pendingRestoreId` - ID of product being restored
- `pendingDeleteId` - ID of product being deleted
- `pendingAddToCartId` - ID of product being added to cart
- `pendingUpdateCartId` - ID of cart item being updated
- `pendingRemoveCartId` - ID of cart item being removed