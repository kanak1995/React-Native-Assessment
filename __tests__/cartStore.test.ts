import { useCartStore } from '../src/store/cartStore';
import { getCart, addToCart, removeFromCart } from '../src/api/cart.api';
import { getProductById, updateProductStock } from '../src/api/product.api';
import { useProductStore } from '../src/store/productStore';

jest.mock('../src/api/cart.api');
jest.mock('../src/api/product.api');
jest.mock('../src/store/productStore', () => ({
  useProductStore: {
    getState: jest.fn(() => ({
      updateLocalStock: jest.fn(),
    })),
  },
}));

describe('cartStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState({
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      loading: false,
    });
  });

  it('fetches cart correctly', async () => {
    const mockCart = {
      items: [{ productId: 'p1', title: 'Product 1', price: 100, qty: 1 }],
      subtotal: 100,
      tax: 9,
      total: 109,
    };
    (getCart as jest.Mock).mockResolvedValue(mockCart);

    await useCartStore.getState().fetchCart();

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().total).toBe(109);
  });

  it('adds item with stock check', async () => {
    const mockProduct = { id: 'p1', stock: 10 };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);
    (addToCart as jest.Mock).mockResolvedValue({});

    const updateLocalStock = jest.fn();
    (useProductStore.getState as jest.Mock).mockReturnValue({
      updateLocalStock,
    });

    await useCartStore
      .getState()
      .addItem({ productId: 'p1', title: 'P1', price: 10 }, 2);

    expect(updateProductStock).toHaveBeenCalledWith('p1', 8);
    expect(updateLocalStock).toHaveBeenCalledWith('p1', -2);
  });

  it('prevents adding item if out of stock', async () => {
    const mockProduct = { id: 'p1', stock: 1 };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    await expect(
      useCartStore.getState().addItem({ productId: 'p1' }, 2),
    ).rejects.toThrow('Not enough stock');
  });

  it('removes item and restores stock', async () => {
    useCartStore.setState({
      items: [{ productId: 'p1', qty: 3 }] as any,
    });

    const mockProduct = { id: 'p1', stock: 5 };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const updateLocalStock = jest.fn();
    (useProductStore.getState as jest.Mock).mockReturnValue({
      updateLocalStock,
    });

    await useCartStore.getState().removeItem('p1');

    expect(updateProductStock).toHaveBeenCalledWith('p1', 8);
    expect(updateLocalStock).toHaveBeenCalledWith('p1', 3);
    expect(removeFromCart).toHaveBeenCalledWith('p1');
  });
});
