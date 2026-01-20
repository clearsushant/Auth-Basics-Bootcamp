export interface CartItem {
    productId: number;
    quantity: number;
}

// In-memory cart storage: username -> cart items
export const carts: Record<string, CartItem[]> = {};

export const getCart = (username: string): CartItem[] => {
    if (!carts[username]) {
        carts[username] = [];
    }
    return carts[username];
};

export const addToCart = (username: string, productId: number): void => {
    const cart = getCart(username);
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
};
